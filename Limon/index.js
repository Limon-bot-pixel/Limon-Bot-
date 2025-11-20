// ===============================
// Limon Bot — Pair Code System
// ===============================

const {
    default: makeWASocket,
    DisconnectReason,
    useMultiFileAuthState,
    fetchLatestBaileysVersion
} = require("@whiskeysockets/baileys");

const pino = require("pino");
const fs = require("fs");

// AUTO CREATE SESSION FOLDER
if (!fs.existsSync('./session')) {
    fs.mkdirSync('./session');
}

async function startLimonBot() {
    const { state, saveCreds } = await useMultiFileAuthState('./session');

    const { version } = await fetchLatestBaileysVersion();

    const sock = makeWASocket({
        logger: pino({ level: "silent" }),
        printQRInTerminal: false,        // ❗ QR বন্ধ, শুধু Pair Code চলবে
        browser: ["Limon Bot", "Chrome", "1.0"],
        auth: state
    });

    // ============================
    // 🔥 PAIR CODE GENERATOR
    // ============================
    if (!sock.authState.creds.registered) {
        const phoneNumber = "8801623442730"; // আপনার নম্বর

        console.log("");
        console.log("📌 Your Phone Number:", phoneNumber);
        console.log("📌 Generating Pair Code...");
        console.log("");

        const code = await sock.requestPairingCode(phoneNumber);
        console.log("🔐 Your Pair Code:", code);
        console.log("👉 WhatsApp > Linked Devices > Add Device > Pair Code দিন");
    }

    // ============================
    // Connection Logger
    // ============================
    sock.ev.on("connection.update", async (update) => {
        const { connection, lastDisconnect } = update;

        if (connection === "open") {
            console.log("✅ Limon Bot Connected to WhatsApp!");
        }

        if (connection === "close") {
            const reason = lastDisconnect?.error?.output?.statusCode;

            if (reason === DisconnectReason.loggedOut) {
                console.log("❌ Session expired. Re-run to get new Pair Code.");
            } else {
                console.log("♻️ Reconnecting...");
                startLimonBot();
            }
        }
    });

    // ============================
    // Save new session credentials
    // ============================
    sock.ev.on("creds.update", saveCreds);

    // ============================
    // Message Handler (optional)
    // ============================
    sock.ev.on("messages.upsert", async (msg) => {
        const m = msg.messages[0];
        if (!m.message) return;

        console.log("📩 Message Received");
    });

    return sock;
}

startLimonBot();
