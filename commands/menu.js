// menu.js // Limon Bot - Menu Command

module.exports = async (sock, m) => { try { const menuText = `📍 Limon Bot Main Menu

🤖 Bot Name: Limon Bot 👑 Owner: +8801623442730

━━━━━━━━━━━━━━ ✨ Basic Commands ━━━━━━━━━━━━━━ • ping - Check bot speed • id - Show your WhatsApp ID • help - Show help menu • menu - Show this menu

━━━━━━━━━━━━━━ ⚙️ System Commands ━━━━━━━━━━━━━━ • alive - Check bot status • owner - Show owner info • repo - Show bot repository

━━━━━━━━━━━━━━ 🔔 More features coming soon... ━━━━━━━━━━━━━━`;

await sock.sendMessage(m.key.remoteJid, { text: menuText }, { quoted: m });

} catch (error) {
    console.log("Menu Command Error:", error);
}

};
