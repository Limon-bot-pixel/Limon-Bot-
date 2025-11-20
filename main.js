const {
    default: makeWASocket,
    useMultiFileAuthState,
    DisconnectReason,
} = require('@whiskeysockets/baileys');

const fs = require("fs");
const path = require("path");
const pino = require("pino");

// Load Commands
const commands = new Map();
const cmdPath = path.join(__dirname, "commands");

if (fs.existsSync(cmdPath)) {
    const files = fs.readdirSync(cmdPath).filter(f => f.endsWith(".js"));
    for (let file of files) {
        const command = require(`./commands/${file}`);
        commands.set(command.name, command);
        if (command.alias) {
            command.alias.forEach(a => commands.set(a, command));
        }
    }
}

// Main Function
async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState("./session");

    const sock = makeWASocket({
        logger: pino({ level: "silent" }),
        printQRInTerminal: true,
        auth: state,
    });

    console.log("🔥 Limon Bot Connected!");

    sock.ev.on("creds.update", saveCreds);

    // Message Listener
    sock.ev.on("messages.upsert", async ({ messages }) => {
        const m = messages[0];
        if (!m.message || m.key.fromMe) return;

        const from = m.key.remoteJid;
        const text = m.message.conversation || m.message.extendedTextMessage?.text || "";

        // Prefix
        const prefix = ".";
        if (!text.startsWith(prefix)) return;

        const args = text.slice(prefix.length).trim().split(/ +/);
        const cmdName = args.shift().toLowerCase();

        const cmd = commands.get(cmdName);
        if (cmd) {
            try {
                await cmd.run(m, sock, args);
            } catch (e) {
                console.log("Command Error:", e);
                await sock.sendMessage(from, { text: "❌ Error executing command!" });
            }
        }
    });

    // Reconnect on Disconnect
    sock.ev.on("connection.update", update => {
        const { connection, lastDisconnect } = update;

        if (connection === "close") {
            if (lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut) {
                console.log("♻️ Reconnecting...");
                startBot();
            } else {
                console.log("❌ Logged out. Delete session and scan QR again.");
            }
        } else if (connection === "open") {
            console.log("✅ Bot is online!");
        }
    });
}

startBot();
