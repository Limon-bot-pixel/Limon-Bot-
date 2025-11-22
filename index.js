// ====================================================
// 🍋 LIMON BOT ASCII LOGO (Auto Display on Start)
// ====================================================

const imageToAscii = require("image-to-ascii");

imageToAscii(
    "https://i.ibb.co/ys0RZtZ/mls-limon-bot.jpg",
    {
        colored: true,
        size: { width: 45 }
    },
    (err, converted) => {
        if (err) {
            console.log("Logo Error:", err);
        } else {
            console.log(converted);
            console.log("\n🚀 Limon Bot Starting...\n");
        }
    }
);

// ====================================================
// END LOGO SECTION
// ====================================================
/**
 * Limon Bot - Full Fixed index.js 
 * Created by: Limon Bbz 🍋
 */

const {
    default: makeWASocket,
    useMultiFileAuthState,
    fetchLatestBaileysVersion,
    Browsers,
    jidNormalizedUser
} = require("@whiskeysockets/baileys");

const fs = require("fs");
const path = require("path");
const pino = require("pino");

// =============================
// 🔥 SESSION AUTO FIX SYSTEM
// =============================
if (!fs.existsSync("./session")) {
    fs.mkdirSync("./session", { recursive: true });
    console.log("📁 Auto-Created session folder");
}

// =============================
// 🔥 AUTO LOAD COMMANDS
// =============================
function loadCommands() {
    let commands = {};
    const cmdPath = "./commands";

    if (fs.existsSync(cmdPath)) {
        fs.readdirSync(cmdPath).forEach((file) => {
            if (file.endsWith(".js")) {
                const cmd = require(`${cmdPath}/${file}`);
                commands[cmd.name] = cmd;
                console.log(`✔ Command Loaded: ${file}`);
            }
        });
    }
    return commands;
}

// =============================
// 🔥 AUTO LOAD PLUGINS
// =============================
function loadPlugins(sock) {
    const pluginsDir = "./plugins";
    if (!fs.existsSync(pluginsDir)) return;

    fs.readdirSync(pluginsDir).forEach((file) => {
        if (file.endsWith(".js")) {
            require(`${pluginsDir}/${file}`)(sock);
            console.log(`✔ Plugin Loaded: ${file}`);
        }
    });
}

// =============================
// 🔥 START BOT
// =============================
async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState("./session");
    const { version } = await fetchLatestBaileysVersion();

    const sock = makeWASocket({
        logger: pino({ level: "silent" }),
        printQRInTerminal: false,
        browser: Browsers.macOS("Safari"),
        auth: state,
        version
    });

    // =============================
    // 🔥 PAIR CODE SYSTEM
    // =============================
    if (!sock.user) {
        let phone = process.env.NUMBER || "8801623442730";
        const pairCode = await sock.requestPairingCode(phone);
        console.log("\n===============================");
        console.log("📌 YOUR PAIR CODE");
        console.log("===============================");
        console.log("👉 " + pairCode);
        console.log("===============================\n");
    }

    // =============================
    // 🔥 LISTEN TO MESSAGES
    // =============================
    const commands = loadCommands();

    sock.ev.on("messages.upsert", async (msg) => {
        const m = msg.messages[0];
        if (!m.message || m.key.fromMe) return;

        const from = m.key.remoteJid;
        const type = Object.keys(m.message)[0];
        const text = m.message.conversation || m.message[type]?.text || "";

        if (!text.startsWith(".")) return; // prefix
        const args = text.slice(1).trim().split(" ");
        const cmdName = args.shift().toLowerCase();

        if (commands[cmdName]) {
            try {
                await commands[cmdName].run(sock, m, args);
            } catch (err) {
                console.log("❌ Command Error", err);
            }
        }
    });

    // =============================
    // 🔥 PLUGINS
    // =============================
    loadPlugins(sock);

    // =============================
    // 🔥 SAVE CREDS
    // =============================
    sock.ev.on("creds.update", saveCreds);

    // =============================
    // 🔥 AUTO RECONNECT
    // =============================
    sock.ev.on("connection.update", (update) => {
        const { connection, lastDisconnect } = update;

        if (connection === "open") {
    console.log("🍋 Limon Bot Connected Successfully!");

    // ===== SEND NOTIFICATION TO OWNER ===== //
    const owner = "8801623442730@s.whatsapp.net"; // Your number

    await sock.sendMessage(owner, {
        image: { url: "https://i.ibb.co/ys0RZtZ/mls-limon-bot.jpg" },
        caption: 
`🍋 *LIMON BOT IS NOW ONLINE!*

🔥 Connected Successfully  
👑 Owner: Limon Bbz  
📱 Number: +8801623442730  

✨ All Systems Working Perfectly  
🚀 Ready To Use Commands!`
    });
        }

        if (connection === "close") {
            console.log("❌ Logged Out — delete session folder and try again.");
            startBot();
        }
    });
}

startBot();
