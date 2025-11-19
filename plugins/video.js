const yts = require("yt-search");
const axios = require("axios");

module.exports = {
  name: "video",
  alias: ["mp4"],
  category: "Media",

  start: async (sock, m, { text }) => {
    if (!text) return m.reply("🎥 ভিডিওর নাম লিখুন!\nউদাহরণ: *.video Ami Tomake Chai*");

    let search = await yts(text);
    let res = search.videos[0];

    let api = `https://api.vihangayt.com/download/ytmp4?url=${res.url}`;
    let data = await axios.get(api);
    let video = await axios.get(data.data.data.url, { responseType: "arraybuffer" });

    await m.reply(`🎬 *${res.title}* Uploading...`);

    sock.sendMessage(m.chat, {
      video: video.data,
      caption: res.title
    }, { quoted: m });
  }
}