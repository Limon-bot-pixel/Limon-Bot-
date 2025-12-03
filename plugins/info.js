//==================== LIMON BOT XL INFO ====================//

const limonXLLogo = "https://i.postimg.cc/T1qc9P5V/20251125-081422.jpg";

module.exports = {
   name: "infoxl",
   alias: ["xlinfo", "botxl"],
   desc: "Limon Bot Full XL Information",
   react: "⚡",

   start: async (Limon, m, { pushName, prefix }) => {

      const xlText = `
┏━━━━━━━━━━━━━━━━━━━━━━┓
┃    ⚡ *LIMON BOT – XL EDITION* ⚡
┗━━━━━━━━━━━━━━━━━━━━━━┛

🔱 *Owner:* Limon Bbz  
📞 *Owner Number:* +8801623442730  

🤖 *Bot Name:* Limon Bot  
🚀 *Edition:* XL Premium  
💠 *Version:* 10.0.2 (XL Engine)  
📡 *Mode:* Multi-Device / Auto-Stable  
🛡 *Security:* Anti-Crash + Anti-Spam  
⚙ *AI Power:* Limon Smart Engine v3.0  

━━━━━━━━━━━━━━━━━━━━━━━
🧩 *Bot Features (XL)*  
✓ Smart Welcome + Leave  
✓ Hack Menu + Support Menu  
✓ Auto Sticker + Auto Reply  
✓ Message Tracker  
✓ Anti Toxic / Anti BadWords  
✓ Group Control System  
✓ High Speed ML Commands  
✓ HD Banner System  
✓ Owner Full Panel  
━━━━━━━━━━━━━━━━━━━━━━━

🧑‍💻 *User:* ${pushName}  
💬 *Prefix:* ${prefix}

📌 *Powered By:*  
Limon ايڪـͬــͤــᷜــͨــͣــͪـي_么 — The Ultimate Commander ⚡

━━━━━━━━━━━━━━━━━━━━━━━
🔥 *Thanks For Using Limon Bot XL Edition!*  
━━━━━━━━━━━━━━━━━━━━━━━
      `;

      try {
         await Limon.sendMessage(
            m.from,
            {
               image: { url: limonXLLogo },
               caption: xlText
            },
            { quoted: m }
         );
      } catch (e) {
         console.log(e);
      }
   }
};