const fs = require("fs")

module.exports = {
  name: "creategroup",
  alias: ["cg", "makegroup", "newgroup"],
  desc: "Create a fully setup WhatsApp group with all auto systems",
  category: "Group",

  start: async (sock, m, { text, prefix, command }) => {
    
    if (!text) {
      return m.reply(`❗ *গ্রুপের নাম দিতে হবে ভাই Limon*\n\nউদাহরণ:\n${prefix + command} Limon Special Group`)
    }

    // Members to add
    let members = m.mentionedJid.length > 0 ? m.mentionedJid : [m.sender]

    try {
      // Create Group
      const newGroup = await sock.groupCreate(text, members)
      const groupId = newGroup.id

      // Auto Group Description
      const description = `
👑 *Welcome to ${text}*

📌 Powered By: Limon Bot V5  
⚡ Creator: @${m.sender.split("@")[0]}
💚 Stay Active & Spread Love 💚
`
      await sock.groupUpdateDescription(groupId, description)

      // Auto Group Picture Set
      const dp = "./media/groupdp.jpg"  // <-- এখানে তোমার ছবি রাখো
      if (fs.existsSync(dp)) {
        const buffer = fs.readFileSync(dp)
        await sock.updateProfilePicture(groupId, buffer)
      }

      // Promote Creator
      await sock.groupParticipantsUpdate(groupId, [m.sender], "promote")

      // Auto Welcome / Goodbye Enable (database হলে সেখানে ON করতে হবে)
      global.db = global.db || {}
      global.db[groupId] = {
        welcome: true,
        goodbye: true,
        rules: true
      }

      // Auto Send Welcome Message
      let welcomeMsg = `
┏━━❰ 🎉 𝙉𝙀𝙒 𝙂𝙍𝙊𝙐𝙋 𝙎𝙀𝙏𝙐𝙋 ❱━━┓

📛 *Group Name:* ${text}
👥 *Members Added:* ${members.length}
👑 *Creator:* @${m.sender.split("@")[0]}

🟢 Auto Welcome: ENABLED  
🔴 Auto Goodbye: ENABLED  
📜 Auto Rules: ENABLED  
🖼 Group DP: SET  
📄 Description: SET  

🔗 Invite Link Creating...
┗━━━━━━━━━━━━━━━━━━┛
`
      await sock.sendMessage(groupId, { 
        text: welcomeMsg, 
        mentions: [m.sender] 
      })

      // Auto Rules Message
      const rules = `
📜 *Group Rules – By Limon Bot*  
1️⃣ সবাই ভদ্র আচরণ করবেন  
2️⃣ স্প্যাম করা নিষেধ  
3️⃣ এডমিন ছাড়া লিংক নয়  
4️⃣ মেয়েদের বিরক্ত করলে কিক  
🔥 Enjoy Your Stay!  
`
      await sock.sendMessage(groupId, { text: rules })

      // Fetch Invite Link
      const invite = await sock.groupInviteCode(groupId)

      // Final message inside group
      await sock.sendMessage(groupId, { 
        text: `🔗 *Group Link:* https://chat.whatsapp.com/${invite}`
      })

      // Confirmation to owner
      await m.reply(`✅ *${text}* গ্রুপ সম্পূর্ণভাবে তৈরি ও সেটআপ করা হয়েছে ভাই Limon!`)

    } catch (err) {
      console.log(err)
      return m.reply("❌ গ্রুপ তৈরি করতে সমস্যা হয়েছে ভাই!")
    }
  }
}