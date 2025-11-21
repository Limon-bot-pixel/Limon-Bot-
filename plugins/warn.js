const fs = require("fs");

const warnDB = "./database/warn.json";
if (!fs.existsSync("./database")) fs.mkdirSync("./database");
if (!fs.existsSync(warnDB)) fs.writeFileSync(warnDB, JSON.stringify({}));

module.exports = {
    name: "warn",
    alias: ["warning", "givewarn"],
    desc: "Warn a user (3 warns = auto kick)",

    run: async (sock, msg) => {
        try {
            const from = msg.key.remoteJid;

            // Only group
            if (!msg.key.participant)
                return sock.sendMessage(from, { text: "❗ This command works only in groups!" });

            // Admin Check
            const metadata = await sock.groupMetadata(from);
            const admins = metadata.participants.filter(p => p.admin);
            const isAdmin = admins.some(a => a.id === msg.key.participant);

            if (!isAdmin)
                return sock.sendMessage(from, { text: "❗ Only admins can warn others!" });

            // Tag required
            const ctx = msg.message?.extendedTextMessage?.contextInfo;
            let user = ctx?.mentionedJid ? ctx.mentionedJid[0] : null;

            if (!user)
                return sock.sendMessage(from, { text: "📌 Example:\n.warn @user" });

            let db = JSON.parse(fs.readFileSync(warnDB));
            if (!db[from]) db[from] = {};

            // Add warn
            if (!db[from][user]) db[from][user] = 0;
            db[from][user]++;

            const warns = db[from][user];
            fs.writeFileSync(warnDB, JSON.stringify(db, null, 2));

            // Warn Message (Limon Style)
            await sock.sendMessage(from, {
                text: `⚠️ *Warning Issued!*\n👉 @${user.split("@")[0]}\n\n📌 *Total Warn:* ${warns}/3\n\n🍋 *From:* Limon Bbz`,
                mentions: [user]
            });

            // Auto Kick at 3 warns
            if (warns >= 3) {
                await sock.sendMessage(from, {
                    text: `🚫 *Auto Kick Triggered!*\n@${user.split("@")[0]} reached 3 warnings.\n\n🍋 Protected by *Limon Bot* 💛`,
                    mentions: [user]
                });

                await sock.groupParticipantsUpdate(from, [user], "remove");

                // Reset warn
                db[from][user] = 0;
                fs.writeFileSync(warnDB, JSON.stringify(db, null, 2));
            }

        } catch (err) {
            console.log("WARN ERROR:", err);
            await sock.sendMessage(msg.key.remoteJid, { text: "❌ Warn System Error 😭" });
        }
    }
};
