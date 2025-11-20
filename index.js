/**
 * Limon Bot - Single File Version
 * Made for Limon ❤️
 */

const {
    default: makeWASocket,
    useMultiFileAuthState,
    generatePairingCode,
    DisconnectReason
} = require("@whiskeysockets/baileys");
const pino = require("pino");

// ================================
// MESSAGE HANDLER (Inside Same File)
// ================================
async function messageHandler(sock, msg) {
    try {
        const from = msg.key.remoteJid;
        const text = msg.message?.conversation || 
                     msg.message?.extendedTextMessage?.text ||
                     "";

        if (!text) return;

        console.log("Message:", text);

        if (text.toLowerCase() === "ping") {
            await sock.sendMessage(from, { text: "Pong! 🟢" });
        }

        if (text.toLowerCase() === "hi") {
            await sock.sendMessage(from, { text: "Hello Limon! ❤️ Bot is Running." });
        }

    } catch (err) {
        console.log("Message Handler Error:", err);
    }
}

// ================================
// MAIN BOT START FUNCTION
// ================================
async function startLimonBot() {
    const { state, saveCreds } = await useMultiFileAuthState("./session");

    const sock = makeWASocket({
        logger: pino({ level: "silent" }),
        printQRInTerminal: false,
        auth: state
    });

    // ================================
    // PAIR CODE SYSTEM
    // ================================
    if (!state.creds.registered) {
        console.log("🟢 Generating Limon Bot Pair Code...");
        const code = await generatePairingCode(sock, "8801623442730"); // তোমার নম্বর
        console.log("\n👉 Your Limon Bot Pair Code:\n🔐 " + code);
        console.log("Go to WhatsApp → Linked Devices → Add Device → Enter Code\n");
    }

    // ================================
    // MESSAGE EVENT
    // ================================
    sock.ev.on("messages.upsert", async (m) => {
        const msg = m.messages[0];
        await messageHandler(sock, msg);
    });

    // ================================
    // SAVE SESSION
    // ================================
    sock.ev.on("creds.update", saveCreds);

    // ================================
    // CONNECTION UPDATE
    // ================================
    sock.ev.on("connection.update", async (update) => {
        const { connection, lastDisconnect } = update;

        if (connection === "close") {
            if (lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut) {
                startLimonBot();
            } else {
                console.log("❌ Logged Out. Delete session folder & restart.");
            }
        } else if (connection === "open") {
            console.log("✅ Limon Bot Connected Successfully!");
        }
    });
}

// ================================
// START BOT
// ================================
startLimonBot();
