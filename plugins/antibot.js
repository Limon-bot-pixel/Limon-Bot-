// antibot.js — Limon Bot Anti-Bot System (Full Version Combined)

const fs = require("fs");

module.exports = {
    name: "antibot",
    alias: ["anti-bot", "anti bot"],
    category: "security",
    desc: "Enable or Disable Anti-Bot Protection",

    async run({ conn, m, text, isAdmin, isBotAdmin }) {

        if (!m.isGroup) return m.reply("⚠️ This command only works in groups!");
        if (!isAdmin) return m.reply("⚠️ Only group admins can use this!");
        if (!isBotAdmin) return m.reply("⚠️ Make me admin first!");

        let action = text.trim().toLowerCase();
        if (!["on", "off"].includes(action))
            return m.reply("📌 Usage:\n.antibot on\n.antibot off");

        let db = JSON.parse(fs.readFileSync("./database/Group.json"));
        if (!db[m.chat]) db[m.chat] = {};

        db[m.chat].antibot = action === "on" ? true : false;

        fs.writeFileSync("./database/Group.json", JSON.stringify(db, null, 2));

        return m.reply(`🛡 Anti-Bot System is now: *${action.toUpperCase()}*`);
    }
};

// Auto Bot Detector
module.exports.groupUpdate = async (conn, update) => {
    try {
        const db = JSON.parse(fs.readFileSync("./database/Group.json"));
        const groupId = update.id;

        if (!db[groupId] || !db[groupId].antibot) return;

        if (update.action === "add") {
            for (let user of update.participants) {

                // ⚠ bot-like number detection rules
                let isBot = 
                    user.startsWith("212") || // Morocco spam bots
                    user.startsWith("265") || // Malawi spam bots
                    user.startsWith("91")  || // India bot farms
                    user.includes("bot");      // username contains bot

                if (isBot) {
                    await conn.groupParticipantsUpdate(groupId, [user], "remove");
                    await conn.sendMessage(groupId, { 
                        text: `⚠ Bot Detected & Removed!\n@${user.split("@")[0]}`, 
                        mentions: [user] 
                    });
                }
            }
        }
    } catch (e) {
        console.log("AntiBot Error:", e);
    }
};
