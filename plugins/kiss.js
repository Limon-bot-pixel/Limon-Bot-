module.exports = {
    name: "kiss",
    alias: ["kis", "smack", "kissu"],
    desc: "Send an AI styled romantic kiss message",

    run: async (sock, msg) => {
        try {
            const from = msg.key.remoteJid;

            // Get mentioned user
            const context = msg.message?.extendedTextMessage?.contextInfo;
            let mentioned = context?.mentionedJid ? context.mentionedJid[0] : null;

            if (!mentioned) {
                return sock.sendMessage(from, {
                    text: "📌 Example:\n.kiss @username\n\n🍋 *Limon Tip:* যার সাথে Kiss পাঠাতে চাও তাকে অবশ্যই ট্যাগ করবে।",
                });
            }

            const name = mentioned.split("@")[0];

            const kissLines = [

                // 💛 AI Kiss Lines
                `😘💛 *AI Kiss Mode:* Sending a soft warm kiss to @${name}…`,
                `💋✨ When lips speak, hearts listen… @${name} এখানে তোমার নামে একটা সুন্দর Kiss পাঠানো হলো…`,
                `❤️‍🔥 A gentle kiss loaded with love has just been delivered to @${name}…`,
                `💞💋 My heart coded a kiss and sent it directly to @${name}…`,
                `🌸 A sweet kiss touched by AI magic has landed on @${name}’s cheeks!`,

                // 🍋 Limon Special Kiss
                `🍋💛 *Limon Kiss:* আমার বটের সবচেয়ে মিষ্টি Kiss গেছে @${name} এর কাছে 💋`,
                `🍋 Kiss Delivered from *Limon Bbz* — যতটা মিষ্টি, ততটাই স্পেশাল 💛`,
                `💛 @${name}, তুমি Officially *Limon-Kissed* এখন 😘`,
                `🍋💋 Limon says: “হাসো… কারণ তোমাকে একটা চুপি চুপি Kiss পাঠালাম!”`,

                // ❤️ Cute Romantic Kisses
                `💋 A kiss is a silent way of saying ‘You matter’… @${name} তুমি matters 💛`,
                `😘✨ Sending warm virtual kisses to @${name} because they deserve sweetness.`,
                `🫶 A soft forehead kiss to @${name} for being special.`
            ];

            const pick = kissLines[Math.floor(Math.random() * kissLines.length)];

            await sock.sendMessage(from, {
                text: pick + `\n\n💛 *— From Limon Bot (AI Love Engine)*`,
                mentions: [mentioned],
            });

        } catch (err) {
            console.log("KISS ERROR:", err);
            await sock.sendMessage(msg.key.remoteJid, { text: "❌ Kiss system crashed 😭" });
        }
    }
};
