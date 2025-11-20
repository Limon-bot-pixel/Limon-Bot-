const { exec } = require("child_process");

module.exports = {
  name: "update",
  alias: ["ud", "up"],
  description: "Limon Bot Auto Update from GitHub",
  
  async run(m, sock) {
    const chatId = m.key.remoteJid;

    await sock.sendMessage(chatId, { text: "♻️ Checking for updates..." });

    exec("git fetch", (e) => {
      if (e) return sock.sendMessage(chatId, { text: "❌ Error fetching update!\n" + e });

      exec("git pull", async (err, stdout) => {
        if (err) {
          return sock.sendMessage(chatId, { text: "❌ Update Failed!\n" + err });
        }

        if (stdout.includes("Already up to date")) {
          return sock.sendMessage(chatId, { text: "✔️ Already up to date!" });
        }

        await sock.sendMessage(chatId, { text: "✅ Update Successful!\n\n🔄 Restarting bot..." });

        exec("pm2 restart all", (er) => {
          if (er) sock.sendMessage(chatId, { text: "⚠️ Restart failed!" });
        });
      });
    });
  }
};
