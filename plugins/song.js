// song.js — Limon Bot YouTube Song Downloader

const yts = require("yt-search");
const ytdl = require("@distube/ytdl-core");
const fs = require("fs");
const { writeFileSync } = require("fs");

module.exports = {
    name: "song",
    alias: ["music", "audio"],
    desc: "Download MP3 from YouTube",
    category: "media",

    async run({ conn, m, text }) {
        try {
            if (!text) return m.reply("📌 Usage:\n.song alan walker faded");

            m.reply("🎧 Searching your song…");

            let search = await yts(text);
            let video = search.videos[0];

            if (!video) return m.reply("❌ Song not found!");

            let url = video.url;

            m.reply("⬇ Downloading audio… Wait…");

            let mp3Path = `./tmp/song-${m.sender}.mp3`;
            const stream = ytdl(url, {
                filter: "audioonly",
                quality: "highestaudio",
            });

            const file = fs.createWriteStream(mp3Path);
            stream.pipe(file);

            file.on("finish", async () => {
                await conn.sendMessage(m.chat, {
                    audio: fs.readFileSync(mp3Path),
                    mimetype: "audio/mpeg",
                    fileName: video.title + ".mp3",
                    caption: `🎶 *${video.title}*\nDuration: ${video.timestamp}\nViews: ${video.views}`
                });

                fs.unlinkSync(mp3Path); // Delete after sending
            });

        } catch (e) {
            console.log(e);
            m.reply("❌ Error downloading song!");
        }
    }
};
