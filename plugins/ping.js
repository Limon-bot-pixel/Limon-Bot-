module.exports = {
  name: "ping",
  alias: ["speed", "pong", "alive"],
  desc: "Show bot speed with auto reaction",
  category: "Core",

  start: async (sock, m) => {

    // Auto Reaction Emojis
    const reacts = [
      "💚","⚡","🔥","✨","🚀","💥","🛰️","🎯",
      "😎","🤖","📡","⏳","🌟","💫","🧿","🪬",
      "🌐","⚙️","🛠️","📱","💻","🥵","😌"
    ]

    // Random React
    const randomReact = reacts[Math.floor(Math.random() * reacts.length)]

    // Send reaction to user
    await sock.sendMessage(m.chat, {
      react: { text: randomReact, key: m.key }
    })

    // Speed test
    let start = new Date().getTime()
    let msg = await sock.sendMessage(m.chat, { text: "🔄 *Checking ping…*" })
    let end = new Date().getTime()
    let ping = end - start

    let result = `
┏━━❰ *📡 PING REPORT* ❱━━┓

⚡ *Bot Speed:* ${ping} ms  
🤖 *Bot:* Limon Bot  
🟢 *Status:* Online  
⚙️ *Server:* Running Successfully  
🚀 *Power:* Limonايڪـͬــͤــᷜــͨــͣــͪـي_么  
📌 *Version:* V5  

┗━━━━━━━━━━━━━━━━━━┛
`

    await sock.sendMessage(m.chat, { text: result }, { quoted: msg })
  }
}