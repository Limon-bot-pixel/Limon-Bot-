// utils.js - Limon Bot Utilities // Version 5 | Author: Limon Bbz

const fs = require("fs");

module.exports = {

// Read JSON readJSON: function (path) { try { return JSON.parse(fs.readFileSync(path)); } catch (err) { return {}; } },

// Write JSON writeJSON: function (path, data) { try { fs.writeFileSync(path, JSON.stringify(data, null, 2)); } catch (err) { console.log("JSON Save Error:", err); } },

// Format Time getTime: function () { const date = new Date(); return date.toLocaleString(); },

// Runtime Convert runtime: function (seconds) { const d = Math.floor(seconds / (3600 * 24)); const h = Math.floor((seconds % (3600 * 24)) / 3600); const m = Math.floor((seconds % 3600) / 60); const s = Math.floor(seconds % 60); return ${d}d ${h}h ${m}m ${s}s; },

// Random Text randomText: function (list) { return list[Math.floor(Math.random() * list.length)]; }

};
