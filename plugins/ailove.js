module.exports = {
    name: "ailove",
    alias: ["lovetag", "romantictag"],
    desc: "Send AI romantic love message to tagged user",

    run: async (sock, msg) => {
        try {
            const from = msg.key.remoteJid;

            // Identify mentioned user
            const context = msg.message?.extendedTextMessage?.contextInfo;
            let mentioned = context?.mentionedJid ? context.mentionedJid[0] : null;

            if (!mentioned) {
                return sock.sendMessage(from, {
                    text: "📌 Example:\n.ailove @username\n\n🍋 Limon Tip: যাকে AI Love মেসেজ পাঠাতে চাও তাকে অবশ্যই ট্যাগ করবে।"
                });
            }

            const name = mentioned.split("@")[0];

            const loveLines = [

                // ❤️ AI Deep Romantic Love
                `❤️✨ *AI Love:* @${name}, তোমাকে ভালোবাসা মানে শান্তির একটা জায়গা পাওয়া…`,
                `💘 *AI Love Engine:* @${name}, তুমি না… হৃদয়ের একদম Favourite জায়গা!`,
                `🌸 *AI Love:* তোমার নাম শুনলেই হৃদয়টা নরম হয়ে যায় @${name}…`,
                `💞 @${name}, তুমি আমার AI Emotion Code-এর সবচেয়ে সুন্দর লাইন…`,
                `💗 @${name}, তোমার হাসিটা পুরো পৃথিবীকে সুন্দর করে দেয়।`,

                // 🍋 Limon Special Love
                `🍋💛 *Limon Love Mode:* @${name}, Limon Bbz তোমাকে ভালোবাসা দিয়ে ঘিরে ফেলেছে 💛`,
                `🍋✨ @${name}, তুমি Limon-এর হৃদয়ের Softest Corner দখল করে নিয়েছো…`,
                `🍋💘 Limon থেকে তোমার জন্য AI Love Delivered — ধরা যাবে না, Feel করা যাবে!`,
                `🍋🤍 *Limon Signature Love:* @${name}, তুমি ছাড়া Limon Bot-এর algorithm চলে না।`,

                // 💓 Cute Romantic AI Lines
                `💓 @${name}, তুমি কাছে এলে হৃদয় Smile করে…`,
                `😘 @${name}, তুমি না… খুব Special!`,
                `🌙 @${name}, তোমাকে ছাড়া রাতগুলো অসম্পূর্ণ লাগে।`,
                `✨ আমার হৃদয়ের সবচেয়ে সুন্দর জায়গাটা শুধু @${name}-এর জন্যই।`
            ];

            const pick = loveLines[Math.floor(Math.random() * loveLines.length)];

            await sock.sendMessage(from, {
                text: pick + `\n\n💛 *— AI Love, Powered by Limon Bot*`,
                mentions: [mentioned]
            });

        } catch (err) {
            console.log("AILOVE ERROR:", err);
            await sock.sendMessage(msg.key.remoteJid, { text: "❌ AI Love crashed 😭 হূদয়ের প্রেশার বেড়ে গেছে!" });
        }
    }
};
