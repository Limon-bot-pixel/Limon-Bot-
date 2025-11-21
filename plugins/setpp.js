module.exports = {
    name: "setpp",
    alias: ["gpp", "setgpp"],
    desc: "Set new group profile picture",

    run: async (sock, msg) => {
        try {
            const from = msg.key.remoteJid;

            // Group check
            if (!msg.key.participant)
                return sock.sendMessage(from, { text: "❗ This command works only in groups!" });

            // Admin check
            const metadata = await sock.groupMetadata(from);
            const admins = metadata.participants.filter(p => p.admin);
            const isAdmin = admins.some(p => p.id === msg.key.participant);

            if (!isAdmin)
                return sock.sendMessage(from, { text: "❗ Only admins can set group profile picture!" });

            // Check if user replied to an image
            const message = msg.message?.extendedTextMessage?.contextInfo;
            if (!message || !message.message?.imageMessage)
                return sock.sendMessage(from, { text: "📌 Please reply to an image using *.setpp*" });

            // Download the image
            const buffer = await sock.downloadMediaMessage({
                message: message.message
            });

            // Set group profile picture
            await sock.updateProfilePicture(from, buffer);

            await sock.sendMessage(from, { 
                text: "✅ *Group profile picture updated successfully!*" 
            });

        } catch (err) {
            console.log("SETPP ERROR:", err);
            await sock.sendMessage(msg.key.remoteJid, { text: "❌ Failed to set group photo!" });
        }
    }
};
