// help.js // Limon Bot - Help Command

module.exports = async (sock, m) => { try { const helpText = `💫 Limon Bot Help Menu

📌 Available Commands:

• ping - Check bot speed • id - Show your WhatsApp ID • help - Show this help menu

🤖 Bot Name: Limon Bot 👑 Owner: +8801623442730

✨ আরও কমান্ড শীঘ্রই যোগ করা হবে!`;

await sock.sendMessage(m.key.remoteJid, { text: helpText }, { quoted: m });

} catch (error) {
    console.log("Help Command Error:", error);
}

};
