module.exports = {
    name: "autorecord",
    alias: ["recordmode", "autorecording", "arecord"],
    desc: "Enable or disable auto recording indicator",

    run: async (sock, msg, args) => {
        try {
            const from = msg.key.remoteJid;
            const mode = args.trim().toLowerCase();

            global.autoRecord = global.autoRecord || {};

            if (!["on", "off"].includes(mode)) {
                return sock.sendMessage(from, {
                    text: "📌 Example:\n.autorecord on\n.autorecord off\n\n🍋 Limon Tip: On করলে বট মেসেজের আগে 'recording…' দেখাবে!"
                });
            }

            global.autoRecord[from] = mode === "on";

            await sock.sendMessage(from, {
                text: mode === "on"
                    ? "🎙✨ *Auto Recording ON!*\n🍋 এখন থেকে Limon Bot রিপ্লাই দেওয়ার আগে recording দেখাবে!"
                    : "🚫 Auto Recording OFF করা হলো!"
            });

        } catch (err) {
            console.log("AUTO RECORD CMD ERROR:", err);
        }
    }
};


// 🎤 AUTO RECORDING SYSTEM
module.exports.messageHandler = async (sock, msg) => {
    try {
        const from = msg.key.remoteJid;

        if (!global.autoRecord[from]) return;

        // Show recording…
        await sock.sendPresenceUpdate("recording", from);

        // Delay for realism
        await new Promise(resolve => setTimeout(resolve, 1500));

    } catch (err) {
        console.log("AUTO RECORD EVENT ERROR:", err);
    }
};
