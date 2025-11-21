module.exports = {
    name: "add",
    alias: ["invite", "addmember"],
    desc: "Add a user to the group",

    run: async (sock, msg, args) => {
        try {
            const from = msg.key.remoteJid;

            // Check if group
            if (!msg.key.participant)
                return sock.sendMessage(from, { text: "❗ This command works only in groups!" });

            // Check admin
            const metadata = await sock.groupMetadata(from);
            const admins = metadata.participants.filter(p => p.admin);
            const isAdmin = admins.some(p => p.id === msg.key.participant);

            if (!isAdmin)
                return sock.sendMessage(from, { text: "❗ Only Group Admins can use this command!" });

            // Check number
            const num = args.trim();
            if (!num)
                return sock.sendMessage(from, { text: "📌 Example: *.add 01623442730*" });

            const user = num.replace(/[^0-9]/g, "") + "@s.whatsapp.net";

            // Add user
            await sock.groupParticipantsUpdate(from, [user], "add");

            await sock.sendMessage(from, {
                text: `✅ Successfully added @${num}`,
                mentions: [user]
            });

        } catch (e) {
            console.log("ADD ERROR:", e);
            await sock.sendMessage(msg.key.remoteJid, { text: "❌ Cannot add user. Maybe number invalid or privacy ON." });
        }
    }
};
