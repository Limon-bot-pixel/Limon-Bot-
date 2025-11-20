const fs = require("fs")
const path = require("path")

module.exports = async function messageHandler(sock, msg) {
    try {
        const m = msg.messages[0]
        if (!m.message) return

        const from = m.key.remoteJid
        const isGroup = from.endsWith("@g.us")
        const type = Object.keys(m.message)[0]

        // 🟢 Text Extract
        const body =
            type === "conversation"
                ? m.message.conversation
                : type === "extendedTextMessage"
                ? m.message.extendedTextMessage.text
                : ""

        // No Message → Stop
        if (!body) return

        // 🟢 Prefix System
        const prefix = "."
        if (!body.startsWith(prefix)) return

        const args = body.slice(prefix.length).trim().split(/ +/)
        const command = args.shift().toLowerCase()

        console.log(`⚡ Command: ${command} | From: ${from}`)

        // --------------------------------------------------
        // 🟢 COMMANDS
        // --------------------------------------------------

        // Ping Command
        if (command === "ping") {
            return await sock.sendMessage(from, { text: "🏓 Pong! Limon Bot Alive!" })
        }

        // Help / Menu
        if (command === "menu" || command === "help") {
            const helpText = `
🟡 *Limon Bot V5 Menu*
────────────────────────
🟢 .ping  — Check bot online
🟢 .menu  — Show menu
🟢 .owner — Owner info
🟢 .id    — Your WhatsApp ID
────────────────────────
Made By: *Limon Bbz*
            `
            return await sock.sendMessage(from, { text: helpText })
        }

        // Owner Command
        if (command === "owner") {
            return await sock.sendMessage(from, {
                text: `👑 *Owner Name:* Limon Bbz\n📞 *Owner Number:* 8801623442730`
            })
        }

        // ID Command
        if (command === "id") {
            const ID = m.key.participant || m.key.remoteJid
            return await sock.sendMessage(from, { text: `🆔 *Your ID:* ${ID}` })
        }

        // Unknown command
        await sock.sendMessage(from, { text: `❌ Unknown command: *${command}*` })

    } catch (err) {
        console.log("❌ Handler Error:", err)
    }
          }
