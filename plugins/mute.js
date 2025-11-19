module.exports = {
  name: "mute",
  alias: ["groupmute", "gmute"],
  category: "Moderation",
  desc: "Mute the group so only admins can talk",

  muted: false,   // default status

  start: async (sock, m, { text, isAdmin, isBotAdmin }) => {

    if (!isAdmin) return m.reply("❌ আপনি অ্যাডমিন না, তাই এটি ব্যবহার করতে পারবেন না!");
    if (!isBotAdmin) return m.reply("❗ বটকে আগে অ্যাডমিন বানান!");

    if (text === "on") {
      module.exports.muted = true;

      await sock.groupSettingUpdate(m.chat, "announcement"); // only admins can send
      return m.reply("🔇 *Group Muted!* এখন শুধুমাত্র Admin মেসেজ পাঠাতে পারবে।");
    }

    if (text === "off") {
      module.exports.muted = false;

      await sock.groupSettingUpdate(m.chat, "not_announcement"); // everyone can send
      return m.reply("🔊 *Group Unmuted!* এখন সবাই মেসেজ পাঠাতে পারবে।");
    }

    return m.reply(
`⚙️ Group Mute System  
----------------------
🔹 .mute on  
🔹 .mute off  
----------------------
Group কে সম্পূর্ণভাবে মিউট করবে।`
    );
  },

  // Auto Block Message While Muted
  onMessage: async (sock, m, { isAdmin }) => {
    const _this = module.exports;

    if (!_this.muted) return;      // mute চলছে না
    if (isAdmin) return;           // admin হলে allow

    // auto delete user message
    await sock.sendMessage(m.chat, { delete: m.key });

    // warn message
    return sock.sendMessage(
      m.chat,
      {
        text: `⚠️ এই গ্রুপ এখন মিউট করা আছে!  
🔇 শুধুমাত্র অ্যাডমিন মেসেজ পাঠাতে পারবে।`,
      }
    );
  }
};