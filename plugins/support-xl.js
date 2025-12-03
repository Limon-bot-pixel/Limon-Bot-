module.exports = {
  name: "supportxl",
  alias: ["supxl", "support-xl", "help-xl"],
  desc: "Ultra Premium Support Menu by Limon",
  category: "general",

  async run({ sock, m }) {

    const msg = `
╭━━━━━━━〔 🌐 *LIMON BOT SUPPORT XL* 〕━━━━━━━╮

👑 *Bot Name:* 𝐋𝐢𝐦𝐨𝐧 𝐁𝐨𝐭  
👨‍💻 *Developer:* 𝐋𝐢𝐦𝐨𝐧 𝐁𝐛𝐳  
📱 *Owner:* wa.me/8801623442730  

━━━━━━━━━━━━━━━━━━━━

📌 *Support XL Features:*  
✔ Premium Buttons  
✔ Auto Fast Links  
✔ Developer Contact  
✔ Official Group  
✔ Full UI Version  
✔ Repo + Updates  
✔ Powered by Limon Signature  

━━━━━━━━━━━━━━━━━━━━

⚡ *Powered By:*  
𝐋𝐢𝐦𝐨𝐧ايڪـͬــͤــᷜــͨــͣــͪـي_么

╰━━━━━━━━━━━━━━━━━━━━╯
`;

    const buttons = [
      {
        name: "cta_url",
        buttonParamsJson: JSON.stringify({
          display_text: "📞 Owner Contact",
          url: "https://wa.me/8801623442730"
        })
      },
      {
        name: "cta_url",
        buttonParamsJson: JSON.stringify({
          display_text: "💬 Join Support Group",
          url: "https://chat.whatsapp.com/DhgsgbJNOthLrt9ONxVFkR?mode=hqrt2"
        })
      },
      {
        name: "cta_url",
        buttonParamsJson: JSON.stringify({
          display_text: "📁 GitHub Repo",
          url: "https://github.com/Limon-bot-pixel"
        })
      },
      {
        name: "cta_url",
        buttonParamsJson: JSON.stringify({
          display_text: "⚡ Bot Update Channel",
          url: "https://chat.whatsapp.com/"
        })
      },
      {
        name: "cta_url",
        buttonParamsJson: JSON.stringify({
          display_text: "💠 Donate / Support Dev",
          url: "https://wa.me/8801623442730"
        })
      },
      {
        name: "quick_reply",
        buttonParamsJson: JSON.stringify({
          display_text: "🤖 Bot Information",
          id: "botinfo"
        })
      }
    ];

    // Premium XL Banner  
    const banner = "https://i.imgur.com/By4biJI.jpeg"; 
    // চাইলে আপনার লোগো বসিয়ে দেবো

    await sock.sendMessage(
      m.chat,
      {
        image: { url: banner },
        caption: msg,
        footer: "Limon Bot • Support XL Edition",
        buttons
      },
      { quoted: m }
    );
  }
};