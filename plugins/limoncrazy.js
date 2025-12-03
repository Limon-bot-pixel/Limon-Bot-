//==================== LIMON CRAZY COMMANDS ====================//
// 🔥 Limon Bot Crazy Commands – People Will Go Mad 🔥
// Author: Limon Bbz
// Logo: Injected via URL

const limonLogo = "https://i.postimg.cc/T1qc9P5V/20251125-081422.jpg";

module.exports = {
  name: "crazy",
  alias: ["fun", "limonfun", "lcrazy"],
  desc: "Limon Crazy Commands – Viral Fun Pack",
  react: "🔥",

  start: async (Limon, m, { pushName, prefix, isAdmin }) => {

    const target = m.quoted ? m.quoted.sender : m.mentioned[0] || pushName;

    //================ CRAZY LIST ================//
    const crazyLines = [
      "@user আজ রাতে তোমাকে এলিয়েন অপহরণ করবে 👽🚀",
      "@user এর ভবিষ্যৎ: 2050 সালে তুমি রোবটদের বস হবে 🤖👑",
      "সতর্কতা! @user এর পাওয়ার লেভেল খুব বেশি ⚡🔥",
      "@user কে স্ক্যান করা হচ্ছে... 99% Danger Detected ☠️📡",
      "@user আগামীকাল লুকানো ধন খুঁজে পাবে 💰✨",
      "AI বলেছে: @user ছাড়া পৃথিবী চলবে না 😭🌍",
      "@user এর মুখ দেখে রোবটরা ক্র্যাশ করে যায় 🤖💥",
      "গোপন তথ্য: @user হচ্ছে undercover agent 🕵️‍♂️🔥",
      "@user শীঘ্রই সুপারহিরো হবে 🦸‍♂️⚡",
      "Scan Complete: @user = 100% Legend 💚🔥",
      "@user এর মাথার মধ্যে 4GB RAM আর 128MB IQ চলছে 😭😂",
      "Future Vision: @user উড়তে শিখবে ✈️🔥",
      "Alert! @user এর চারপাশে energy blast detect হয়েছে 💥⚡",
      "@user আজ 100% লাকি — 10 টা সুসংবাদ পাবে 🍀",
      "Scientific Report: @user = Ultra Rare Human 🧬✨",
      "@user কে দেখে সূর্যও লজ্জা পায় ☀️😳",
      "Robot Scan: @user = 87% Cyborg 🤖",
      "@user is now entering GOD MODE ⚡👑",
      "AI Warning: @user খুব বেশি স্মার্ট হয়ে যাচ্ছে ⚠️🤯",
      "@user এর হাসি 10GB brightness ছাড়িয়ে গেছে 😭✨",
      "Detective Mode: @user এর ব্রেইন WiFi পাওয়া গেছে 📡😂",
      "Prediction: @user আগামীকাল হঠাৎ ভাইরাল হয়ে যাবে 📸🔥",
      "System Update: @user এখন Ultra HD Version 😎🎥",
      "@user এর চোখ থেকে লেজার বের হবে ⚡👁️",
      "AI বলে: @user impossible জিনিসও possible করতে পারে 💚🔥"
    ];

    const msg = crazyLines[Math.floor(Math.random() * crazyLines.length)].replace(/@user/g, target);

    const caption = `🔥 *LIMON CRAZY MODE ACTIVATED!* 🔥\n\n${msg}\n\n⚡ Powered By: Limon ايڪـͬــͤــᷜــͨــͣــͪـي_么`;

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
