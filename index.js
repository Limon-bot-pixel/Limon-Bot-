/**
 * Limon Bot - Katabump Stable Pair Code System
 */

const {
    default: makeWASocket,
    useMultiFileAuthState,
    fetchLatestBaileysVersion,
    DisconnectReason,
    makeCacheableSignalKeyStore
} = require("@whiskeysockets/baileys");

const pino = require("pino");

async function startLimonBot() {
    const { version } = await fetchLatestBaileysVersion();
    const { state, saveCreds } = await useMultiFileAuthState("./session");

    const sock = makeWASocket({
        logger: pino({ level: "silent" }),
        printQRInTerminal: false, // QR OFF (Katabump unsupported)
        auth: {
            creds: state.creds,
            keys: makeCacheableSignalKeyStore(state.keys)
        },
        browser: ["Limon Bot", "Chrome", "1.0"],
        version
    });

    // ======================
    // PAIR CODE SYSTEM (AUTO)
    // ======================
    if (!state.creds.registered) {
        console.log("\n🟢 Generating Pair Code for Limon Bot...");
        const code = await sock.createPairingCode("8801623442730");
        console.log("\n👉 YOUR PAIR CODE:");
        console.log("🔐 " + code + "\n");
        console.log("➡ Go to WhatsApp → Linked Devices → Add Device → Enter Code\n");
    }

    // ======================
    // MESSAGE HANDLER
    // ======================
    sock.ev.on("messages.upsert", async (m) => {
        const msg = m.messages[0];
        const from = msg.key.remoteJid;

        const text =
            msg.message?.conversation ||
            msg.message?.extendedTextMessage?.text ||
            "";

        if (text.toLowerCase() === "ping") {
            await sock.sendMessage(from, { text: "Pong 🟢 Limon Bot Alive!" });
        }
    });

    // SAVE CREDS
    sock.ev.on("creds.update", saveCreds);

    // RECONNECT
    sock.ev.on("connection.update", (update) => {
        const { connection, lastDisconnect } = update;

        if (connection === "close") {
            const reason = lastDisconnect?.error?.output?.statusCode;
            console.log("Reconnecting...", reason);
            startLimonBot();
        }

        if (connection === "open") {
            console.log("✅ Limon Bot Connected Successfully!");
        }
    });
}

startLimonBot();
