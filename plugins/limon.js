module.exports = {

    // ================================
    // 1️⃣ Limon Info Command (Limon Panel)
    // ================================
    limoninfo: {
        name: "limon",
        alias: ["ownerlimon", "me"],
        desc: "Special Owner Command For Limon",
        category: "owner",

        start: async (sock, m, { isOwner }) => {
            if (!isOwner)
                return m.reply("❌ এই কমান্ড শুধু Limon (Owner) ব্যবহার করতে পারবে!");

            const emojiset = ["💚", "✨", "🔥", "🌟", "⚡", "💎", "👑", "🌿", "🍀", "🌀"];
            let ran = emojiset[Math.floor(Math.random() * emojiset.length)];

            let text = `
${ran} *L I M O N  –  O W N E R  P A N E L* ${ran}

👑 *Name:*  ʟɪᴍᴏɴ  
⚡ *Role:*  Official Bot Owner  
💎 *Power:* Unlimited Access  
🔥 *Status:* Active & Monitoring  
🌿 *Vibe:* Calm • Smart • Pro Coder  
✨ *Special:* বট এর সব চাবি শুধু তার হাতেই 🔐

${ran} *Limon is here — System Running Smoothly*
            `;

            m.reply(text);
        }
    },

    // ================================
    // 2️⃣ Limon Bio Command (Customized Bio)
    // ================================
    limonbio: {
        name: "limonbio",
        alias: ["bio", "aboutlimon"],
        desc: "Show your custom bio",
        category: "owner",

        start: async (sock, m, { isOwner }) => {
            if (!isOwner)
                return m.reply("❌ শুধুমাত্র Limon (Owner) এই কমান্ড ব্যবহার করতে পারবে!");

            let bioText = `
            *Limon - The Creator of All Commands*

            🔹 *Name:* Mohammad Limon
            🔹 *Religion:* Sheikh
            🔹 *Location:* Tangail, Dhaka
            🔹 *Age:* 15+
            🔹 *Work:* No Work
            🔹 *Relationship Status:* Single
            🔹 *Email:* mlslimon947@gmail.com
            🔹 *WhatsApp:* wa.me/+8801623442730
            🔹 *Telegram:* t.me/limon_bbz
            🔹 *Facebook Link:* https://www.facebook.com/www.xxxx.com169
            🔹 *TikTok:* limon_bbz
            `;

            m.reply(bioText);
        }
    },

    // ================================
    // 3️⃣ Limon Menu Command (Full Menu with Limon Commands)
    // ================================
    limonmenu: {
        name: "limonmenu",
        alias: ["menu", "limonpanel"],
        desc: "Show the full menu with all the Limon commands.",
        category: "owner",

        start: async (sock, m, { isOwner }) => {
            if (!isOwner)
                return m.reply("❌ আপনি এই কমান্ড শুধু Limon ব্যবহার করতে পারবেন!");

            let menuText = `
            🌟 *Limon Command Menu*
            
            1️⃣ *Limon Info Command* — Get your special owner panel.
            2️⃣ *Limon Bio Command* — View your custom bio.
            3️⃣ *Limon Prefix Command* — Change your bot prefix.
            4️⃣ *Limon Settings Command* — Customize bot's features and settings.
            
            🔥 *Special Command For Owner* — Everything is under your control!

            💎 *Powered by Limon - The Creator*  
            `;

            m.reply(menuText);
        }
    },

    // ================================
    // 4️⃣ Limon Prefix Command (Prefix Changer)
    // ================================
    setprefix: {
        name: "prefix",
        alias: ["setprefix", "changeprefix"],
        desc: "Change your bot's prefix.",
        category: "owner",

        start: async (sock, m, { args, isOwner }) => {
            if (!isOwner)
                return m.reply("❌ আপনি Limon (Owner) ছাড়া Prefix পরিবর্তন করতে পারবেন না!");

            if (!args[0])
                return m.reply("⚠️ Prefix পরিবর্তন করতে একটি নতুন Prefix দিন!");

            let newPrefix = args[0].trim();
            fs.writeFileSync("./prefix.json", JSON.stringify({ prefix: newPrefix }, null, 2));

            m.reply(`✅ Prefix সফলভাবে পরিবর্তন করা হয়েছে!\n🔹 নতুন Prefix: *${newPrefix}*`);
        }
    },

    // ================================
    // 5️⃣ Limon Settings Command (Manage Settings)
    // ================================
    limonsettings: {
        name: "limonsettings",
        alias: ["settings", "botsettings"],
        desc: "Manage bot settings",
        category: "owner",

        start: async (sock, m, { isOwner }) => {
            if (!isOwner)
                return m.reply("❌ আপনি Limon ছাড়া Settings পরিবর্তন করতে পারবেন না!");

            let settingsText = `
            🔧 *Limon Bot Settings*

            1️⃣ *Prefix:* Change the bot's command prefix.
            2️⃣ *PrefixInfo:* View the current bot prefix.
            3️⃣ *LimonBio:* Set your custom bio and info.

            💎 *All settings controlled by Limon, The Creator*  
            `;

            m.reply(settingsText);
        }
    },

};