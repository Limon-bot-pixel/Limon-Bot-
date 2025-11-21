// info.js — Limon Bot Full Information Command

const os = require("os");
const moment = require("moment-timezone");

module.exports = {
    name: "info",
    alias: ["botinfo", "status"],
    category: "general",
    desc: "Show Bot Information",

    async run({ conn, m }) {
        try {

            let uptime = process.uptime();
            let hours = Math.floor(uptime / 3600);
            let minutes = Math.floor((uptime % 3600) / 60);
            let seconds = Math.floor(uptime % 60);

            const runtime = `${hours}h ${minutes}m ${seconds}s`;

            const infoText = `
🤖 *LIMON BOT Information*
========================

👑 *Owner:* Limon Bbz  
📞 *Owner Number:* 8801623442730  
🤖 *Bot Name:* Limon Bot  
🔧 *Prefix:* .
⚡ *Version:* 5.0
🟢 *Mode:* Public

⏳ *Uptime:* ${runtime}
📅 *Date:* ${moment().tz("Asia/Dhaka").format("DD MMMM YYYY")}
🕒 *Time:* ${moment().tz("Asia/Dhaka").format("hh:mm A")}

🧠 *System Info:*  
• Platform: ${os.platform()}  
• RAM: ${(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)} GB  
• Free RAM: ${(os.freemem() / 1024 / 1024 / 1024).toFixed(2)} GB  

🪄 *Thanks for using Limon Bot 💛*
`;

            await conn.sendMessage(m.chat, { text: infoText });

        } catch (e) {
            console.log("INFO ERROR:", e);
            m.reply("❌ Something went wrong!");
        }
    }
};
