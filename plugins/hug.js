module.exports = {
    name: "hug",
    alias: ["givehug", "hugg"],
    desc: "Send a cute hug to someone",

    run: async (sock, msg, args) => {
        try {
            const from = msg.key.remoteJid;

            // Get mentioned user
            const context = msg.message?.extendedTextMessage?.contextInfo;
            let mentioned = context?.mentionedJid ? context.mentionedJid[0] : null;

            if (!mentioned)
                return sock.sendMessage(from, { 
                    text: "📌 Example:\n.hug @user",
                    mentions: []
                });

            const name = mentioned.split("@")[0];

            // Cute Hug Texts
            const hugs = [
                `🤗💛 *Hug Attack!* @${name}, you got a warm hug!`,
                `🫂❤️ @${name}, someone sent you a big hug!`,
                `🤗✨ Sending a soft cute hug to @${name}!`,
                `💛🫂 Hug delivered to @${name}! Stay happy!`
            ];

            // Random hug message
            const msgToSend = hugs[Math.floor(Math.random() * hugs.length)];

            await sock.sendMessage(from, {
                text: msgToSend,
                mentions: [mentioned]
            });

        } catch (err) {
            console.log("HUG ERROR:", err);
            await sock.sendMessage(msg.key.remoteJid, { text: "❌ Failed to send hug!" });
        }
    }
};
