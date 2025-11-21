module.exports = {
    name: "close",
    alias: ["lock", "mute"],
    desc: "Close the group so only admins can send messages",

    run: async (sock, msg) => {
        try {
            const from = msg.key.remoteJid;

            // Check group
            if (!msg.key.participant)
                return sock.sendMessage(from, { text: "❗ This command only works in groups." });

            // Check admin
            const groupMetadata = await sock.groupMetadata(from);
            const admins = groupMetadata.participants.filter(p => p.admin);
            const isAdmin = admins.some(p => p.id === msg.key.participant);

            if (!isAdmin)
                return sock.sendMessage(from, { text: "❗ Only Group Admins can use this command!" });

            // Make group closed
            await sock.groupSettingUpdate(from, "announcement");

            await sock.sendMessage(from, {
                text: "🔐 *Group is now CLOSED!*\nOnly Admins can send messages."
            });

        } catch (e) {
            console.log("CLOSE ERROR =>", e);
            await sock.sendMessage(msg.key.remoteJid, { text: "❌ Something went wrong!" });
        }
    }
};
