module.exports = {
  name: "antisticker",
  alias: ["antis", "ast"],
  desc: "Anti Sticker System With BadList",
  category: "Moderation",

  badList: [],   // এখানে সব ব্লক করা স্টিকার Hash জমা হবে

  start: async (sock, m, { text, prefix, command }) => {
    const _this = module.exports;

    // Command on/off
    if (text === "on") {
      _this.enabled = true;
      return m.reply("🛡️ *AntiSticker Activated!*\nএখন বাজে স্টিকার দিলে অটো ডিলিট হবে ✔️");
    }

    if (text === "off") {
      _this.enabled = false;
      return m.reply("⚠️ *AntiSticker Disabled!*");
    }

    // Show BadList
    if (text === "list") {
      if (_this.badList.length === 0) return m.reply("📛 *Bad Sticker List Empty!*");
      return m.reply(
`🧾 *Blocked Sticker Hash List:*

${_this.badList.map((v, i) => `${i + 1}. ${v}`).join("\n")}`
      );
    }

    // Add Sticker to BadList (reply to sticker)
    if (text === "add") {
      if (!m.quoted || m.quoted.mtype !== "stickerMessage")
        return m.reply("⚠️ *একটি স্টিকারে রিপ্লাই করে .antisticker add দিন*");

      let hash = m.quoted.msg.fileSha256.toString("base64");

      if (_this.badList.includes(hash))
        return m.reply("⚠️ *এই স্টিকার Hash আগেই Blocked List এ আছে!*");

      _this.badList.push(hash);

      return m.reply(
`🛡️ *Sticker Added to AntiSticker BadList!*  
Hash:  
\`\`\`${hash}\`\`\``
      );
    }

    // Remove Sticker from BadList
    if (text.startsWith("remove")) {
      let id = Number(text.split(" ")[1]) - 1;

      if (!_this.badList[id]) return m.reply("⚠️ *Invalid Number!*");

      let removed = _this.badList.splice(id, 1);

      return m.reply(
`🗑️ *Removed From BadList!*
\`\`\`${removed}\`\`\``
      );
    }

    // Clear all badlist
    if (text === "clear") {
      _this.badList = [];
      return m.reply("🗑️ *All Bad Sticker Hash Cleared!*");
    }
  },

  // Auto Action Section
  handleSticker: async (sock, m) => {
    const _this = module.exports;

    if (!_this.enabled) return;

    if (m.message?.stickerMessage) {
      let hash = m.message.stickerMessage.fileSha256.toString("base64");

      if (_this.badList.includes(hash)) {
        await sock.sendMessage(m.chat, { delete: m.key });
        await sock.sendMessage(m.chat, { text: `⚠️ *Warning 1/4 — Bad Sticker Found!*  
⛔ User: @${m.sender.split("@")[0]}`, mentions: [m.sender] });
      }
    }
  }
};