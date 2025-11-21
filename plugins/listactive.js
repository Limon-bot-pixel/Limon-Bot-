const fs = require("fs");

module.exports = {
    name: "listactive",
    alias: ["active", "activelist"],
    desc: "Show the most active members in the group",

    run: async (sock, msg) => {
        try {
            const from = msg.key.remoteJid;

            if (!from.endsWith("@g.us")) {
                return sock.sendMessage(from, { text: "❌ এই কমান্ড শুধুমাত্র গ্রুপে কাজ করবে!" });
            }

            // Load activity database
            const dbPath = "./database/activity.json";

            if (!fs.existsSync(dbPath)) {
                fs.writeFileSync(dbPath, JSON.stringify({}));
            }

            const db = JSON.parse(fs.readFileSync(dbPath));

            if (!db[from]) {
                return sock.sendMessage(from, {
                    text: "📊 এখনো কোনো Activity Data পাওয়া যায়নি!\nকেউ মেসেজ দিলে ডাটা সেভ হবে 🍋🔥"
                });
            }

            const groupActivity = db[from];
            const sorted = Object.entries(groupActivity)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 20); // Top 20 active users

            let text = `
🍋📊 *LIMON BOT — ACTIVE MEMBER LIST*
AI Powered • Active Checker

━━━━━━━━━━━━━━━
`;

            let count = 1;
            for (const [user, msgs] of sorted) {
                text += `*${count}. @${user.split("@")[0]}* — *${msgs} messages*\n`;
                count++;
            }

            text += `
━━━━━━━━━━━━━━━
🍋 *Powered by Limon Bbz AI*
`;

            await sock.sendMessage(from, {
                text,
                mentions: sorted.map(([user]) => user)
            });

        } catch (err) {
            console.log("ACTIVE LIST ERROR:", err);
            await sock.sendMessage(msg.key.remoteJid, {
                text: "❌ Active List Error 😭"
            });
        }
    }
};
