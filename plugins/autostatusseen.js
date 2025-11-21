module.exports = {
    name: "autostatusseen",
    alias: ["ass", "statusseen"],
    desc: "Automatically view any WhatsApp status",

    run: async (sock, msg, args) => {
        try {
            const from = msg.key.remoteJid;
            const text = args.trim().toLowerCase();

            global.autoStatusSeen = global.autoStatusSeen || {};

            if (!["on", "off"].includes(text)) {
                return sock.sendMessage(from, {
                    text: "📌 Example:\n.autostatusseen on\n.autostatusseen off\n\n🍋 Limon Tip: On করলে সব স্ট্যাটাস অটো Seen হয়ে যাবে।"
                });
            }

            global.autoStatusSeen[from] = text === "on";

            await sock.sendMessage(from, {
                text: text === "on"
                    ? "👀✨ *Auto Status Seen On!*\n🍋 এখন থেকে সব স্ট্যাটাস Limon Bot অটো দেখে নেবে!"
                    : "🚫 Auto Status Seen Off করা হলো।"
            });

        } catch (err) {
            console.log("AUTO STATUS SEEN ERROR:", err);
        }
    }
};


// ✔️ AUTO VIEW STATUS SYSTEM  
module.exports.statusUpdate = async (sock, update) => {
    try {
        const jid = update.jid;

        if (!global.autoStatusSeen[jid]) return;

        // Check if it's a status
        if (!update.message) return;

        // Auto seen
        await sock.readMessages([{
            remoteJid: jid,
            id: update.key.id,
            participant: update.key.participant
        }]);

        await sock.sendMessage(jid, {
            text: `👀✨ *Limon Bot Auto Seen!*`
        });

    } catch (e) {
        console.log("STATUS SEEN ERROR:", e);
    }
};
