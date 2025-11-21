// ===============================
// 🌟 Limon Bot - Final index.js
// ===============================

const {
    default: makeWASocket,
    useMultiFileAuthState,
    DisconnectReason,
    Browsers
} = require("@whiskeysockets/baileys");

const fs = require("fs");
const path = require("path");
const P = require("pino");
const chalk = require("chalk");

// ===============================
// 📌 SESSION SYSTEM
// ===============================
async function connectLimon() {
    const { state, saveCreds } = await useMultiFileAuthState("./session");

    const sock = makeWASocket({
        printQRInTerminal: false,
        auth: state,
        logger: P({ level: "silent" }),
        browser: Browsers.macOS("Safari"),
    });

    // ===============================
    // 📌 PAIR CODE SYSTEM
    // ===============================
    if (!sock.authState.creds.registered) {
        const code = await sock.requestPairingCode("8801623442730");
        console.log("=================================");
        console.log("🔑 Your Pair Code:");
        console.log("👉 " + chalk.green(code));
        console.log("=================================");
    }

    // ===============================
    // 📌 SAVE CREDS
    // ===============================
    sock.ev.on("creds.update", saveCreds);

    // ===============================
    // 📌 AUTO RECONNECT SYSTEM
    // ===============================
    sock.ev.on("connection.update", (update) => {
        const { connection, lastDisconnect } = update;

        if (connection === "close") {
            const reason = lastDisconnect?.error?.output?.statusCode;

            if (reason !== DisconnectReason.loggedOut) {
                console.log("♻ Reconnecting...");
                connectLimon();
            } else {
                console.log("❌ Logged Out — Delete session folder!");
            }
        } else if (connection === "open") {
            console.log("✅ Limon Bot Started Successfully!");
        }
    });

    // ===============================
    // 📌 MESSAGE HANDLER LOADER
    // ===============================
    sock.ev.on("messages.upsert", async (m) => {
        const msg = m.messages[0];
        if (!msg.message) return;

        require("./message-handler")(sock, msg);
    });

    // ===============================
    // 📌 PLUGIN LOADER
    // ===============================
    loadPlugins(sock);
}

// ===============================
// 📌 LOAD PLUGINS FUNCTION
// ===============================
function loadPlugins(sock) {
    const pluginPath = "./plugins";
    const files = fs.readdirSync(pluginPath).filter(f => f.endsWith(".js"));

    files.forEach(file => {
        try {
            require(path.join(pluginPath, file))(sock);
            console.log("🟢 Loaded Plugin:", file);
        } catch (e) {
            console.log("🔴 Plugin Error:", file, e.message);
        }
    });

    console.log("=================================");
    console.log("📌 PAIR CODE SYSTEM");
    console.log("=================================");
}

// ===============================
// 🚀 START BOT
// ===============================
connectLimon();
