module.exports = {
    name: "autostatus",
    alias: ["asr", "autoreactstatus"],
    desc: "Auto react to WhatsApp status (AI Reaction)",

    run: async (sock, msg, args) => {
        try {
            const from = msg.key.remoteJid;
            const text = args.trim().toLowerCase();

            global.autoStatusReact = global.autoStatusReact || {};

            if (!["on", "off"].includes(text)) {
                return sock.sendMessage(from, {
                    text: "📌 Example:\n.autostatus on\n.autostatus off\n\n🍋 Limon Tip: Status React On করলে বট যেকোনো স্ট্যাটাসে অটো ইমোজি দিয়ে রিএক্ট করবে!"
                });
            }

            global.autoStatusReact[from] = text === "on";

            await sock.sendMessage(from, {
                text: text === "on"
                    ? "💛 *Limon Auto Status React:* ON\n\n📲 এখন থেকে স্ট্যাটাস দেখলেই AI React যাবে!"
                    : "🍋 *Auto Status React:* OFF করা হয়েছে।"
            });

        } catch (err) {
            console.log("AUTO STATUS ERROR:", err);
        }
    }
};


// 🟡 AUTO REACTION SYSTEM
module.exports.statusUpdate = async (sock, update) => {
    try {
        const jid = update.jid;
        const message = update.message;

        if (!global.autoStatusReact[jid]) return;

        // Random reactions
        const reacts = ["😍", "🔥", "❤️", "✨", "💛", "😎", "🥰", "👍", "😉"];
        const pick = reacts[Math.floor(Math.random() * reacts.length)];

        await sock.sendMessage(jid, {
            react: {
                text: pick,
                key: update.key
            }
        });

        await sock.sendMessage(jid, {
            text: `🍋✨ *Limon Auto Reaction Sent!*\nEmoji: ${pick}`
        });

    } catch (e) {
        console.log("STATUS REACT ERROR:", e);
    }
};
