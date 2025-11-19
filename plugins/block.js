// =====================================
//      LIMON BOT - MAIN HANDLER + BLOCK SYSTEM
// =====================================

// ---------- BLOCK SYSTEM DATA ----------
let blockedUsers = new Set();
let warnCount = new Map();

// ---------- COMMAND LIST ----------
const commands = {};

// -------- REGISTER COMMAND FUNCTION -------
function registerCommand(name, execute) {
    commands[name] = execute;
}

// =====================================
//        BLOCK SYSTEM COMMANDS
// =====================================

// BLOCK
registerCommand("block", async (sock, m, args) => {
    let user = m.quoted
        ? m.quoted.sender
        : args[0]
        ? args[0].replace(/[^0-9]/g, "") + "@s.whatsapp.net"
        : null;

    if (!user)
        return sock.sendMessage(m.chat, { text: "⚠️ Tag বা নম্বর দিন ব্লক করার জন্য!" });

    blockedUsers.add(user);

    sock.sendMessage(m.chat, {
        text: `🚫 *User Blocked:* @${user.split("@")[0]}`,
        mentions: [user]
    });
});

// UNBLOCK
registerCommand("unblock", async (sock, m, args) => {
    let user = m.quoted
        ? m.quoted.sender
        : args[0]
        ? args[0].replace(/[^0-9]/g, "") + "@s.whatsapp.net"
        : null;

    if (!user)
        return sock.sendMessage(m.chat, { text: "⚠️ Tag বা নম্বর দিন আনব্লক করার জন্য!" });

    blockedUsers.delete(user);

    sock.sendMessage(m.chat, {
        text: `✅ *User Unblocked:* @${user.split("@")[0]}`,
        mentions: [user]
    });
});

// WARN
registerCommand("warn", async (sock, m, args) => {
    let user = m.quoted
        ? m.quoted.sender
        : args[0]
        ? args[0].replace(/[^0-9]/g, "") + "@s.whatsapp.net"
        : null;

    if (!user)
        return sock.sendMessage(m.chat, { text: "⚠️ Tag করে Warn দিন!" });

    let count = warnCount.get(user) || 0;
    warnCount.set(user, count + 1);

    if (warnCount.get(user) >= 3) {
        blockedUsers.add(user);
        sock.sendMessage(m.chat, {
            text: `🚫 *User Blocked Automatically*  
কারণ: 3 বার Warn পেয়েছে!  
@${user.split("@")[0]}`,
            mentions: [user]
        });
    } else {
        sock.sendMessage(m.chat, {
            text: `⚠️ Warn দেওয়া হল!  
User: @${user.split("@")[0]}  
Total Warn: ${warnCount.get(user)} / 3`,
            mentions: [user]
        });
    }
});

// BLOCK LIST
registerCommand("blockedlist", async (sock, m) => {
    let text = "🚫 *Blocked Users:*\n\n";

    if (blockedUsers.size === 0) text += "কেউ ব্লক নেই।";

    blockedUsers.forEach(u => {
        text += `• @${u.split("@")[0]}\n`;
    });

    sock.sendMessage(m.chat, {
        text,
        mentions: [...blockedUsers]
    });
});


// =====================================
//        MAIN MESSAGE HANDLER
// =====================================

async function MainHandler(sock, m) {
    
    // -------- BLOCK CHECK --------
    if (blockedUsers.has(m.sender)) {
        return; // Blocked users cannot send commands
    }

    // -------- COMMAND PREFIX --------
    let prefix = ".";
    if (!m.body.startsWith(prefix)) return;

    let cmd = m.body.slice(1).split(" ")[0].toLowerCase();
    let args = m.body.split(" ").slice(1);

    // -------- COMMAND EXECUTION --------
    if (commands[cmd]) {
        try {
            await commands[cmd](sock, m, args);
        } catch (e) {
            console.log("Command Error", e);
            sock.sendMessage(m.chat, { text: "❌ Command Error Occurred!" });
        }
    }
}

// Export for use
module.exports = {
    MainHandler,
    commands
};