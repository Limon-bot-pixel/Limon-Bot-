const fs = require("fs");

module.exports = {
    name: "top",
    alias: ["topactive", "toprank", "topmsg"],
    desc: "Show top active members ranking in the group",

    run: async (sock, msg) => {
        try {
            const from = msg.key.remoteJid;

            if (!from.endsWith("@g.us")) {
                return sock.sendMessage(from, { text: "❌ এই কমান্ড শুধু গ্রুপে ব্যবহার করা যাবে!" });
            }

            const dbPath = "./database/activity.json";

            if (!fs.existsSync(dbPath)) {
                return sock.sendMessage(from, {
                    text: "📊 Activity Database তৈরি হয়নি!\nকেউ মেসেজ দিলেই ডাটা সেভ শুরু হবে 🍋🔥"
                });
            }

            const db = JSON.parse(fs.readFileSync(dbPath));
            if (!db[from]) {
                return sock.sendMessage(from, {
                    text: "📊 এই গ্রুপে এখনো কোনো Activity ডাটা নেই!"
                });
            }

            const activity = db[from];

            let sorted = Object.entries(activity)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 15); // Top 15

            let text = `
🏆🍋 *LIMON BOT — TOP ACTIVE MEMBERS*
AI Powered • Message Ranking System
━━━━━━━━━━━━━━━
`;

            let count = 1;
            for (const [user, totalMsg] of sorted) {
                text += `*${count}. @${user.split("@")[0]}* — *${totalMsg} messages*\n`;
                count++;
            }

            text += `
━━━━━━━━━━━━━━━
🏆 *Most Active Members Listed!*
🍋 Powered by *Limon Bbz AI*
`;

            await sock.sendMessage(from, {
                text,
                mentions: sorted.map(([user]) => user)
            });

        } catch (err) {
            console.log("TOP ACTIVE ERROR:", err);
            await sock.sendMessage(msg.key.remoteJid, {
                text: "❌ Top Active Ranking Error 😭"
            });
        }
    }
};
