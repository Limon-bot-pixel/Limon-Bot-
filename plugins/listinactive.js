const fs = require("fs");

module.exports = {
    name: "listinactive",
    alias: ["inactive", "inactivelist", "li"],
    desc: "Show the least active or inactive members in the group",

    run: async (sock, msg) => {
        try {
            const from = msg.key.remoteJid;

            if (!from.endsWith("@g.us")) {
                return sock.sendMessage(from, { text: "❌ এই কমান্ড শুধুমাত্র গ্রুপে কাজ করবে!" });
            }

            const dbPath = "./database/activity.json";

            if (!fs.existsSync(dbPath)) {
                return sock.sendMessage(from, {
                    text: "📉 এখনো কোনো Activity Data নেই!\nকেউ মেসেজ দিলে ডাটা সেভ হবে 🍋🔥"
                });
            }

            const db = JSON.parse(fs.readFileSync(dbPath));

            if (!db[from]) {
                return sock.sendMessage(from, {
                    text: "📉 এই গ্রুপে এখনো কোনো Activity ডাটা নেই!"
                });
            }

            const activity = db[from];

            // Sort by lowest message count
            const sorted = Object.entries(activity)
                .sort((a, b) => a[1] - b[1])
                .slice(0, 20); // Top 20 least active

            let text = `
🍋📉 *LIMON BOT — INACTIVE MEMBER LIST*
AI Powered • Least Active Checker  
━━━━━━━━━━━━━━━
`;

            let count = 1;
            for (const [user, msgs] of sorted) {
                text += `*${count}. @${user.split("@")[0]}* — *${msgs} messages*\n`;
                count++;
            }

            text += `
━━━━━━━━━━━━━━━
😴 যারা কম মেসেজ দিয়েছে, তারা Inactive ধরা হয়েছে  
🍋 Powered by *Limon Bbz AI*
`;

            await sock.sendMessage(from, {
                text,
                mentions: sorted.map(([user]) => user)
            });

        } catch (err) {
            console.log("INACTIVE LIST ERROR:", err);
            await sock.sendMessage(msg.key.remoteJid, { text: "❌ Inactive List Error 😭" });
        }
    }
};
