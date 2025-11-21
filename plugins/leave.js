module.exports = {
    name: "leave",
    alias: ["exit", "left", "getout"],
    desc: "Leave the group with AI style",

    run: async (sock, msg) => {
        try {
            const from = msg.key.remoteJid;

            if (!from.endsWith("@g.us")) {
                return sock.sendMessage(from, {
                    text: "❌ This command only works in groups!"
                });
            }

            // Optional: Only admins can make bot leave
            const groupMetadata = await sock.groupMetadata(from);
            const participants = groupMetadata.participants;
            const admins = participants.filter(a => a.admin).map(a => a.id);

            const sender = msg.key.participant;

            if (!admins.includes(sender)) {
                return sock.sendMessage(from, {
                    text: "❌ শুধুমাত্র গ্রুপ অ্যাডমিন বটকে Leave করাতে পারবে!"
                });
            }

            await sock.sendMessage(from, {
                text: "🍋🚪 *Limon Bot Leaving This Group…*\nধন্যবাদ সবাইকে 💛✨"
            });

            await new Promise(resolve => setTimeout(resolve, 1500));

            await sock.groupLeave(from);

        } catch (err) {
            console.log("LEAVE ERROR:", err);
            await sock.sendMessage(msg.key.remoteJid, {
                text: "❌ Leave System Error 😭"
            });
        }
    }
};
