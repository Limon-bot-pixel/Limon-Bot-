//==================== LIMON PREMIUM COMMANDS ====================//
// Ultra Premium + Viral + Fun + AI Powered Commands
// Author: Limon Bbz
// Logo: Injected via URL

const limonLogo = "https://i.postimg.cc/T1qc9P5V/20251125-081422.jpg";

module.exports = {
  name: "premium",
  alias: ["lpremium", "limonpremium", "pmega"],
  desc: "Limon Premium Mega Command Pack",
  react: "💎",

  start: async (Limon, m, { pushName, prefix }) => {

    const target = m.quoted ? m.quoted.sender : m.mentioned[0] || pushName;

    //================ PREMIUM LINES ================//
    const premiumLines = [
      "@user এর ভবিষ্যৎ Ultra HD Version চলছে 🎥✨",
      "AI Scan: @user = 99% Super Legend 🔥👑",
      "@user কে দেখে রোবটরা পর্যন্ত Respect দেয় 🤖💚",
      "Warning! @user এর Power Level অসীম ⚡🥶",
      "@user আজকের দিন: 200% Lucky 🍀✨",
      "AI বলছে: @user এর মাথায় 5G Processor চলছে 📡🧠",
      "@user এখন GOD MODE এ আছে ⚡👑",
      "Future Vision: @user শীঘ্রই ভাইরাল হতে যাচ্ছে 🔥📸",
      "Scientific Report: @user Rare Human 🧬✨",
      "@user কে দেখে Light Speed ও Slow হয়ে যায় 😭⚡",
      "Robot Test: @user = 87% Cyborg 🤖",
      "Prediction Loading… @user = Success Mode Activated 🔋🔥",
      "@user এর Aura: Electric Purple ⚡💜",
      "Ultra Scan: @user এর ভিতরে Hidden Talent Detect হয়েছে 💚🔥",
      "@user is now Entering Supreme Mode 👑✨",
      "AI বলছে @user এর সাথে ঝামেলা মানে নিজের ক্ষতি ☠️😂",
      "@user এর হাসি 5000 Lumens Brightness 😭✨",
      "Energy Blast Detected Around @user 💥⚡",
      "@user এর উপস্থিতিতে গ্রহের Gravity পর্যন্ত চেঞ্জ হয় 🌍😂",
      "@user এখন Ultra Premium Rank S+ 🏆🔥"
    ];

    const msg = premiumLines[Math.floor(Math.random() * premiumLines.length)].replace(/@user/g, target);

    const caption = `💎 *LIMON PREMIUM MODE* 💎\n\n${msg}\n\n⚡ Powered By: Limon ايڪـͬــͤــᷜــͨــͣــͪـي_么`;

    try {
      await Limon.sendMessage(
        m.from,
        {
          image: { url: limonLogo },
          caption: caption,
          mentions: [target]
        },
        { quoted: m }
      );
    } catch (err) {
      console.log(err);
    }
  }
};
