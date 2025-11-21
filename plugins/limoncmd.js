module.exports = {
    name: "limoncmd",
    alias: ["cmd", "commands", "allcmd"],
    desc: "Show all commands in AI styled Limon format",

    run: async (sock, msg) => {
        try {
            const from = msg.key.remoteJid;

            const text = `
🍋✨ *LIMON BOT — PREMIUM COMMAND PANEL*
AI Powered • Stylish • Fast • Secure  

━━━━━━━━━━━━━━━━━━
💛 *➤ Basic Commands*
• alive
• ping
• help
• menu
• ai
• info
• owner
• id
━━━━━━━━━━━━━━━━━━

🛡 *➤ Group Security*
• antilink
• antibot
• antifake
• antijoin
• antiword
• antispm
━━━━━━━━━━━━━━━━━━

👑 *➤ Admin Controls*
• open
• close
• add
• kick
• promote
• demote
• setpp
• setname
• setdesc
• groupinfo
━━━━━━━━━━━━━━━━━━

🎉 *➤ Fun Commands*
• hug
• kiss
• love
• aigf
• aibf
• ailove @tag
• slap
• cute
━━━━━━━━━━━━━━━━━━

🎵 *➤ Media Commands*
• song
• video
• sticker
• photo
• play
━━━━━━━━━━━━━━━━━━

📥 *➤ Downloader*
• ytmp3
• ytmp4
• fb
• insta
• tiktok
━━━━━━━━━━━━━━━━━━

🍋💛 *Special Limon Commands*
• limoncmd
• limonstyle
• limonlogo
• limonpanel
• limonlove
━━━━━━━━━━━━━━━━━━

✨ *Powered by Limon Bbz — AI Smart Bot*
`;

            await sock.sendMessage(from, { text });

        } catch (err) {
            console.log("LIMONCMD ERROR:", err);
            await sock.sendMessage(msg.key.remoteJid, { text: "❌ Limon Command Panel Error 😭" });
        }
    }
};
