const axios = require("axios");

module.exports = {
    name: "meme",
    alias: ["funny", "memes"],
    desc: "Send a random meme",

    run: async (sock, msg) => {
        try {
            const from = msg.key.remoteJid;

            // Free Random Meme API
            const url = "https://meme-api.com/gimme";

            const response = await axios.get(url);
            const meme = response.data;

            await sock.sendMessage(from, {
                image: { url: meme.url },
                caption: `😂🔥 *Random Meme For You!*\n🍋 Powered by Limon Bot\n\n*Title:* ${meme.title}`
            });

        } catch (err) {
            console.log("MEME ERROR:", err);
            await sock.sendMessage(msg.key.remoteJid, {
                text: "❌ Meme system error 😭"
            });
        }
    }
};
