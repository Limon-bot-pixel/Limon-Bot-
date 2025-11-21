/*
====================================================
            LIMON BOT — WHATSAPP MD BOT
====================================================
*/

const {
    default: makeWASocket,
    useMultiFileAuthState,
    DisconnectReason,
    fetchLatestBaileysVersion,
    makeCacheableSignalKeyStore
} = require("@whiskeysockets/baileys")

const fs = require("fs")
const path = require("path")
const pino = require("pino")
const { Boom } = require("@hapi/boom")

// ===============================
// 🔥 Pair Code AUTO-LOGIN System
// ===============================

async function pairLogin() {
    const { state, saveCreds } = await useMultiFileAuthState("./session/LimonSession")

    const { version } = await fetchLatestBaileysVersion()
    const conn = makeWASocket({
        logger: pino({ level: "silent" }),
        printQRInTerminal: false,
        browser: ["Limon Bot", "Chrome", "5.0"],
        syncFullHistory: true,
        version,
        auth: {
            creds: state.creds,
            keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "fatal" }))
        }
    })

    // Pair Code System
    if (!conn.authState.creds.registered) {
        console.log("\n================================")
        console.log("      📌 PAIR CODE SYSTEM")
        console.log("================================\n")

        let phone = "8801623442730"
        let code = await conn.requestPairingCode(phone)

        console.log("📲 Your Pair Code:")
        console.log(`👉 ${code}\n`)
    }

    conn.ev.on("creds.update", saveCreds)

    return conn
}

// ===============================
// 🔥 Auto Plugin Loader
// ===============================

function loadPlugins() {
    const pluginDir = path.join(__dirname, "plugins")
    if (!fs.existsSync(pluginDir)) fs.mkdirSync(pluginDir)

    const files = fs.readdirSync(pluginDir).filter(f => f.endsWith(".js"))

    global.PLUGINS = {}

    for (let file of files) {
        try {
            let plugin = require("./plugins/" + file)
            global.PLUGINS[file] = plugin

            console.log("🟢 Loaded Plugin:", file)
        } catch (e) {
            console.log("🔴 Plugin Error:", file, e)
        }
    }
}

// ===============================
// 🔥 Message Handler
// ===============================

async function messageHandler(conn, m) {
    try {
        const msg = m.messages[0]
        if (!msg.message) return

        const from = msg.key.remoteJid
        const type = Object.keys(msg.message)[0]

        // Text Message
        let text = ""
        if (type === "conversation") text = msg.message.conversation
        if (type === "extendedTextMessage") text = msg.message.extendedTextMessage.text

        const prefix = "."
        if (!text.startsWith(prefix)) {

            // AutoReact Support
            for (let plug in global.PLUGINS) {
                if (global.PLUGINS[plug].message) {
                    try { global.PLUGINS[plug].message(conn, msg) } catch { }
                }
            }
            return
        }

        const cmd = text.slice(1).trim().split(" ")[0].toLowerCase()
        const args = text.split(" ").slice(1).join(" ")

        // Built-in commands
        if (cmd === "ping") {
            return conn.sendMessage(from, { text: "Pong! ✅" })
        }

        if (cmd === "menu" || cmd === "help") {
            return conn.sendMessage(from, { text: "📌 *Limon Bot Menu*\n\n- .ping\n- .owner\n- .id\nMore coming soon..." })
        }

        if (cmd === "owner") {
            return conn.sendMessage(from, { text: "👑 Owner: Limon Bbz\n📞 8801623442730" })
        }

        if (cmd === "id") {
            return conn.sendMessage(from, { text: `🆔 Your ID: ${from}` })
        }

        // Plugin Commands
        for (let plug in global.PLUGINS) {
            try {
                let run = global.PLUGINS[plug].run
                let name = global.PLUGINS[plug].name
                let alias = global.PLUGINS[plug].alias || []

                if (!run || !name) continue

                if (cmd === name || alias.includes(cmd)) {
                    await run({
                        conn,
                        m: msg,
                        text,
                        args,
                        isAdmin: true,
                        isBotAdmin: true
                    })
                }
            } catch (err) {
                console.log("Plugin Command Error:", err)
            }
        }

    } catch (e) {
        console.log("❌ Handler Error:", e)
    }
}

// ===============================
// 🔥 Start Function + Auto Restart
// ===============================

async function startBot() {
    loadPlugins()

    const conn = await pairLogin()

    console.log("\n🚀 Limon Bot Started Successfully!\n")

    conn.ev.on("messages.upsert", async m => {
        await messageHandler(conn, m)
    })

    // Auto AntiBot + AntiMention support
    conn.ev.on("group-participants.update", async update => {
        for (let plug in global.PLUGINS) {
            if (global.PLUGINS[plug].groupUpdate) {
                try { global.PLUGINS[plug].groupUpdate(conn, update) } catch { }
            }
        }
    })

    conn.ev.on("connection.update", update => {
        if (update.connection === "open") {
            console.log("📡 Connected to WhatsApp!")
        }
        if (update.connection === "close") {
            let reason = new Boom(update.lastDisconnect.error).output.statusCode
            if (reason !== DisconnectReason.loggedOut) {
                console.log("🛠 Reconnecting...")
                startBot()
            } else {
                console.log("❌ Logged Out — delete LimonSession folder and try again.")
            }
        }
    })
}

startBot()
