const fs = require("fs");

module.exports = {
    name: "kickinactive",
    alias: ["kinactive", "kickinact", "removeinactive"],
    desc: "Kick all inactive members from the group",

    run: async (sock, msg, args) => {
        try {
            const from = msg.key.remoteJid;

            if (!from.endsWith("@g.us")) {
                return sock.sendMessage(from, { text: "❌ এই কমান্ড শুধুমাত্র গ্রুপে কাজ করবে!" });
            }

            const groupMetadata = await sock.groupMetadata(from);
            const participants = groupMetadata.participants;
            const dbPath = "./database/activity.json";

            if (!fs.existsSync(dbPath)) {
                return sock.sendMessage(from, {
                    text: "📉 এখনো Activity Data নেই! কেউ মেসেজ দিলে ডাটা সেভ হবে।"
                });
            }

            const db = JSON.parse(fs.readFileSync(dbPath));

            if (!db[from]) {
                return sock.sendMessage(from, {
                    text: "📉 এই গ্রুপে কোনো Activity ডাটা নেই!"
                });
            }

            const activity = db[from];

            // Admin list
            const admins = participants.filter(a => a.admin).map(a => a.id);

            // Bot is Admin?
            const botId = sock.user.id.replace(/:.*$/, "") + "@s.whatsapp.net";
            if (!admins.includes(botId)) {
                return sock.sendMessage(from, { text: "❌ Limon Bot Admin না, তাই Kick করতে পারবে না!" });
            }

            // User admin check
            const sender = msg.key.participant || msg.key.remoteJid;
            if (!admins.includes(sender)) {
                return sock.sendMessage(from, { text: "❌ শুধু অ্যাডমিনরাই এই কমান্ড ব্যবহার করতে পারবে!" });
            }

            await sock.sendMessage(from, {
                text: "🍋📉 *Inactive সদস্য রিমুভ শুরু হচ্ছে…*\nদয়া করে অপেক্ষা করুন…"
            });

            let targetList = [];

            // Zero / Low message users find
            for (const member of participants) {
                if (!admins.includes(member.id)) {
                    const count = activity[member.id] || 0;
                    if (count <= 1) {
                        targetList.push(member.id);
                    }
                }
            }

            // No inactive found
            if (targetList.length === 0) {
                return sock.sendMessage(from, {
                    text: "🎉 সব সদস্যই Active!\nকেউ Inactive পাওয়া যায়নি 🍋🔥"
                });
            }

            // Kick one by one
            for (const user of targetList) {
                await sock.groupParticipantsUpdate(from, [user], "remove");
                await new Promise(r => setTimeout(r, 800));
            }

            await sock.sendMessage(from, {
                text: `🍋🔥 *Kick Inactive Completed!*\nরিমুভ করা হয়েছে: *${targetList.length}* জনকে।`
            });

        } catch (err) {
            console.log("KICK INACTIVE ERROR :", err);
            await sock.sendMessage(msg.key.remoteJid, { text: "❌ KickInactive Error 😭" });
        }
    }
};
