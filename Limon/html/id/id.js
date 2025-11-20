// idCommand.js // Limon Bot - ID Command

const idCommand = async (sock, m) => { try { const sender = m.key.participant || m.key.remoteJid; const userName = m.pushName || "Unknown";

const replyText = `👤 *Your ID Information*

• 🌐 JID: ${sender} • 🧑 Name: ${userName} • 🤖 Bot: Limon Bot • 📞 Owner: +8801623442730`;

await sock.sendMessage(m.key.remoteJid, { text: replyText }, { quoted: m });

} catch (e) {
    console.log("ID Command Error:", e);
}

};

module.exports = idCommand;
