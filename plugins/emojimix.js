const axios = require("axios");

module.exports = {
    name: "emojimix",
    alias: ["mix", "emix"],
    desc: "Mix two emojis and send as sticker",

    run: async (sock, msg, args) => {
        try {
            const from = msg.key.remoteJid;

            if (!args.includes("+")) {
                return sock.sendMessage(from, {
                    text: "📌 Example:\n.emojimix 😊+🔥\n\n🍋 Limon Tip: দুই ইমোজির মাঝে + দিতে হবে।"
                });
            }

            const [emoji1, emoji2] = args.split("+").map(e => e.trim());

            if (!emoji1 || !emoji2) {
                return sock.sendMessage(from, { text: "❗ দুইটি ইমোজি সঠিকভাবে লিখো ভাই Limon 💛" });
            }

            // Google Emoji Kitchen API (free)
            const url = `https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimH0AIjHLzHZXvH07c2RHAFKh4vM6qg&contentfilter=high&media_filter=png_transparent&collection=emoji_kitchen_v5&q=${emoji1}_${emoji2}`;

            const { data } = await axios.get(url);

            if (!data || !data.results || data.results.length === 0) {
                return sock.sendMessage(from, { 
                    text: `❌ এই ইমোজি দুটো mix করা যায়নি:\n${emoji1} + ${emoji2}` 
                });
            }

            const image = data.results[0].media_formats.png_transparent.url;

            // Send as sticker
            await sock.sendMessage(from, {
                sticker: { url: image }
            });

            await sock.sendMessage(from, {
                text: `🍋✨ *Emoji Mix Success!*  
${emoji1} + ${emoji2} = 💛 Limon Style Sticker`
            });

        } catch (err) {
            console.log("EMOJIMIX ERROR:", err);
            await sock.sendMessage(msg.key.remoteJid, { text: "❌ Emoji Mix system overheat 😭" });
        }
    }
};
