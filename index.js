// =========================
//      Limon Bot - Index
// =========================

const {
    default: makeWASocket,
    useMultiFileAuthState,
    DisconnectReason,
    fetchLatestBaileysVersion
} = require("@whiskeysockets/baileys");

const Pino = require("pino");
const fs = require("fs");
const path = require("path");

// 🔹 Plugins Loader Function
function loadPlugins() {
    const pluginFolder = path.join(__dirname, "plugins");
    const plugins = {};

    if (!fs.existsSync(pluginFolder)) fs.mkdirSync(pluginFolder);

    fs.readdirSync(pluginFolder).forEach(file => {
        if (file.endsWith(".js")) {
            try {
                let plugin = require("./plugins/" + file);
                plugins[file] = plugin;
                console.log("🟢 Loaded Plugin:", file);
            } catch (err) {
                console.log("🔴 Plugin Load Error:", file, err);
            }
        }
    });

    return plugins;
}

async function startLimonBot() {
    const { state, saveCreds } = await useMultiFileAuthState("./session/LimonSession");

    const { version } = await fetchLatestBaileysVersion();

    const conn = makeWASocket({
        logger: Pino({ level: "silent" }),
        printQRInTerminal: false,
        browser: ["Limon Bot", "Chrome", "1.0"],
        auth: state,
        version
    });

    // 🔹 Pair Code
    if (!state.creds.registered) {
        let phone = "8801623442730";
        let code = await conn.requestPairingCode(phone);

        console.log("\n📌 Pair Code:");
        console.log("👉 " + code);
        console.log("\nLogin করে নাও…");
    }

    conn.ev.on("creds.update", saveCreds);

    // 🔹 Load All Plugins
    const plugins = loadPlugins();

    // 🔹 Message Handler
    conn.ev.on("messages.upsert", async (msg) => {
        let m = msg.messages[0];
        if (!m.message) return;
        let from = m.key.remoteJid;

        let text =
            m.message.conversation ||
            m.message.extendedTextMessage?.text ||
            "";

        // Plugin Commands
        let prefix = ".";
        if (text.startsWith(prefix)) {
            let cmd = text.slice(1).split(" ")[0].toLowerCase();
            let args = text.split(" ").slice(1).join(" ");

            for (let key in plugins) {
                let plugin = plugins[key];

                if (!plugin.name) continue;
                if (plugin.name === cmd || (plugin.alias && plugin.alias.includes(cmd))) {
                    try {
                        await plugin.run({
                            conn,
                            m,
                            text,
                            args,
                            isAdmin: m.key.fromMe ? true : false,
                            isBotAdmin: true
                        });
                    } catch (err) {
                        console.log("Plugin Error:", err);
                    }
                }
            }
        }

        // 🔹 Anti Mention Event
        for (let key in plugins) {
            if (plugins[key].groupMessage) {
                plugins[key].groupMessage(conn, m);
            }
        }
    });

    // 🔹 Group Participants Update (AntiBot)
    conn.ev.on("group-participants.update", async (update) => {
        for (let key in plugins) {
            if (plugins[key].groupUpdate) {
                plugins[key].groupUpdate(conn, update);
            }
        }
    });

    // 🔹 Auto Reconnect
    conn.ev.on("connection.update", (update) => {
        const { connection, lastDisconnect } = update;

        if (connection === "close") {
            let reason = lastDisconnect?.error?.output?.statusCode;
            if (reason !== DisconnectReason.loggedOut) {
                console.log("⚠️ Reconnecting...");
                startLimonBot();
            } else {
                console.log("❌ Logged Out. Delete session folder.");
            }
        }

        if (connection === "open") {
            console.log("🟢 Limon Bot Connected Successfully!");
        }
    });
}

startLimonBot();
