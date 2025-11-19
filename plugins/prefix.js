const fs = require("fs");
const prefixPath = "./prefix.json";

// Default prefix.json generate if not exist
if (!fs.existsSync(prefixPath)) {
    fs.writeFileSync(prefixPath, JSON.stringify({ prefix: "." }, null, 2));
}

// Load prefix
const getPrefix = () => {
    return JSON.parse(fs.readFileSync(prefixPath)).prefix;
};

// Save prefix
const setPrefix = (newPrefix) => {
    fs.writeFileSync(prefixPath, JSON.stringify({ prefix: newPrefix }, null, 2));
};

module.exports = {
    
    // =============================
    // 1️⃣ Main Prefix Handler
    // =============================
    Handler: async function (sock, m) {
        try {
            let prefix = getPrefix();

            let body =
                m.message?.conversation ||
                m.message?.extendedTextMessage?.text ||
                m.message?.imageMessage?.caption ||
                m.message?.videoMessage?.caption ||
                "";

            let isCmd = body.startsWith(prefix);
            if (!isCmd) return false;

            let command = body.slice(prefix.length).trim().split(/ +/)[0].toLowerCase();
            let args = body.trim().split(/ +/).slice(1);

            return {
                prefix,
                command,
                args,
                isCmd
            };

        } catch (err) {
            console.log("Prefix Handler Error:", err);
        }
    },

    // =============================
    // 2️⃣ .prefix (change prefix)
    // =============================
    SetPrefixCmd: {
        name: "prefix",
        alias: ["setprefix","changeprefix"],
        desc: "Change bot prefix",

        start: async (sock, m, { args, isOwner }) => {
            if (!isOwner) return m.reply("❌ আপনি Owner নন!");

            if (!args[0])
                return m.reply("⚠️ একটি নতুন Prefix দিন!\nউদাহরণ: .prefix !");

            let newPrefix = args[0].trim();
            setPrefix(newPrefix);

            m.reply(`✅ Prefix সফলভাবে পরিবর্তন হয়েছে!\n🔹 নতুন Prefix: *${newPrefix}*`);
        }
    },

    // =============================
    // 3️⃣ .prefixinfo (check prefix)
    // =============================
    PrefixInfoCmd: {
        name: "prefixinfo",
        alias: ["pf","currentprefix"],
        desc: "Show current bot prefix",

        start: async (sock, m) => {
            m.reply(`🔹 *Current Prefix:* ${getPrefix()}`);
        }
    }

};