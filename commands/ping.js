// ping.js
// Limon Bot - Ping Command

module.exports = async (sock, m) => {
    try {
        const start = Date.now();

        const msg = await sock.sendMessage(m.key.remoteJid, { text: "🏓 Pinging..." });

        const end = Date.now();
        const pingSpeed = end - start;

        await sock.sendMessage(
            m.key.remoteJid,
            { text: `✅ *Pong!* \n⚡ Speed: *${pingSpeed}ms*` },
            { quoted: msg }
        );

    } catch (error) {
        console.log("Ping Command Error:", error);
    }
};
