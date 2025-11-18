const {
    default: makeWASocket,
    useMultiFileAuthState,
    DisconnectReason,
} = require("@whiskeysockets/baileys");
const P = require('pino');
const config = require("./config");

async function startLimonBot() {
    const { state, saveCreds } = await useMultiFileAuthState("./session");

    const sock = makeWASocket({
        logger: P({ level: "silent" }),
        printQRInTerminal: true,
        auth: state,
    });

    // Save session
    sock.ev.on("creds.update", saveCreds);

    // Connection Update
    sock.ev.on("connection.update", (update) => {
        const { connection, lastDisconnect } = update;

        if (connection === "close") {
            const reason = new DisconnectReason(lastDisconnect?.error);
            console.log("Connection closed. Reason:", reason);

            if (reason !== DisconnectReason.loggedOut) {
                startLimonBot();
            } else {
                console.log("Logged out. Scan QR again.");
            }
        }

        if (connection === "open") {
            console.log("🔥 Limon Bot Connected Successfully!");
        }
    });

    // Message Handler
    sock.ev.on("messages.upsert", async (msg) => {
        const m = msg.messages[0];
        if (!m.message || m.key.fromMe) return;

        const sender = m.key.remoteJid;
        const text =
            m.message.conversation ||
            m.message.extendedTextMessage?.text ||
            "";

        const prefix = config.prefix;
        const cmd = text.startsWith(prefix)
            ? text.slice(prefix.length).split(" ")[0]
            : null;

        // 👋 Basic Responses
        if (text === "hi" || text === "hello") {
            await sock.sendMessage(sender, {
                text: `👋 হ্যালো! আমি *${config.botName}* — কিভাবে সাহায্য করতে পারি?`,
            });
        }

        // 📌 Command: .menu
        if (cmd === "menu") {
            await sock.sendMessage(sender, {
                text: `📌 *${config.botName} Menu*\n\n` +
                    `1. hi\n` +
                    `2. ${prefix}help\n` +
                    `3. ${prefix}owner\n` +
                    `4. ${prefix}ping`,
            });
        }

        // 📌 Command: .owner
        if (cmd === "owner") {
            await sock.sendMessage(sender, {
                text: `👑 Owner: *${config.ownerName}*\n📞 Number: wa.me/${config.ownerNumber[0]}`,
            });
        }

        // 📌 Command: .ping
        if (cmd === "ping") {
            await sock.sendMessage(sender, { text: "🏓 Pong! Limon Bot is Active!" });
        }
    });
}

startLimonBot();
