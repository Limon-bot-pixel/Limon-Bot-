module.exports = {
  name: "antimention",
  alias: ["antigroupmention", "agm"],
  desc: "Block @everyone / Mass Mentions",
  category: "Moderation",

  enabled: false,

  start: async (sock, m, { text }) => {

    if (text === "on") {
      module.exports.enabled = true;
      return m.reply("🛡️ *AntiGroupMention Activated!*  
এখন কেউ @everyone / mass mention দিলে অটো ডিলেট হবে ✔️");
    }

    if (text === "off") {
      module.exports.enabled = false;
      return m.reply("⚠️ *AntiGroupMention Disabled!*");
    }

    if (!text) {
      return m.reply(
`⚙️ AntiGroupMention System  
-------------------------
🔹 .antimention on  
🔹 .antimention off  
-------------------------
Mass mention দিলে অটো ডিলিট + ওয়ার্নিং`
      );
    }
  },

  // Auto Action
  handleMention: async (sock, m) => {
    const _this = module.exports;
    if (!_this.enabled) return;

    // যদি কেউ সবাইকে mention করে
    if (m.message?.extendedTextMessage?.contextInfo?.mentionedJid?.length > 5) {

      // Delete message
      await sock.sendMessage(m.chat, { delete: m.key });

      // Warn user
      return sock.sendMessage(
        m.chat,
        {
          text: `⚠️ *Warning!*  
⛔ Group Mass Mention Allowed নয়!  
প্রেরক: @${m.sender.split("@")[0]}`,
          mentions: [m.sender],
        }
      );
    }
  }
};