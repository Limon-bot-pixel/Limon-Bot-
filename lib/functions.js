// functions.js
// Limon Bot — Version 5
// Author: Limon Bbz

const fs = require("fs");
const moment = require("moment-timezone");
moment.tz.setDefault("Asia/Dhaka");

// =========================
// 🔹 Time Function
// =========================
function getTime(type = "time") {
    if (type === "time") return moment().format("HH:mm:ss");
    if (type === "date") return moment().format("DD/MM/YYYY");
    return moment().format("DD/MM/YYYY HH:mm:ss");
}

// =========================
// 🔹 Random Text
// =========================
function randomText(list) {
    return list[Math.floor(Math.random() * list.length)];
}

// =========================
// 🔹 Check Admin
// =========================
function isAdmin(sender, groupAdmins) {
    return groupAdmins.includes(sender);
}

// =========================
// 🔹 Read JSON
// =========================
function readJSON(path) {
    try {
        return JSON.parse(fs.readFileSync(path));
    } catch {
        return {};
    }
}

// =========================
// 🔹 Write JSON
// =========================
function writeJSON(path, data) {
    try {
        fs.writeFileSync(path, JSON.stringify(data, null, 2));
    } catch (e) {
        console.log("Error writing JSON:", e);
    }
}

// =========================
// 🔹 Runtime
// =========================
function runtime(seconds) {
    const pad = (s) => (s < 10 ? "0" : "") + s;
    const hrs = pad(Math.floor(seconds / 3600));
    const mins = pad(Math.floor((seconds % 3600) / 60));
    const secs = pad(Math.floor(seconds % 60));
    return `${hrs}:${mins}:${secs}`;
}

// =========================
// 🔹 Message Reply Format
// =========================
function botReply(prefix = ".", cmd = "", text = "") {
    return `╭───❰ *LIMON BOT* ❱───◆
│ *Prefix:* ${prefix}
│ *Command:* ${cmd}
╰────────────────◆

${text}`;
}

// =========================
// Export Modules
// =========================
module.exports = {
    getTime,
    randomText,
    isAdmin,
    readJSON,
    writeJSON,
    runtime,
    botReply
};
