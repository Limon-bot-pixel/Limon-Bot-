const fs = require("fs");
const dbPath = "./database/antijoin.json";

// Create DB if not exist
if (!fs.existsSync("./database")) fs.mkdirSync("./database");
if (!fs.existsSync(dbPath)) fs.writeFileSync(dbPath, JSON.stringify({}));

module.exports = {
    name: "antijoin",
    alias: ["ajoin", "autokickjoin"],
    desc: "Kick every new member who joins the group",

    run: async (sock, msg, args) => {
        const from = msg.key.remoteJid;

        // Only group
        if (!msg.key.participant)
            return sock.sendMessage(from, { text: "❗ This command works only in groups!" });

        // Admin check
        const metadata = await sock.groupMetadata(from);
        const admins = metadata.participants.filter(p => p.admin);
        const isAdmin = admins.some(p => p.id === msg.key.participant);

        if (!isAdmin)
            return sock.sendMessage(from, { text: "❗ Only admins can enable AntiJoin!" });

        const status = args.trim().toLowerCase();

        if (!["on", "off"].includes(status))
            return sock.sendMessage(from, { text: "📌 Example: *.antijoin on* or *.antijoin off*" });

        let db = JSON.parse(fs.readFileSync(dbPath));
        db[from] = status === "on";
        fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));

        await sock.sendMessage(from, {
            text: status === "on"
                ? "🛡 *AntiJoin Enabled!* New members will be kicked automatically."
                : "⚠ AntiJoin Disabled."
        });
    }
};

// Auto Kick New Members
module.exports.participantUpdate = async (sock, update) => {
    try {
        const db = JSON.parse(fs.readFileSync("./database/antijoin.json"));

        const group = update.id;
        const action = update.action;

        if (!db[group]) return; // AntiJoin disabled

        // On add
        if (action === "add") {
            const metadata = await sock.groupMetadata(group);
            const admins = metadata.participants.filter(p => p.admin);

            for (let user of update.participants) {
                // Skip Admins
                const isAdmin = admins.some(a => a.id === user);
                if (isAdmin) return;

                // Kick user
                await sock.groupParticipantsUpdate(group, [user], "remove");

                await sock.sendMessage(group, {
                    text: `🚫 *AntiJoin:* New member removed!\n@${user.split("@")[0]}`,
                    mentions: [user]
                });
            }
        }

    } catch (err) {
        console.log("ANTIJOIN ERROR:", err);
    }
};
