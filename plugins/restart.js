module.exports = {
    name: "restart",
    alias: ["reboot", "rt"],
    desc: "Restart the bot system",
    category: "owner",

    start: async (sock, m, { isOwner }) => {
        if (!isOwner)
            return m.reply("❌ এই কমান্ড শুধুমাত্র Limon (Owner) ব্যবহার করতে পারবে!");

        m.reply("♻️ *Restarting System... Please wait!*");

        setTimeout(() => {
            process.exit();  // Bot restart
        }, 1500);
    }
};