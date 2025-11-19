// =====================================================
//     🔰 LIMON BOT V5 • FULL ANTIBOT PROTECTION 🔰
// =====================================================

module.exports = {
  name: "antibot",
  alias: ["antibots", "antibotmode"],
  desc: "Enable or Disable Auto Kick for Other Bots",
  category: "Security",

  start: async (sock, m, { text, isGroup, isAdmins }) => {

    if (!isGroup) return m.reply("❌ *এই কমান্ড শুধু গ্রুপে ব্যবহার করা যাবে!*");
    if (!isAdmins) return m.reply("🚫 *এই কমান্ড শুধু অ্যাডমিনদের জন্য!*");

    let chatId = m.chat;
    global.db = global.db || {};
    global.db.antibot = global.db.antibot || {};

    if (text === "on") {
      global.db.antibot[chatId] = true;
      return m.reply("🛡️ *AntiBot System Enabled*\nযে কোনো বট জয়েন করলে অটো কিক হবে 🔥");
    }

    else if (text === "off") {
      delete global.db.antibot[chatId];
      return m.reply("⚠️ *AntiBot System Disabled*");
    }

    else {
      return m.reply("📢 ব্যবহার: *.antibot on / off*");
    }
  }
};


// =====================================================
//     ⚔️ AUTO ANTIBOT ACTION (MERGED HANDLER)
// =====================================================

sock.ev.on('group-participants.update', async (update) => {
  try {
    const { id, participants, action } = update;

    // Check if AntiBot is enabled for this group
    if (!(global.db.antibot && global.db.antibot[id])) return;

    if (action === 'add') {
      for (let user of participants) {

        // 🔍 Bot Detection Rules
        let botNames = ["bot", "md", "automd", "socket", "baileys"];
        let detected = botNames.some(n => user.toLowerCase().includes(n));

        if (detected) {
          // 🦾 Remove Bot
          await sock.groupParticipantsUpdate(id, [user], "remove");

          // 📨 Notify Group
          await sock.sendMessage(id, {
            text: `🚫 *Bot Detected & Auto Kicked!*\n\n@${user.split("@")[0]} কে গ্রুপ থেকে বের করা হয়েছে।`,
            mentions: [user]
          });
        }
      }
    }

  } catch (err) {
    console.log("AntiBot Error:", err);
  }
});