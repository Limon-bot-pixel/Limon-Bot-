module.exports = {
    name: "roast",
    alias: ["savage", "burn"],
    desc: "Roast a tagged user with AI savage lines",

    run: async (sock, msg, args) => {
        try {
            const from = msg.key.remoteJid;

            // Require tagging
            const mention = msg.message.extendedTextMessage?.contextInfo?.mentionedJid;
            if (!mention || mention.length === 0) {
                return sock.sendMessage(from, {
                    text: "❌ Please tag someone to roast!\n\n📌 Example:\n.roast @user"
                });
            }

            const target = mention[0];

            // Random roast lines
            const lines = [
                "তোরে দেখে WiFi পর্যন্ত কানেক্ট হতে চায় না 🤣🔥",
                "ভাই তোরে দেখে Google বলে: ‘No results found.’ 😂",
                "তুই মানুষ না Bug, এক্সিস্ট করতেও Error দেয় 😭😈",
                "তোর মুখ দেখে Night Mode অন হয়ে যায় 🥲💀",
                "তুই এমন লেভেলের লুজার, Snapchat স্ট্রিক পর্যন্ত তোর সাথে ব্রেকআপ করে 🤣🔥",
                "তোর Attitude এত সস্তা, ঈদের অফারেও ফ্রি দিতো 😭😂",
                "তোরে দেখে AI বলে: ‘আমি এটা প্রসেস করতে পারি না।’ 😈💀",
                "তুই এমন slow, 2G ওয়ালাদের কাছে তুই Hero! 😭🔥",
                "তুই না থাকলে পৃথিবী আরো সুন্দর হতো 😭💛",
                "এত useless হইসে যে বালিশেও তোকে সাপোর্ট করে না 🤣"
            ];

            const roastLine = lines[Math.floor(Math.random() * lines.length)];

            await sock.sendMessage(from, {
                text: `😈🔥 *Limon Roast Activated!*\n\n@${target.split("@")[0]}  —\n${roastLine}\n\n🍋 Powered By Limon Bbz`,
                mentions: [target]
            });

        } catch (err) {
            console.log("ROAST ERROR:", err);
            await sock.sendMessage(msg.key.remoteJid, {
                text: "❌ Roast System Error 😭"
            });
        }
    }
};
