module.exports = {
  name: "gift",
  alias: ["giftbox", "present"],
  category: "Fun",
  desc: "Send a personal gift message from Limon",

  start: async (sock, m) => {

    // Random Gift Messages
    const gifts = [
      "🎁 তোমার জন্য LIMON-এর পক্ষ থেকে ছোট্ট একটি উপহার 💝",
      "💐 এই নাও ফুলের মতো Gift — Only For You 💗 ~Limon",
      "🎉 Surprise Gift Coming From LIMON ✨",
      "💝 Special Gift Just For You — With Love 💞 ~Limon",
      "🎀 Gift Received? কারণ এটা LIMON-এর থেকে 😍",
      "💞 তোমার মুখে হাসি ফোটাতে LIMON-এর ছোট্ট Gift 💫",
      "🛍️ Premium Gift Delivered By LIMON 😎🎁",
      "🌹 LIMON-এর হৃদয়ের Gift — শুধু তোমার জন্য 💕",
      "✨ Gift Unlocked! 🎁 Enjoy 💖 ~From Limon"
    ];

    const randomGift = gifts[Math.floor(Math.random() * gifts.length)];

    // Text Message
    await sock.sendMessage(m.chat, {
      text: randomGift + "\n\n💌 *Gift Sender:* 𝗠𝗼𝗵𝗮𝗺𝗺𝗮𝗱 𝗟𝗶𝗺𝗼𝗻"
    });

    // Sticker (Gift Animation)
    await sock.sendMessage(m.chat, {
      sticker: { url: "https://i.ibb.co/YpjTwmY/gift-sticker.webp" }
    });

  }
};