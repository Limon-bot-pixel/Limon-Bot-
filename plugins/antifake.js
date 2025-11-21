const fs = require("fs");
const dbPath = "./database/antifake.json";

// Create database file if missing
if (!fs.existsSync("./database")) fs.mkdirSync("./database");
if (!fs.existsSync(dbPath)) fs.writeFileSync(dbPath, JSON.stringify({}));

module.exports = {
    name: "antifake",
    alias: ["nofake", "fakeblock"],
    desc: "Only allow specific country code in the group",

    run: async (sock, msg, args) => {
        try {
            const from = msg.key.remoteJid;

            // Only groups
            if (!msg.key.participant)
                return sock.sendMessage(from, { text: "❗ This command works only in groups!" });

            const metadata = await sock.groupMetadata(from);
            const admins = metadata.participants.filter(p => p.admin);
            const isAdmin = admins.some(a => a.id === msg.key.participant);

            if (!isAdmin)
                return sock.sendMessage(from, { text: "❗ Only admins can set AntiFake!" });

            const code = args.trim();
            if (!code)
                return sock.sendMessage(from, { text: "📌 Example: *.antifake 880*" });

            let db = JSON.parse(fs.readFileSync(dbPath));
            db[from] = code;
            fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));

            await sock.sendMessage(from, {
                text: `🛡 *AntiFake Enabled!*\nAllowed Country Code: +${code}\n\n📌 Other numbers will be auto removed.`
            });

        } catch (e) {
            console.log("ANTIFAKE ERROR:", e);
        }
    }
};

// Auto Kick Non-Allowed Country Numbers
module.exports.participantUpdate = async (sock, update) => {
    try {
        const fs = require("fs");
        const db = JSON.parse(fs.readFileSync("./database/antifake.json"));

        const group = update.id;
        const action = update.action;
        const participants = update.participants;

        if (!db[group]) return;

        const allowCode = db[group];

        // On member added
        if (action === "add") {
            for (let user of participants) {
                const number = user.split("@")[0];

                // If number doesn’t start with allowed code
                if (!number.startsWith(allowCode)) {
                    await sock.groupParticipantsUpdate(group, [user], "remove");

                    await sock.sendMessage(group, {
                        text: `🚫 *Removed Fake Number:* +${number}\n⚠ Allowed Code Only: +${allowCode}`
                    });
                }
            }
        }
    } catch (err) {
        console.log("ANTIFAKE KICK ERROR:", err);
    }
};
