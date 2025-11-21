module.exports = {
    name: "uid",
    alias: ["jid", "userid"],
    desc: "Show User WhatsApp JID / UID",

    run: async (sock, msg) => {
        try {
            const from = msg.key.remoteJid;

            // If user replied to someone
            const ctx = msg.message?.extendedTextMessage?.contextInfo;

            let target;
            if (ctx?.mentionedJid?.length) {
                // Tag করা থাকলে
                target = ctx.mentionedJid[0];
            } else if (ctx?.participant) {
                // রিপ্লাই করলে
                target = ctx.participant;
            } else {
                // না হলে নিজের
                target = msg.key.participant || msg.key.remoteJid;
            }

            await sock.sendMessage(from, {
                text: `🍋✨ *LIMON BOT – USER UID*\n\n👤 *User:* @${target.split("@")[0]}\n🔑 *UID:* ${target}\n\n🍋 Powered by Limon Bbz`,
                mentions: [target]
            });

        } catch (err) {
            console.log("UID ERROR:", err);
            await sock.sendMessage(msg.key.remoteJid, {
                text: "❌ UID System Error 😭"
            });
        }
    }
};
