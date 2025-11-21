const axios = require("axios");
const fs = require("fs");

module.exports = {
    name: "tts",
    alias: ["say", "voice"],
    desc: "Convert text into AI voice audio",

    run: async (sock, msg, args) => {
        try {
            const from = msg.key.remoteJid;
            const text = args.trim();

            if (!text) {
                return sock.sendMessage(from, {
                    text: "📌 Example:\n.tts Hello Limon!\n\n🍋 Limon Tip: যে লেখা বলবে সেটা বট ভয়েসে অডিও করে দেবে।"
                });
            }

            // Free TTS API (Google Translate voice)
            const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=en&client=tw-ob`;

            const output = "./tts_output.mp3";
            const response = await axios({
                url,
                method: "GET",
                responseType: "arraybuffer"
            });

            fs.writeFileSync(output, response.data);

            await sock.sendMessage(from, {
                audio: fs.readFileSync(output),
                mimetype: "audio/mpeg",
                ptt: false
            });

            await fs.unlinkSync(output); // delete temp file

            await sock.sendMessage(from, {
                text: `🎤✨ *AI Voice Generated!*\n\n🗣️ "${text}"\n\n🍋 *— Limon Bot Voice Engine*`
            });

        } catch (err) {
            console.log("TTS ERROR:", err);
            await sock.sendMessage(msg.key.remoteJid, { text: "❌ TTS Engine Breakdown 😭" });
        }
    }
};
