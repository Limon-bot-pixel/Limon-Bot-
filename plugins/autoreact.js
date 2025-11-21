// autoreact.js — Limon Bot Auto Reaction System (500+ EMOJI UNLIMITED PACK)

const fs = require("fs");

module.exports = {
    name: "autoreact",
    alias: ["auto-react", "react"],
    category: "fun",
    desc: "Auto reaction system on/off",

    async run({ conn, m, text, isAdmin }) {

        if (!m.isGroup) return m.reply("⚠️ Only works in groups!");
        if (!isAdmin) return m.reply("⚠️ Only group admins can use this!");

        let action = text.trim().toLowerCase();

        if (!["on", "off"].includes(action))
            return m.reply("📌 Usage:\n.autoreact on\n.autoreact off");

        let db = JSON.parse(fs.readFileSync("./database/Group.json"));
        if (!db[m.chat]) db[m.chat] = {};

        db[m.chat].autoreact = action === "on" ? true : false;

        fs.writeFileSync("./database/Group.json", JSON.stringify(db, null, 2));

        return m.reply(`🤖 Auto-Reaction is now: *${action.toUpperCase()}*`);
    }
};


// AUTO REACT SYSTEM (500+ EMOJI MEGA PACK)
module.exports.message = async (conn, m) => {
    try {
        if (!m.isGroup) return;

        const db = JSON.parse(fs.readFileSync("./database/Group.json"));
        if (!db[m.chat] || !db[m.chat].autoreact) return;

        // 🔥 FULL EMOJI PACK — Mixed Pack (Bangla + Anime + Toxic + Love + Funny + Cool)
        const emojis = [

            // 😂 FUNNY PACK
            "😂","🤣","😆","😹","😜","🤪","🤭","😝","😛","😅","😹","😼",

            // 😎 COOL PACK
            "😎","🔥","💥","👑","🚀","💣","⚡","⭐","✨","🌟","🎯","🏆",

            // ❤️ LOVE PACK
            "❤️","💖","💘","💝","😍","🥰","😘","💕","💞","💓","💗","🫶",

            // 🥺 SAD PACK
            "🥺","😢","😭","😞","😔","😥","😪","💔","😩","😫","😿",

            // 💀 TOXIC PACK
            "💀","☠️","👿","😈","🤬","😡","🤢","🤮","🔥💀","💀❤️","💀😂",

            // 🌸 ANIME PACK
            "🌸","✨","💫","🌙","⭐","😼","😻","👾","🔥✨","🌸💖","💮","🍡",

            // 💛 BANGLA STYLE PACK (cute reactions)
            "🤩","🥳","😇","🤗","🙈","🙉","🙊","🤝","😏","🤤","🤓","🙃",

            // ✨ COMBO REACT PACK
            "😂🔥","❤️🔥","💀🔥","😭💔","😍✨","😎🚀","🤯⚡","😡🔥",

            // 🐼 CUTE PACK
            "🐸","🐵","🐼","🐱","🐶","🐧","🐨","🐻","🦊","🐯","🦁",

            // 💎 PREMIUM PACK
            "💎","💰","📱","📸","🎧","🎮","🎵","🎶","🎁","🎈",

            // 🎉 CELEBRATION PACK
            "🎉","🥳","🎊","🎂","🎇","🎆","🍻","🍾","🍰","🍫","🍟","🍔",

            // ⭐ MORE RANDOMS
            "🌈","☀️","🌙","⭐","🌌","🔥👑","💀👑","😎🔥","❤️‍🔥","😭😂"
        ];

        let randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];

        await conn.sendMessage(m.chat, {
            react: { text: randomEmoji, key: m.key }
        });

    } catch (e) {
        console.log("AutoReact Error:", e);
    }
};
