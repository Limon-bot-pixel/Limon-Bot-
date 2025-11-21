module.exports = {
    name: "setdesc",
    alias: ["gdesc", "setbio"],
    desc: "Set new group description",

    run: async (sock, msg, args) => {
        try {
            const from = msg.key.remoteJid;

            // Check if message is in a group
            if (!msg.key.participant)
                return sock.sendMessage(from, { text: "❗ This command works only in groups!" });

            // Admin check
            const metadata = await sock.groupMetadata(from);
            const admins = metadata.participants.filter(p => p.admin);
            const isAdmin = admins.some(p => p.id === msg.key.participant);

            if (!isAdmin)
                return sock.sendMessage(from, { text: "❗ Only admins can set group description!" });

            // Check description text
            const desc = args.trim();
            if (!desc)
                return sock.sendMessage(from, { text: "📌 Example: *.setdesc Welcome to Limon Group!*" });

            // Update group description
            await sock.groupUpdateDescription(from, desc);

            await sock.sendMessage(from, { 
                text: `✅ *Group description updated to:*\n\n${desc}`
            });

        } catch (err) {
            console.log("SETDESC ERROR:", err);
            await sock.sendMessage(msg.key.remoteJid, { text: "❌ Failed to change group description!" });
        }
    }
};
