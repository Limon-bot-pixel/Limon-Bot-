const fs = require("fs");
const dbPath = "./database/antiword.json";

// Create DB if not exist
if (!fs.existsSync("./database")) fs.mkdirSync("./database");
if (!fs.existsSync(dbPath)) fs.writeFileSync(dbPath, JSON.stringify({}));

module.exports = {
    name: "antiword",
    alias: ["badword", "blockword"],
    desc: "Block specific words in the group",

    run: async (sock, msg, args) => {
        const from = msg.key.remoteJid;

        // Only in groups
        if (!msg.key.participant)
            return sock.sendMessage(from, { text: "❗ This command works only in groups!" });

        // Check admin
        const metadata = await sock.groupMetadata(from);
        const admins = metadata.participants.filter(p => p.admin);
        const isAdmin = admins.some(p => p.id === msg.key.participant);

        if (!isAdmin)
            return sock.sendMessage(from, { text: "❗ Only admins can set antiword!" });

        let word = args.trim().toLowerCase();
        if (!word)
            return sock.sendMessage(from, { text: "📌 Example: *.antiword fuck* (blocks this word)" });

        let db = JSON.parse(fs.readFileSync(dbPath));

        // If no list for this group
        if (!db[from]) db[from] = [];

        db[from].push(word);
        fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));

        await sock.sendMessage(from, {
            text: `🚫 *AntiWord Enabled!*\n\nBlocked Word Added:\n🔹 ${word}\n\n⚠ User will be warned if used.`
        });
    }
};

// 🔥 Auto delete bad words
module.exports.message = async (sock, msg) => {
    try {
        const from = msg.key.remoteJid;
        if (!msg.message) return;

        let db = JSON.parse(fs.readFileSync(dbPath));
        if (!db[from]) return;

        const type = Object.keys(msg.message)[0];
        let text = "";

        if (type === "conversation") text = msg.message.conversation.toLowerCase();
        if (type === "extendedTextMessage") text = msg.message.extendedTextMessage.text.toLowerCase();

        for (let bad of db[from]) {
            if (text.includes(bad)) {
                // Delete the message
                await sock.sendMessage(from, {
                    delete: msg.key
                });

                // Warn the user
                await sock.sendMessage(from, {
                    text: `⚠ *Warning:* This word is not allowed: ${bad}`
                });
                break;
            }
        }

    } catch (err) {
        console.log("ANTIWORD ERROR:", err);
    }
};
