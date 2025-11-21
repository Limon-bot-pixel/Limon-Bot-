module.exports = {
    name: "love",
    alias: ["iloveu", "luv", "romantic"],
    desc: "AI generated love messages",

    run: async (sock, msg, args) => {
        try {
            const from = msg.key.remoteJid;

            const loveMsgs = [

                // ❤️ AI Romantic Lines
                "❤️ *AI Love Message:* Love is not just a word, it's a universe where your soul feels at home.",
                "💘 Your smile is the only algorithm my heart can run without errors.",
                "💕 If love had a voice, it would whisper your name every moment.",
                "💞 You’re the reason my heart updates its feelings every second.",
                "💗 When I saw you, my heart said: ‘This is the one.’",

                // 🌹 Cute Love Lines
                "🌸 You're cute. No… you're too cute. Actually… you're dangerously cute.",
                "💓 My heart skips a beat when I think of you.",
                "💐 If hugs were data, I’d send you infinite packets.",
                "✨ You shine brighter than my phone’s brightness at 100%.",

                // 💛 Limon Special Love Version
                "🍋 *Limon Love Mode ON* — যখন মন খারাপ, তখনো একটা নাম মনে পড়ে… *Limon 💛*",
                "🍋 Limon-এর ভালোবাসা হলো WiFi-এর মত… চোখে দেখা যায় না, কিন্তু সংযোগটা strongest!",
                "💛 তোমাকে ছাড়া পৃথিবী চলে, কিন্তু *Limon Bbz* এর হৃদয় না!",
                "🍋 *Limon’s Love AI:* If I send love in MB, you’d need unlimited storage…",

                // 🔥 Deep Romantic Lines
                "🔥 My love for you isn’t a moment… it’s a lifetime download.",
                "❤️‍🔥 My heart doesn't beat… it whispers your name.",
                "💘 You’re the reason the moon looks jealous every night.",
                "🌙 If I had a wish, I’d ask for your smile every day.",

                // 💌 Cute Love Notes
                "💌 *Note:* You are my today, tomorrow, and always.",
                "💖 I don’t need the world. I only need you.",
                "🫶 In a world full of choices, I choose you every time.",
                "💞 My heart feels safe with you."
            ];

            const pick = loveMsgs[Math.floor(Math.random() * loveMsgs.length)];

            await sock.sendMessage(from, {
                text: pick + "\n\n✨ *— From Limon Bot with Love* 💛"
            });

        } catch (err) {
            console.log("LOVE ERROR:", err);
            await sock.sendMessage(msg.key.remoteJid, { text: "❌ AI Love system crashed 😭" });
        }
    }
};
