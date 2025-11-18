module.exports = {
  name: "ai-multi-style-welcome",
  event: "group-participants-update",

  run: async (sock, update) => {
    try {
      const user = update.participants[0];
      const action = update.action;
      if (action !== "add") return;

      const metadata = await sock.groupMetadata(update.id);
      const groupName = metadata.subject;

      const username = user.split("@")[0];

      // ==== বিভিন্ন AI স্টাইল ====
      const styles = [

        // 1. Cyber AI Style
        `🛰 *CYBER AI SYSTEM BOOTED!*

👤 @${username} detected entering *${groupName}*.

🤖 Status: New Member  
📡 Scanning Environment...  
✔ Access Granted  
✨ Welcome Human, Enjoy the Digital Realm!`,

        // 2. Soft Cute Style
        `🌸✨ *Welcome Sweetie!* ✨🌸

হেই @${username}!  
🤗 তুমি এসে গ্রুপটা আরও রঙিন করে দিলে!  
🌼 *${groupName}* ফ্যামিলির একজন হয়ে যাও! 💛`,

        // 3. Futuristic Robot Style
        `🤖 *AI BOT MESSAGE*

@${username} has been uploaded to  
the *${groupName}* database.

⚙ Initializing Profile...  
⚙ Loading Welcome Protocol...  
✔ Welcome to the Network!`,

        // 4. Premium Elegant Style
        `💎 *Welcome to the Elite Circle* 💎

@${username},  
তোমাকে আমাদের অত্যন্ত মানসম্মত গ্রুপ *${groupName}*-এ  
অত্যন্ত মর্যাদার সঙ্গে স্বাগতম 💼✨`,

        // 5. Fire Style
        `🔥🔥 *HOT ENTRY ALERT!* 🔥🔥

@${username} just dropped into *${groupName}*!  
Get ready for some serious vibes! 😎🔥`,

        // 6. Neon Glitch Style
        `⚡🕶 GL1TCH-W3LC0M3 🕶⚡

@${username} uploaded in *${groupName}*  
>>> SYSTEM: Synced  
>>> MODE: Activated  
>>> WELCOME!`,

        // 7. Anime Style
        `✨🍥 *Konnichiwa @${username}!* 🍥✨

Welcome to the anime universe of *${groupName}*!  
Let’s create some EPIC moments! 😍🔥`,

        // 8. Royal King Style
        `👑 *Royal Entrance!* 👑

@${username}  
অত্যন্ত সম্মানিত সদস্য—  
তোমাকে *${groupName}* রাজ্যে স্বাগতম! 🏰✨`,

        // 9. Friendly Social Style
        `👋 হাই @${username}!  
স্বাগতম আমাদের ফ্রেন্ডলি *${groupName}* গ্রুপে!  
এখানে সবাই খুব সহায়ক—তুমি মজা পাবে! 😄`,

        // 10. Dark Demon Style
        `🔥😈 *A NEW SOUL HAS ENTERED!* 😈🔥

@${username} has entered *${groupName}*  
Let the chaos… BEGIN! 😈🔥`,

      ];

      // র‍্যান্ডম স্টাইল সিলেক্ট
      const randomStyle = styles[Math.floor(Math.random() * styles.length)];

      // মেসেজ পাঠাও
      await sock.sendMessage(update.id, {
        text: randomStyle,
        mentions: [user]
      });

    } catch (err) {
      console.error("AI Multi-style Welcome Error:", err);
    }
  }
};
