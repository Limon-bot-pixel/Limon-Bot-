// ===========================================
// 🔥 Limon Bot — Final Index.js
// 🔥 With Auto Session Fix + Pair System
// ===========================================

const {
    default: makeWASocket,
    DisconnectReason,
    useMultiFileAuthState,
    fetchLatestBaileysVersion
} = require("@whiskeysockets/baileys");

const pino = require("pino");
const fs = require("fs");
const path = require("path");

// ===========================================
// 🔥 AUTO SESSION FIX SYSTEM
// ===========================================
const sessionPath = "./session";

if (!fs.existsSync(sessionPath)) {
    console.log("⚠️ Session folder missing — creating...");
    fs.mkdirSync(sessionPath, { recursive: true });
}

function fixSessionFiles() {
    const required = [
        "creds.json",
        "app-state-sync-key.json",
    ];

    required.forEach(file => {
        const fpath = path.join(sessionPath, file);
        if (!fs.existsSync(fpath)) {
            fs.writeFileSync(fpath, "{}");
            console.log(`⚠️ Missing ${file} — creating empty file.`);
        }
    });
}

fixSessionFiles();

// ===========================================
// 🔥 MAIN BOT START FUNCTION
// ===========================================

async function startBot() {
    try {
        const { state, saveCreds } = await useMultiFileAuthState(sessionPath);
        const { version } = await fetchLatestBaileysVersion();

        const sock = makeWASocket({
            printQRInTerminal: false,
            logger: pino({ level: "fatal" }),
            browser: ["Limon Bot", "Chrome", "5.0"],
            auth: state,
            version
        });

        // ===========================================
        // 🔥 PAIR CODE SYSTEM
        // ===========================================

        if (!sock.authState.creds.registered) {
            const phone = "8801623442730"; // আপনার নম্বর (প্রয়োজনে পরিবর্তন করুন)
            const code = await sock.requestPairingCode(phone);
            console.log("\n===============================");
            console.log("📌 PAIR CODE SYSTEM");
            console.log("===============================");
            console.log("👉 Your Pair Code:", code);
            console.log("🚀 Limon Bot Started Successfully!");
        }

        sock.ev.on("creds.update", saveCreds);

        // ===========================================
        // 🔥 CONNECTION HANDLER
        // ===========================================

        sock.ev.on("connection.update", (update) => {
            const { connection, lastDisconnect } = update;

            if (connection === "close") {
                const reason = lastDisconnect?.error?.output?.statusCode;

                if (reason === DisconnectReason.loggedOut) {
                    console.log("❌ Logged Out — deleting session...");
                    fs.rmSync(sessionPath, { recursive: true, force: true });
                    process.exit(1);
                } else {
                    console.log("♻️ Reconnecting...");
                    startBot();
                }
            }

            if (connection === "open") {
                console.log("✅ Limon Bot Connected!");
            }
        });

        // ===========================================
        // 🔥 MESSAGE HANDLER
        // ===========================================

        sock.ev.on("messages.upsert", async (m) => {
            require("./main")(sock, m);
        });

    } catch (e) {
        console.error("❌ ERROR:", e);
        startBot();
    }
}

startBot();
