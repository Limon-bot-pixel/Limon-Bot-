const fs = require("fs");
const path = "./database/topreact.json";

module.exports = {
  name: "topreact",
  alias: ["reactrank", "topreacts", "rankreact"],
  desc: "Show most reaction users",
  category: "fun",

  async run({ sock, m, text }) {
    if (!fs.existsSync(path)) fs.writeFileSync(path, "{}");
    let db = JSON.parse(fs.readFileSync(path));

    let group = m.chat;

    if (!db[group]) db[group] = {};

    // Show leaderboards
    if (!text) {
      let users = Object.entries(db[group]).sort((a, b) => b[1] - a[1]);

      if (users.length === 0)
        return sock.sendMessage(m.chat, { text: "📌 এখনও কোনো react রেকর্ড নেই!" });

      let msg = `╭━━━〔 🔥 *TOP REACT USERS* 〕━━━╮\n\n`;

      let limit = users.slice(0, 10);
      let i = 1;
      for (let [uid, count] of limit) {
        msg += `⭐ *${i}. @${uid.split("@")[0]} — ${count} React*\n`;
        i++;
      }

      msg += `\n╰━━━━━━━━━━━━━━━━━━━━━━╯\nPowered By: Limon`;

      await sock.sendMessage(
        m.chat,
        {
          text: msg,
          mentions: users.map(v => v[0]),
        },
        { quoted: m }
      );
      return;
    }

    // Reset system
    if (text === "reset") {
      db[group] = {};
      fs.writeFileSync(path, JSON.stringify(db, null, 2));
      return sock.sendMessage(m.chat, { text: "✅ সমস্ত react র‍্যাঙ্ক reset করা হয়েছে!" });
    }
  },

  // Auto count reaction
  async reaction({ m }) {
    if (!fs.existsSync(path)) fs.writeFileSync(path, "{}");
    let db = JSON.parse(fs.readFileSync(path));

    let group = m.chat;
    let user = m.key.participant;

    if (!db[group]) db[group] = {};
    if (!db[group][user]) db[group][user] = 0;

    db[group][user] += 1;

    fs.writeFileSync(path, JSON.stringify(db, null, 2));
  }
};