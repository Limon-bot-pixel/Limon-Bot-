/**
 * Limon Bot - Working Pair Code System
 * Supports all Baileys versions
 * Single File Bot (index.js only)
 */

const {
    default: makeWASocket,
    useMultiFileAuthState,
    DisconnectReason,
    makeCacheableSignalKeyStore
} = require("@whiskeysockets/baileys");

const readline = require("readline");
const pino = require("pino");

// Create Terminal Input for Pair Code
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// ==============================
// MESSAGE HANDLER
// ==============================
async function messageHandler(sock, msg) {
    try {
        const from = msg.key.remoteJid;
        const text =
            msg.message?.conversation ||
            msg.message?.extendedTextMessage?.text ||
            "";

        if (!text) return;

        if (text.toLowerCase() === "ping") {
            await sock.sendMessage(from, { text: "Pong 🟢 Limon Bot Alive!" });
        }

    } catch (err) {
        console.log("Message Error:", err);
    }
}

// ==============================
// MAIN BOT FUNCTION
// ==============================
async function startLimonBot() {
    const { state, saveCreds } = await useMultiFileAuthState("./session");

    const sock = makeWASocket({
        logger: pino({ level: "silent" }),
        auth: {
            creds: state.creds,
            keys: makeCacheableSignalKeyStore(state.keys)
        },
        printQRInTerminal: true, // Pair code alternative (QR)
        browser: ["Limon Bot", "Chrome", "1.0"]
    });

    // ==============================
    // TERMINAL PAIR CODE (WORKS EVERYWHERE)
    // ==============================
    if (!state.creds.registered) {
        console.log("\n🟢 YOUR PAIR CODE SYSTEM IS READY");
        console.log("👉 Open WhatsApp → Linked Devices → Add Device");
        console.log("👉 Scan the QR OR Enter the code below\n");

        rl.question("🔐 Enter Pair Code from WhatsApp: ", async (code) => {
            try {
                await sock.requestPairingCode(code.trim());
                console.log("✅ Pairing Success!");
                rl.close();
            } catch (err) {
                console.log("❌ Invalid Pair Code", err);
            }
        });
    }

    // ==============================
    // MESSAGE LISTENER
    // ==============================
    sock.ev.on("messages.upsert", async (m) => {
        const msg = m.messages[0];
        if (!msg.message) return;
        await messageHandler(sock, msg);
    });

    // SAVE CREDS
    sock.ev.on("creds.update", saveCreds);

    // ==============================
    // RECONNECT SYSTEM
    // ==============================
    sock.ev.on("connection.update", async (update) => {
        const { connection, lastDisconnect } = update;

        if (connection === "close") {
            const reason = lastDisconnect?.error?.output?.statusCode;

            if (reason === DisconnectReason.loggedOut) {
                console.log("❌ Logged Out. Delete session and restart.");
            } else {
                console.log("♻ Reconnecting...");
                startLimonBot();
            }
        }

        if (connection === "open") {
            console.log("✅ Limon Bot Connected Successfully!");
        }
    });
}

// START BOT
startLimonBot();
