// baileys.js // Limon Bot - Baileys Connection File

const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require("@whiskeysockets/baileys");

const fs = require("fs"); const path = require("path");

async function connectLimonBot() { const { state, saveCreds } = await useMultiFileAuthState('./session');

const sock = makeWASocket({
    auth: state,
    printQRInTerminal: true,
    browser: ["Limon Bot", "Chrome", "1.0"],
    markOnlineOnConnect: true
});

sock.ev.on('creds.update', saveCreds);

sock.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect } = update;

    if (connection === 'close') {
        if (lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut) {
            console.log("Reconnecting...");
            connectLimonBot();
        } else {
            console.log("You are logged out. Delete session folder and scan again.");
        }
    }
    else if (connection === 'open') {
        console.log("📡 Limon Bot Connected Successfully!");
    }
});

sock.ev.on('messages.upsert', async (msg) => {
    try {
        const m = msg.messages[0];
        if (!m.message) return;

        const textMsg = m.message.conversation || m.message.extendedTextMessage?.text;
        if (!textMsg) return;

        const prefix = ".";

        if (!textMsg.startsWith(prefix)) return;
        const cmd = textMsg.slice(1).trim().split(/ +/).shift().toLowerCase();

        switch (cmd) {
            case 'ping':
                require('./commands/ping')(sock, m);
                break;
            case 'help':
                require('./commands/help')(sock, m);
                break;
            case 'menu':
                require('./commands/menu')(sock, m);
                break;
            case 'id':
                require('./commands/id')(sock, m);
                break;
            case 'owner':
                require('./commands/owner')(sock, m);
                break;
        }
    } catch (err) {
        console.log("Message Error:", err);
    }
});

}

connectLimonBot();

module.exports = connectLimonBot;
