const {
    default: LimonConnect,
    useMultiFileAuthState,
    makeWASocket,
    DisconnectReason
} = require("@whiskeysockets/baileys");

const fs = require("fs");

async function startLimonBot() {

    const { state, saveCreds } = await useMultiFileAuthState("./session");

    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: false,
        browser: ["Limon Bot", "Safari", "1.0.0"]
    });

    // Pair Code System
    if (!sock.authState.creds?.registered) {
        console.log("🟢 Generating Pair Code for Limon Bot...");

        const code = await sock.requestPairingCode("8801623442730");
        console.log("\n💛 Your Pair Code:");
        console.log(code);
        return;
    }

    // Load Message Handler
    require("./message-handler")(sock);

    sock.ev.on("creds.update", saveCreds);

    sock.ev.on("connection.update", (update) => {
        const { connection } = update;
        if (connection === "close") {
            console.log("❌ Connection closed. Restarting...");
            startLimonBot();
        }
        else if (connection === "open") {
            console.log("🚀 Limon Bot Connected!");
        }
    });
}

startLimonBot();
