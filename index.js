const {
    default: makeWASocket,
    useMultiFileAuthState,
    fetchLatestBaileysVersion,
    Browsers
} = require("@whiskeysockets/baileys")

const fs = require("fs")
const path = require("path")

async function connectToWhatsApp() {

    const sessionPath = './session'
    if (!fs.existsSync(sessionPath)) fs.mkdirSync(sessionPath)

    const { state, saveCreds } = await useMultiFileAuthState(sessionPath)
    const { version } = await fetchLatestBaileysVersion()

    console.log("🟢 Connecting to WhatsApp...")
    
    const sock = makeWASocket({
        version,
        auth: state,
        browser: Browsers.macOS('Safari'),
        printQRInTerminal: true   // ⬅️ Pair Code / QR দেখাবে
    })

    // 🟢 Connection Message
    sock.ev.on("connection.update", (update) => {
        const { connection, lastDisconnect } = update

        if (connection === "open") {
            console.log("✅ Limon Bot Connected Successfully!")
        }

        if (connection === "close") {
            console.log("❌ Connection closed. Reconnecting...")
            connectToWhatsApp()
        }

        // Debug Logs Print
        if (update.qr) {
            console.log("📌 Scan this QR Code to log in.")
        }
    })

    // 🟢 Save Session
    sock.ev.on("creds.update", saveCreds)

    // 🟢 Message Handler
    sock.ev.on("messages.upsert", async (msg) => {
        try {
            const m = msg.messages[0]
            if (!m.message) return
            const from = m.key.remoteJid

            // Example Command
            if (m.message.conversation === ".ping") {
                await sock.sendMessage(from, { text: "Pong! 🏓" })
            }

        } catch (err) {
            console.log("Message Error:", err)
        }
    })
}

connectToWhatsApp()

const handler = require("./message-handler")

sock.ev.on("messages.upsert", async (msg) => {
    handler(sock, msg)
})
