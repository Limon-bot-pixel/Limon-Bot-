// LimonSession.js
// CommonJS Session Handler for Limon Bot

const fs = require("fs");
const path = require("path");

const SESSION_FILE = path.join(__dirname, "session.json");

// --- Load Session ---
function loadSession() {
    try {
        if (fs.existsSync(SESSION_FILE)) {
            const data = fs.readFileSync(SESSION_FILE, "utf-8");
            return JSON.parse(data);
        } else {
            return {};
        }
    } catch (error) {
        console.error("❌ Session Load Error:", error);
        return {};
    }
}

// --- Save Session ---
function saveSession(sessionData) {
    try {
        fs.writeFileSync(SESSION_FILE, JSON.stringify(sessionData, null, 2));
        console.log("✅ Session Saved Successfully!");
    } catch (error) {
        console.error("❌ Session Save Error:", error);
    }
}

// --- Clear Session ---
function clearSession() {
    try {
        if (fs.existsSync(SESSION_FILE)) {
            fs.unlinkSync(SESSION_FILE);
            console.log("🗑 Session Cleared!");
        }
    } catch (error) {
        console.error("❌ Could Not Clear Session:", error);
    }
}

module.exports = {
    loadSession,
    saveSession,
    clearSession
};
