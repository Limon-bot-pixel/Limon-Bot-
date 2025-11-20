//=====================//
//  Limon Bot v5
//  index.js
//=====================//

const {
    default: makeWASocket,
    DisconnectReason,
    useMultiFileAuthState
} = require("@whiskeysockets/baileys");
const pino = require("pino");

async function limonBotStart() {

    // SESSION SYSTEM
    const { state, saveCreds } = await useMultiFileAuthState('./session');  // Folder auto create

    const sock = makeWASocket({
        logger: pino({ level: "silent" }),
        printQRInTerminal: false,
        auth: state
    });

    // SAVE SESSION
    sock.ev.on('creds.update', saveCreds);

    // PAIR CODE SYSTEM
    if (!sock.authState.creds.registered) {
        console.log("🟢 WhatsApp Pair Code Generating...");
        let code = await sock.requestPairingCode("8801623442730");
        console.log("\n🔐 Your Limon Bot Pair Code:");
        console.log("👉 " + code + "\n");
        console.log("Go to WhatsApp → Linked Devices → Add Device → Enter Code");
    }

    // CONNECTION UPDATE
    sock.ev.on("connection.update", (update) => {
        const { connection, lastDisconnect } = update;

        if (connection === "open") {
            console.log("✅ Limon Bot Connected Successfully!");
        }

        if (connection === "close") {
            let reason = lastDisconnect?.error?.output?.statusCode;

            if (reason !== DisconnectReason.loggedOut) {
                console.log("⚠️ Reconnecting Limon Bot...");
                limonBotStart();
            } else {
                console.log("❌ Logged Out. Delete session folder and restart.");
            }
        }
    });

    // MESSAGE HANDLER IMPORT
    try {
        require("./message handler")(sock);
    } catch (e) {
        console.log("⚠️ Message Handler Error:", e);
    }
}

limonBotStart();
