// owner.js // Limon Bot - Owner Command

module.exports = async (sock, m) => { try { const ownerText = `👑 Limon Bot Owner Information

• 🧑 Owner Name: Limon Bbz • 📞 WhatsApp: +8801623442730 • 🤖 Bot Name: Limon Bot • 🌐 GitHub: https://github.com/Limon-bot-pixel

✨ যদি বট নিয়ে কোনো সমস্যা হয়, Owner এর সাথে যোগাযোগ করুন।`;

await sock.sendMessage(m.key.remoteJid, { text: ownerText }, { quoted: m });

} catch (error) {
    console.log("Owner Command Error:", error);
}

};
