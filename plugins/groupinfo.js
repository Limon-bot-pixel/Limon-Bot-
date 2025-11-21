module.exports = {
    name: "groupinfo",
    alias: ["ginfo", "grpinfo"],
    desc: "Show complete group information",

    run: async (sock, msg) => {
        try {
            const from = msg.key.remoteJid;

            // Check group
            if (!msg.key.participant)
                return sock.sendMessage(from, { text: "❗ This command works only in groups!" });

            // Fetch group metadata
            const metadata = await sock.groupMetadata(from);

            const groupName = metadata.subject;
            const groupDesc = metadata.desc || "No description set.";
            const groupOwner = metadata.owner || "Unknown";
            const participants = metadata.participants;
            const totalMembers = participants.length;

            // Count admins
            const admins = participants.filter(p => p.admin);
            const adminCount = admins.length;

            const infoText = `
📌 *GROUP INFORMATION*
——————————————

👥 *Group Name:* ${groupName}
🧑‍🤝‍🧑 *Members:* ${totalMembers}
🛡 *Admins:* ${adminCount}
👑 *Group Owner:* ${groupOwner}

📝 *Description:*
${groupDesc}

🍋 *Requested by:* Limon Bbz
            `;

            await sock.sendMessage(from, { text: infoText });

        } catch (err) {
            console.log("GROUPINFO ERROR:", err);
            await sock.sendMessage(msg.key.remoteJid, { text: "❌ Failed to load group information!" });
        }
    }
};
