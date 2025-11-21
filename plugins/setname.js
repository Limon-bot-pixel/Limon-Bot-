module.exports = {
    name: "setname",
    alias: ["rename", "gname"],
    desc: "Change group name",

    run: async (sock, msg, args) => {
        try {
            const from = msg.key.remoteJid;

            // Check group
            if (!msg.key.participant)
                return sock.sendMessage(from, { text: "❗ This command works only in groups!" });

            // Admin check
            const metadata = await sock.groupMetadata(from);
            const admins = metadata.participants.filter(p => p.admin);
            const isAdmin = admins.some(p => p.id === msg.key.participant);

            if (!isAdmin)
                return sock.sendMessage(from, { text: "❗ Only admins can use this command!" });

            // Check name
            const newName = args.trim();
            if (!newName)
                return sock.sendMessage(from, { text: "📌 Example: *.setname Limon Paradise Group*" });

            // Set group name
            await sock.groupUpdateSubject(from, newName);

            await sock.sendMessage(from, { 
                text: `✅ Group name changed to:\n🔹 *${newName}*` 
            });

        } catch (err) {
            console.log("SETNAME ERROR:", err);
            await sock.sendMessage(msg.key.remoteJid, { text: "❌ Failed to change group name!" });
        }
    }
};
