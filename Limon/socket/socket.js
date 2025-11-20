const {
    default: makeWASocket,
    DisconnectReason,
    useMultiFileAuthState,
    fetchLatestBaileysVersion
} = require("@whiskeysockets/baileys");

const pino = require("pino");

async function connectSocket() {
    const { state, saveCreds } = await useMultiFileAuthState("./session");
    const { version } = await fetchLatestBaileysVersion();

    const sock = makeWASocket({
        version,
        logger: pino({ level: "silent" }),
        printQRInTerminal: true,
        browser: ["Limon Bot", "Chrome", "1.0.0"],
        auth: state
    });

    // Connection Update
    sock.ev.on("connection.update", (update) => {
        const { connection, lastDisconnect, qr } = update;

        if (qr) {
            console.log("📌 Pair Code QR Ready! Scan করুন ভাই 😎");
        }

        if (connection === "close") {
            const reason = new DisconnectReason(lastDisconnect?.error);
            console.log("Connection Closed ❌", reason);

            if (reason === DisconnectReason.restartRequired) {
                console.log("Restarting Socket...");
                connectSocket();
            } else {
                console.log("Reconnecting...");
                connectSocket();
            }
        }

        if (connection === "open") {
            console.log("✅ WhatsApp Connected Successfully!");
        }
    });

    // Save Session
    sock.ev.on("creds.update", saveCreds);

    // Messages Handler
    sock.ev.on("messages.upsert", async (msg) => {
        require("./message-handler")(sock, msg);
    });

    return sock;
}

module.exports = connectSocket;
