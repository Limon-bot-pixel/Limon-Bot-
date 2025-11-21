// antibot.js — Limon Bot Anti-Bot Protection System

module.exports = {
    name: "antibot",
    alias: ["anti bot", "anti-bot"],
    desc: "Block or Kick Bot-like Numbers from Group",
    category: "security",
  
    async run({ conn, m, text, isAdmin, isBotAdmin }) {

        if (!isAdmin) return m.reply("⚠️ Only group admins can use this!");
        if (!isBotAdmin) return m.reply("⚠️ Make me admin first!");

        let action = text.toLowerCase().trim();

        if (!["on", "off"].includes(action))
            return m.reply("✅ Usage:\n.antibot on\n.antibot off");

        let group = await conn.groupMetadata(m.chat);
        let db = require("../database/Group.json");

        if (!db[m.chat]) db[m.chat] = {};

        db[m.chat].antibot = action === "on" ? true : false;

        require("fs").writeFileSync("./database/Group.json", JSON.stringify(db, null, 2));

        m.reply(`🛡️ Anti-Bot System is now: *${action.toUpperCase()}*`);
    }
};
