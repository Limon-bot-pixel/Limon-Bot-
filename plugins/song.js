const yts = require("yt-search");
const axios = require("axios");

module.exports = {
  name: "song",
  alias: ["music", "audio"],
  category: "Media",

  start: async (sock, m, { text }) => {
    if (!text) return m.reply("🎧 গানটির নাম লিখুন!\nউদাহরণ: *.song Oniket Prantor*");

    let search = await yts(text);
    let result = search.videos[0];
    if (!result) return m.reply("❌ গান পাওয়া যায়নি!");

    await m.reply(`🎶 *${result.title}*\n📤 Uploading...`);

    let api = `https://api.vihangayt.com/download/ytmp3?url=${result.url}`;
    let req = await axios.get(api);
    let audio = await axios.get(req.data.data.url, { responseType: "arraybuffer" });

    sock.sendMessage(m.chat, {
      audio: audio.data,
      mimetype: "audio/mpeg",
      fileName: `${result.title}.mp3`
    }, { quoted: m });
  }
}