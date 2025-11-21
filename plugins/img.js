const axios = require("axios");

module.exports = {
    name: "img",
    alias: ["image", "photo", "pic"],
    desc: "Search any image and download",

    run: async (sock, msg, args) => {
        try {
            const from = msg.key.remoteJid;
            const query = args.trim();

            if (!query) {
                return sock.sendMessage(from, {
                    text: "📌 Example:\n.img cat\n.img Limon Bot Logo\n\n🍋 Limon Tip: যে কোনো ছবি চাইলে img দিয়ে সার্চ দাও!"
                });
            }

            // Free Image API (Bing search alternative)
            const url = `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&pretty=1`;

            const res = await axios.get(url);

            if (!res.data || !res.data.Image || res.data.Image === "") {
                return sock.sendMessage(from, {
                    text: "❌ ছবি পাওয়া যায়নি 😢 আবার সার্চ দাও!"
                });
            }

            await sock.sendMessage(from, {
                image: { url: res.data.Image },
                caption: `🖼✨ *AI Image Search — Limon Bot*\n\n🔍 Query: ${query}\n🍋 Powered by Limon Bbz`
            });

        } catch (err) {
            console.log("IMG ERROR:", err);
            await sock.sendMessage(msg.key.remoteJid, { text: "❌ Image system error 😭" });
        }
    }
};
