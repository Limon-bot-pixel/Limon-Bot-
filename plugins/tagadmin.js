module.exports = {
    name: "tagadmin",
    alias: ["admins", "admin", "mentionadmin"],
    desc: "Tag all group admins",

    run: async (sock, msg) => {
        try {
            const from = msg.key.remoteJid;

            // Check if group
            if (!msg.key.participant)
                return sock.sendMessage(from, { text: "❗ This command works only in groups!" });

            // Fetch group data
            const metadata = await sock.groupMetadata(from);
            const admins = metadata.participants.filter(p => p.admin);

            if (admins.length === 0)
                return sock.sendMessage(from, { text: "❗ No admins found in this group." });

            let adminTags = admins.map(a => a.id);
            let adminList = admins.map(a => `🔹 @${a.id.split("@")[0]}`).join("\n");

            const text = `
👑 *Group Admins Tag*
——————————————

${adminList}

🍋 *Command used by:* Limon Bbz
            `;

            await sock.sendMessage(from, {
                text: text,
                mentions: adminTags
            });

        } catch (err) {
            console.log("TAGADMIN ERROR:", err);
            await sock.sendMessage(msg.key.remoteJid, { text: "❌ Something went wrong!" });
        }
    }
};
