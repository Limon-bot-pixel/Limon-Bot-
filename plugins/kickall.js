module.exports = {
    name: "kickall",
    alias: ["masskick", "allkick"],
    desc: "Remove all group members except admins (Dangerous Command)",

    run: async (sock, msg, args) => {
        try {
            const from = msg.key.remoteJid;

            // Check if group
            if (!from.endsWith("@g.us")) {
                return sock.sendMessage(from, {
                    text: "❌ This command only works in group!"
                });
            }

            const groupMetadata = await sock.groupMetadata(from);
            const participants = groupMetadata.participants;

            // Find admins
            const admins = participants.filter(p => p.admin);
            const adminJids = admins.map(a => a.id);

            // Check if bot is admin
            const botId = sock.user.id.replace(/:.*$/, "");
            if (!adminJids.includes(botId + "@s.whatsapp.net")) {
                return sock.sendMessage(from, {
                    text: "❌ *Limon Bot admin না, তাই Kick All করতে পারবে না!*"
                });
            }

            // Check if user is admin
            const userJid = msg.key.participant || msg.key.remoteJid;
            if (!adminJids.includes(userJid)) {
                return sock.sendMessage(from, {
                    text: "❌ শুধু গ্রুপ অ্যাডমিনরা Kick All ব্যবহার করতে পারবে!"
                });
            }

            await sock.sendMessage(from, {
                text: "⚠️🍋 *Limon Kick All Started…*\n🎯 সব সদস্যকে রিমুভ করা হচ্ছে!"
            });

            // Kick all except admins
            for (const member of participants) {
                if (!adminJids.includes(member.id)) {
                    await sock.groupParticipantsUpdate(
                        from,
                        [member.id],
                        "remove"
                    );

                    await new Promise(r => setTimeout(r, 800)); // smooth delay
                }
            }

            await sock.sendMessage(from, {
                text: "🍋🔥 *Kick All Completed!*"
            });

        } catch (err) {
            console.log("KICKALL ERROR:", err);
            await sock.sendMessage(msg.key.remoteJid, {
                text: "❌ Kick All Error 😭"
            });
        }
    }
};
