module.exports = {
    name: "autotype",
    alias: ["autotyping", "typingmode", "atype"],
    desc: "Enable or disable auto typing in chat",

    run: async (sock, msg, args) => {
        try {
            const from = msg.key.remoteJid;
            const input = args.trim().toLowerCase();

            global.autoType = global.autoType || {};

            if (!["on", "off"].includes(input)) {
                return sock.sendMessage(from, {
                    text: "📌 Example:\n.autotype on\n.autotype off\n\n🍋 Limon Tip: On করলে বট প্রত্যেক মেসেজের আগে ‘typing…’ দেখাবে।"
                });
            }

            global.autoType[from] = (input === "on");

            await sock.sendMessage(from, {
                text: input === "on"
                    ? "⌨️✨ *Auto Typing ON!*\n🍋 এখন থেকে Limon Bot রিপ্লাই দেওয়ার আগে typing দেখাবে!"
                    : "🚫 *Auto Typing OFF করা হয়েছে।*"
            });

        } catch (err) {
            console.log("AUTOTYPE ERROR:", err);
        }
    }
};


// 🟡 AUTO TYPING SYSTEM
module.exports.messageHandler = async (sock, msg) => {
    try {
        const from = msg.key.remoteJid;

        if (!global.autoType[from]) return; // Auto typing OFF

        // Show typing…
        await sock.sendPresenceUpdate("composing", from);

        // Delay for realism
        await new Promise(resolve => setTimeout(resolve, 1200));

    } catch (err) {
        console.log("AUTO TYPE EVENT ERROR:", err);
    }
};
