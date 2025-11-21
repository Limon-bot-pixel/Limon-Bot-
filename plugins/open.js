module.exports = {
    name: "open",
    alias: ["unlock", "unmute"],
    desc: "Open the group so everyone can send messages",

    run: async (sock, msg) => {
        try {
            const from = msg.key.remoteJid;

            // Group Check
            if (!msg.key.participant)
                return sock.sendMessage(from, { text: "❗ This command only works in groups." });

            // Admin Check
            const groupMetadata = await sock.groupMetadata(from);
            const admins = groupMetadata.participants.filter(p => p.admin);
            const isAdmin = admins.some(p => p.id === msg.key.participant);

            if (!isAdmin)
                return sock.sendMessage(from, { text: "❗ Only Group Admins can use this command!" });

            // Make Group Open
            await sock.groupSettingUpdate(from, "not_announcement");

            await sock.sendMessage(from, {
                text: "🔓 *Group is now OPEN!*\nEveryone can send messages."
            });

        } catch (e) {
            console.log("OPEN ERROR =>", e);
            await sock.sendMessage(msg.key.remoteJid, { text: "❌ Something went wrong!" });
        }
    }
};
