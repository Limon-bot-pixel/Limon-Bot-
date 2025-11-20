const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

module.exports = {
    command: ["video", "mp4", "tomp4"],
    description: "Convert any video to mp4 format",

    async run({ m, sock }) {
        try {
            const quoted = m.quoted || m.message.extendedTextMessage?.contextInfo;

            if (!quoted || !quoted.message?.videoMessage) {
                return m.reply("📌 *Please reply to a video to convert it to MP4!*");
            }

            m.reply("⏳ Converting video...");

            const mediaPath = await sock.downloadAndSaveMediaMessage(quoted, "input-video");
            const outputPath = path.join(__dirname, "../media/output.mp4");

            exec(`ffmpeg -i ${mediaPath} -c:v libx264 -c:a aac ${outputPath}`, async (err) => {
                if (err) {
                    console.log(err);
                    return m.reply("❌ FFmpeg error! Maybe FFmpeg is not installed.");
                }

                await sock.sendMessage(m.chat, {
                    video: fs.readFileSync(outputPath),
                    caption: "✅ *Here is your converted MP4 video*"
                });

                fs.unlinkSync(mediaPath);
                fs.unlinkSync(outputPath);
            });

        } catch (e) {
            console.log(e);
            m.reply("⚠️ Error converting video!");
        }
    }
};
