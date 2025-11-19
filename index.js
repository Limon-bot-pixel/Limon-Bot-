const {
    default: makeWASocket,
    useMultiFileAuthState,
    DisconnectReason,
} = require("@whiskeysockets/baileys");

const fs = require("fs");
const config = require("./config");

async function startLimonBot() {
    const { state, saveCreds } = await useMultiFileAuthState(config.sessionName);

    const client = makeWASocket({
        auth: state,
        printQRInTerminal: true
    });

    client.ev.on("creds.update", saveCreds);

    client.ev.on("connection.update", (update) => {
        const { connection, lastDisconnect } = update;

        if (connection === "close") {
            const reason = lastDisconnect?.error?.output?.statusCode;

            if (reason === DisconnectReason.loggedOut) {
                console.log("❌ Session Expired. Please get a new pair code.");
                process.exit();
            } else {
                console.log("♻️ Reconnecting...");
                startLimonBot();
            }
        } else if (connection === "open") {
            console.log(`🔥 ${config.botName} Connected Successfully!`);
        }
    });

    client.ev.on("messages.upsert", async ({ messages }) => {
        const msg = messages[0];
        if (!msg.message) return;

        const from = msg.key.remoteJid;
        const body = msg.message.conversation || "";

        const prefix = config.prefix.find(p => body.startsWith(p));

        if (!prefix) return;

        const cmd = body.slice(prefix.length).trim().split(" ")[0];

        if (cmd === "ping") {
            await client.sendMessage(from, { text: "🏓 Pong Limon!" });
        }

        if (cmd === "menu") {
            await client.sendMessage(from, {
                image: { url: config.logoURL },
                caption: `💠 *${config.botName} Menu*

✨ Owner: ${config.ownerName}`
            });
        }
    });
}

startLimonBot();
