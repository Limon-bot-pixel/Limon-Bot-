/**
 * LIMON BOT - PAIR CODE SYSTEM
 */

const {
    default: makeWASocket,
    useMultiFileAuthState,
    DisconnectReason,
    fetchLatestBaileysVersion,
    generateWAMessageFromContent,
} = require("@whiskeysockets/baileys");

const Pino = require("pino");

async function startLimonBot() {
    const { state, saveCreds } = await useMultiFileAuthState("./session");

    const { version } = await fetchLatestBaileysVersion();

    const sock = makeWASocket({
        version,
        printQRInTerminal: false, // QR বন্ধ
        logger: Pino({ level: "silent" }),
        auth: state,
        browser: ["Limon Bot", "Chrome", "1.0"],
    });

    // --- PAIR CODE SYSTEM ---
    if (!sock.authState.creds.registered) {
        console.log("\n🟢 WhatsApp Pair Code Generating...\n");

        let code = await sock.requestPairingCode("8801623442730"); // তোমার Owner Number

        console.log("📌 Your Limon Bot Pair Code:");
        console.log("🔐", code);
        console.log("\n➡ Go to: WhatsApp > Linked Devices > Add Device > Enter Code\n");
    }

    // --- CONNECTION UPDATE ---
    sock.ev.on("connection.update", (update) => {
        const { connection, lastDisconnect } = update;

        if (connection === "close") {
            const reason = lastDisconnect?.error?.output?.statusCode;

            if (reason === DisconnectReason.loggedOut) {
                console.log("❌ Logged out. Delete session folder & restart.");
            } else {
                console.log("♻ Reconnecting...");
                startLimonBot();
            }
        } else if (connection === "open") {
            console.log("✅ Limon Bot Connected Successfully!");
        }
    });

    // --- SAVE CREDS ---
    sock.ev.on("creds.update", saveCreds);
}

startLimonBot();
