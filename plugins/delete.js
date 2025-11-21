module.exports = {
    name: "delete",
    alias: ["del", "remove"],
    desc: "Delete replied message using bot",

    run: async (sock, msg) => {
        try {
            const from = msg.key.remoteJid;

            // Must reply to a message
            if (!msg.message.extendedTextMessage || !msg.message.extendedTextMessage.contextInfo.stanzaId) {
                return sock.sendMessage(from, {
                    text: "❌ *Please reply to a message to delete it!*\n\n📌 Example:\n.reply করে → .delete"
                });
            }

            const key = {
                remoteJid: from,
                id: msg.message.extendedTextMessage.contextInfo.stanzaId,
                participant: msg.message.extendedTextMessage.contextInfo.participant,
            };

            await sock.sendMessage(from, { delete: key });

            await sock.sendMessage(from, {
                text: "🗑✨ *Message Deleted Successfully!*\n🍋 Powered by Limon Bot"
            });

        } catch (err) {
            console.log("DELETE ERROR:", err);
            await sock.sendMessage(msg.key.remoteJid, { text: "❌ Delete Error 😭" });
        }
    }
};
