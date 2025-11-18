const fs = require("fs");

module.exports = {
    name: "antilink",
    aliases: ["al", "anti-link"],
    desc: "Enable or Disable AntiLink System",
    category: "group",
    usage: "antilink on / off",
    react: "🛡️",

    start: async (ctx, { m, sock, args, isAdmin, isBotAdmin }) => {

        if (!m.isGroup) return m.reply("❌ এই কমান্ড শুধু গ্রুপে চালানো যাবে!");
        if (!isAdmin) return m.reply("❌ আপনি অ্যাডমিন নন!");
        if (!isBotAdmin) return m.reply("❌ আমাকে আগে বট অ্যাডমিন বানান!");

        let data = JSON.parse(fs.readFileSync("./antilink.json"));

        if (!data[m.chat]) {
            data[m.chat] = {
                enabled: false,
                warns: {}
            };
        }

        if (args[0] === "on") {
            data[m.chat].enabled = true;
            fs.writeFileSync("./antilink.json", JSON.stringify(data, null, 2));
            return m.reply("🛡️ *AntiLink চালু করা হলো!*");
        }

        if (args[0] === "off") {
            data[m.chat].enabled = false;
            fs.writeFileSync("./antilink.json", JSON.stringify(data, null, 2));
            return m.reply("🛑 *AntiLink বন্ধ করা হলো!*");
        }

        return m.reply("⚙️ ব্যবহার:\n\n`antilink on`\n`antilink off`");
    }
};
