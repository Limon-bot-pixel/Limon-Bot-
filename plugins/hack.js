module.exports = {
  name: "hack",
  alias: ["hackmenu", "hacksystem"],
  desc: "All Fake Hacking Commands in One",
  category: "fun",

  async run({ sock, m, text, command }) {

    // ============================
    // HACK MENU
    // ============================
    if (!text) {
      const menu = `
🛸 *LIMON BOT — হ্যাক মেনু*  
━━━━━━━━━━━━━━━━━━
⚠️ সব কমান্ড ১০০% ফেক (মজা)
━━━━━━━━━━━━━━━━━━

🔹 .hack ip <name>  
🔹 .hack ddos <site>  
🔹 .hack trace <user>  
🔹 .hack virus <name>  
🔹 .hack db <site>  
🔹 .hack cam <user>  
🔹 .hack net <target>

━━━━━━━━━━━━━━━━━━
👨‍💻 Developer: *Limon*  
🤖 Bot: *Limon Bot*
━━━━━━━━━━━━━━━━━━
      `;
      return sock.sendMessage(m.chat, { text: menu }, { quoted: m });
    }

    // ============================
    // SPLIT COMMAND
    // ============================
    const args = text.split(" ");
    const type = args[0];
    const target = args.slice(1).join(" ");

    if (!target) return sock.sendMessage(m.chat, { text: `❗ ব্যবহার: .hack ${type} <target>` });

    // ============================
    // FUNCTIONS
    // ============================

    function sendLoading(msgs, delay = 1200) {
      return new Promise(async (resolve) => {
        for (let msg of msgs) {
          await sock.sendMessage(m.chat, { text: msg }, { quoted: m });
          await new Promise(res => setTimeout(res, delay));
        }
        resolve();
      });
    }

    // ============================
    // IP FINDER
    // ============================
    if (type === "ip") {
      await sendLoading([
        `🔍 ${target} এর আইপি খোঁজা হচ্ছে...`,
        "📡 সার্ভার কানেক্টিং...",
        "🌐 ডেটা সংগ্রহ করা হচ্ছে...",
      ]);
      return sock.sendMessage(m.chat, { text: `🟢 *IP Found!*\nTarget: ${target}\nFake IP: 192.168.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}\nPowered by: Limon` });
    }

    // ============================
    // DDOS ATTACK
    // ============================
    if (type === "ddos") {
      await sendLoading([
        `💣 ${target} এর উপর DDOS আক্রমণ শুরু হচ্ছে...`,
        "⚡ প্যাকেট পাঠানো হচ্ছে...",
        "🔥 Firewall ভাঙার চেষ্টা...",
        "💥 আক্রমণ সম্পূর্ণ!",
      ]);
      return sock.sendMessage(m.chat, { text: `🟡 *Fake DDOS Completed!* \nSite: ${target}\nStatus: DOWN 🚫\nPowered by Limon` });
    }

    // ============================
    // TRACE USER
    // ============================
    if (type === "trace") {
      await sendLoading([
        `📍 ${target} কে ট্রেস করা হচ্ছে...`,
        "📡 লোকেশন ডেটা পাঠানো হচ্ছে...",
        "🌍 GPS লিংক সেট করা হচ্ছে...",
      ]);
      return sock.sendMessage(m.chat, { text: `🟢 *Trace Complete!*\nTarget: ${target}\nLocation: Dhaka, Bangladesh 🌏\nPowered by Limon` });
    }

    // ============================
    // VIRUS GENERATOR
    // ============================
    if (type === "virus") {
      await sendLoading([
        `🦠 ${target} এর জন্য ভাইরাস বানানো হচ্ছে...`,
        "💉 Payload Injecting...",
        "🧬 Virus Compiling...",
      ]);
      return sock.sendMessage(m.chat, { text: `☣️ *Virus Created Successfully!*\nName: ${target}\nType: Limon Trojan v4.0\nPowered by Limon` });
    }

    // ============================
    // DATABASE HACK
    // ============================
    if (type === "db") {
      await sendLoading([
        `💽 ${target} এর ডাটাবেস হ্যাক হচ্ছে...`,
        "🔐 এনক্রিপশন ব্রেকিং...",
        "🗃️ ডেটা এক্সপোর্ট করা হচ্ছে...",
      ]);
      return sock.sendMessage(m.chat, { text: `🟢 *Database Hacked (Fake)*\nSite: ${target}\nExported: 5000+ rows\nPowered by Limon` });
    }

    // ============================
    // CAMERA HACK
    // ============================
    if (type === "cam") {
      await sendLoading([
        `📸 ${target} এর ক্যামেরা কানেক্ট হচ্ছে...`,
        "🎥 ভিডিও স্ট্রিম ওপেন...",
        "⚠️ পারমিশন বাইপাস...",
      ]);
      return sock.sendMessage(m.chat, { text: `🔴 *Camera Access Denied*\nUser: ${target}\nReason: Fake Only 😄` });
    }

    // ============================
    // NETWORK BREAK
    // ============================
    if (type === "net") {
      await sendLoading([
        `📶 ${target} এর নেটওয়ার্ক ব্রেক করা হচ্ছে...`,
        "📡 Signal Jammer Running...",
        "🚫 Network Offline!",
      ]);
      return sock.sendMessage(m.chat, { text: `🟣 *Fake Network Breakdown Completed*\nTarget: ${target}\nPowered by Limon` });
    }

    // ============================
    // UNKNOWN
    // ============================
    return sock.sendMessage(m.chat, { text: `❗ Unknown type: ${type}` });
  }
};