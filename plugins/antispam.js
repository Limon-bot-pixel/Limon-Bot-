//==============================//
//       Limon Bot AntiSpam     //
//==============================//

const fs = require("fs");
const dbFile = "./antispam.json";

// Create database if missing
if (!fs.existsSync(dbFile)) {
    fs.writeFileSync(dbFile, JSON.stringify({}));
}

// Load database
let db = JSON.parse(fs.readFileSync(dbFile));

let spamCounter = {}; // Temp spam memory (auto resets)

//==============================//
//         COMMAND PART         //
//==============================//

module.exports = {
    name: "antispam",
    aliases: ["aspam"],
    desc: "Enable/Disable AntiSpam System",
    category: "group",
    usage: "antispam on/off",
    react: "⛔",

    start: async (ctx, { m, sock, args, isAdmin, isBotAdmin }) => {

        if (!m.isGroup) return m.reply("❌ *এই কমান্ড শুধু গ্রুপে ব্যবহার করা যাবে!*");
        if (!isAdmin) return m.reply("❌ *আপনি অ্যাডমিন নন!*");
        if (!isBotAdmin) return m.reply("❌ *আমাকে আগে গ্রুপ অ্যাডমিন বানান!*");

        if (!db[m.chat]) {
            db[m.chat] = {
                enabled: false,
                users: {}
            };
        }

        if (args[0] === "on") {
            db[m.chat].enabled = true;
            fs.writeFileSync(dbFile, JSON.stringify(db, null, 2));
            return m.reply("🚫 *AntiSpam চালু করা হয়েছে!*");
        }

        if (args[0] === "off") {
            db[m.chat].enabled = false;
            fs.writeFileSync(dbFile, JSON.stringify(db, null, 2));
            return m.reply("✅ *AntiSpam বন্ধ করা হয়েছে!*");
        }

        return m.reply(
            "⚙️ ব্যবহার:\n" +
            "`antispam on`\n" +
            "`antispam off`"
        );
    }
};

//==============================//
//     AUTO SPAM DETECTION      //
//==============================//

module.exports.handleMessage = async (sock, m, adminCheck) => {
    try {
        let chat = m.chat;
        let sender = m.sender;
        let isAdmin = adminCheck.isAdmin;

        if (!m.isGroup) return;
        if (!db[chat]?.enabled) return; // AntiSpam off

        if (!spamCounter[sender]) {
            spamCounter[sender] = { count: 0, time: Date.now() };
        }

        spamCounter[sender].count++;

        // যদি ৭ সেকেন্ডে ৫ বার মেসেজ পাঠায় = স্প্যাম detected
        if (Date.now() - spamCounter[sender].time < 7000) {

            if (spamCounter[sender].count >= 5) {

                if (!isAdmin) {

                    if (!db[chat].users[sender]) db[chat].users[sender] = 0;

                    db[chat].users[sender]++;
                    fs.writeFileSync(dbFile, JSON.stringify(db, null, 2));

                    let warn = db[chat].users[sender];

                    if (warn < 4) {
                        await sock.sendMessage(chat, {
                            text: `⚠️ *AntiSpam Warning ${warn}/4*\nঅনেক দ্রুত মেসেজ পাঠাচ্ছেন!\nআরো ${4 - warn} বার করলে গ্রুপ থেকে বের করে দেওয়া হবে।`
                        });
                    }

                    if (warn >= 4) {
                        await sock.sendMessage(chat, {
                            text: `🚫 *AntiSpam Triggered!*\n@${sender.split("@")[0]} কে স্প্যাম করার জন্য গ্রুপ থেকে রিমুভ করা হচ্ছে...`,
                            mentions: [sender]
                        });

                        await sock.groupParticipantsUpdate(chat, [sender], "remove");

                        db[chat].users[sender] = 0;
                        fs.writeFileSync(dbFile, JSON.stringify(db, null, 2));
                    }
                }
            }

        } else {
            // Reset counter
            spamCounter[sender] = { count: 1, time: Date.now() };
        }

    } catch (err) {
        console.log("AntiSpam Error:", err);
    }
};