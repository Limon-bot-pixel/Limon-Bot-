// messageHandler.js
// Limon Bot — Version 5
// Author: Limon Bbz

const {
    botReply,
    getTime,
    readJSON,
    writeJSON,
    randomText,
    runtime
} = require("./functions");

const prefix = "."; 
const version = "5";

// JSON Files
const users = readJSON("./database/Users.json");
const settings = readJSON("./database/Setting.json");
const groupData = readJSON("./database/Group.json");

// MAIN MESSAGE HANDLER
module.exports = async (sock, msg) => {
    try {
        const from = msg.key.remoteJid;
        const isGroup = from.endsWith("@g.us");
        const sender = msg.key.participant || msg.key.remoteJid;
        
        const type = Object.keys(msg.message)[0];
        const body =
            type === "conversation"
                ? msg.message.conversation
                : type === "extendedTextMessage"
                ? msg.message.extendedTextMessage.text
                : "";

        if (!body) return;

        // PREFIX CHECK
        if (!body.startsWith(prefix)) return;
        const cmd = body.slice(prefix.length).trim().split(/ +/).shift().toLowerCase();
        const args = body.trim().split(/ +/).slice(1);

        console.log(`COMMAND → ${cmd} | FROM → ${sender}`);

        // =====================
        //  BASIC COMMANDS
        // =====================

        // 🔹PING
        if (cmd === "ping") {
            const pingText = botReply(prefix, cmd, `Pong! 🏓  
Response Time: ${getTime("time")}`);
            return sock.sendMessage(from, { text: pingText });
        }

        // 🔹HELP
        if (cmd === "help") {
            const helpText = botReply(prefix, cmd, `
*Available Commands:*
• .ping
• .help
• .menu
• .owner
• .id
• .runtime
• .version
`);
            return sock.sendMessage(from, { text: helpText });
        }

        // 🔹MENU
        if (cmd === "menu") {
            const menuText = botReply(prefix, cmd, `
*MAIN MENU*
• .ping
• .id
• .help
• .menu
• .owner
• .runtime
• .version

*GROUP MENU*
• .group
• .promote
• .demote

*OWNER MENU*
• .setprefix
• .broadcast
`);
            return sock.sendMessage(from, { text: menuText });
        }

        // 🔹OWNER
        if (cmd === "owner") {
            const textOwner = botReply(prefix, cmd, `
*Owner Name:* Limon Bbz  
*Owner Number:* wa.me/8801623442730  
`);
            return sock.sendMessage(from, { text: textOwner });
        }

        // 🔹ID
        if (cmd === "id") {
            const idText = botReply(prefix, cmd, `Your ID:  
*${sender}*`);
            return sock.sendMessage(from, { text: idText });
        }

        // 🔹RUNTIME
        if (cmd === "runtime") {
            const uptime = process.uptime();
            const runtimeText = botReply(prefix, cmd, `Bot Uptime:  
*${runtime(uptime)}*`);
            return sock.sendMessage(from, { text: runtimeText });
        }

        // 🔹VERSION
        if (cmd === "version") {
            const verText = botReply(prefix, cmd, `Limon Bot Version: *${version}*`);
            return sock.sendMessage(from, { text: verText });
        }

        // =====================
        //  OWNER COMMANDS
        // =====================
        const ownerNumber = "8801623442730@s.whatsapp.net";
        const isOwner = sender === ownerNumber;

        if (cmd === "setprefix") {
            if (!isOwner) return sock.sendMessage(from, { text: "Only Owner Allowed!" });

            if (!args[0]) return sock.sendMessage(from, { text: "Give new prefix!" });

            settings.prefix = args[0];
            writeJSON("./database/Setting.json", settings);

            return sock.sendMessage(from, { text: `Prefix Updated to: *${args[0]}*` });
        }

        if (cmd === "broadcast") {
            if (!isOwner) return sock.sendMessage(from, { text: "Only Owner Allowed!" });
            if (!args[0]) return sock.sendMessage(from, { text: "Write broadcast text!" });

            const allUsers = Object.keys(users);

            for (let u of allUsers) {
                await sock.sendMessage(u, { text: `📢 *Broadcast Message:*\n${args.join(" ")}` });
            }

            return sock.sendMessage(from, { text: "Broadcast sent!" });
        }

    } catch (e) {
        console.log("MESSAGE HANDLER ERROR:", e);
    }
};
