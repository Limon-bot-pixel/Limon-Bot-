// antigroupmention.js — Limon Bot Anti Group Mention System

const fs = require("fs");

module.exports = {
    name: "antimention",
    alias: ["anti-mention", "anti group mention"],
    category: "security",
    desc: "Block mass mentions like @everyone, @all, or mass tagging",

    async run({ conn, m, text, isAdmin, isBotAdmin }) {
        if (!m.isGroup) return m.reply("⚠️ Only works in groups!");
        if (!isAdmin) return m.reply("⚠️ Only group admins can enable this!");
        if (!isBotAdmin) return m.reply("⚠️ Make me admin first!");

        let action = text.trim().toLowerCase();
        if (!["on", "off"].includes(action))
            return m.reply("📌 Usage:\n.antimention on\n.antimention off");

        let db = JSON.parse(fs.readFileSync("./database/Group.json"));
        if (!db[m.chat]) db[m.chat] = {};

        db[m.chat].antimention = action === "on" ? true : false;

        fs.writeFileSync("./database/Group.json", JSON.stringify(db, null, 2));

        return m.reply(`🔰 Anti Group Mention is now: *${action.toUpperCase()}*`);
    }
};


// AUTO DETECT SYSTEM
module.exports.groupMessage = async (conn, m) => {
    try {
        if (!m.isGroup) return;

        let db = JSON.parse(fs.readFileSync("./database/Group.json"));
        if (!db[m.chat] || !db[m.chat].antimention) return;

        let mentions = m.message?.extendedTextMessage?.contextInfo?.mentionedJid || [];
        let sender = m.sender;

        // If tag count > 3 = spam/troll
        if (mentions.length >= 3) {
            await conn.sendMessage(m.chat, {
                text: `⚠️ Stop mass tagging!\n@${sender.split("@")[0]}`,
                mentions: [sender]
            });
        }

        // Detect @everyone or @all
        const text = m.text || "";
        if (text.includes("@everyone") || text.includes("@all")) {
            await conn.sendMessage(m.chat, {
                text: `⚠️ Mass mention is not allowed!\n@${sender.split("@")[0]}`,
                mentions: [sender]
            });
        }

    } catch (e) {
        console.log("AntiMention Error:", e);
    }
};
