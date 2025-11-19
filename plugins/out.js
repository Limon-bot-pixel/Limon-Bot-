module.exports = {
  name: "out",
  alias: ["leave", "exit"],
  desc: "Bot leaves the group",
  category: "Group",
  use: '',

  start: async (sock, m, { isAdmin, isBotAdmin }) => {

    // Check Admin Permission
    if (!isAdmin) return m.reply("❌ *শুধুমাত্র এডমিনরা এই কমান্ড ব্যবহার করতে পারবে!*")

    // Check Bot Admin
    if (!isBotAdmin) return m.reply("❌ *আমি এখানে এডমিন না, তাই বের হতে পারছি না!*")

    // Stylish Message Before Leaving
    let msg = `
┏━━❰ 👋 𝙇𝙄𝙈𝙊𝙉 𝘽𝙊𝙏 𝙀𝙓𝙄𝙏 ❱━━┓

⚡ *Group থেকে বিদায় নিচ্ছি!*  
💚 তোমাদের সাথে সময় কাটিয়ে ভালো লাগলো।  
🚀 প্রয়োজনে আবার ইনভাইট করো।  

┗━━━━━━━━━━━━━━━━━━┛
`

    await sock.sendMessage(m.chat, { text: msg })

    // Leave Group
    await sock.groupLeave(m.chat)
  }
}