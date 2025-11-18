module.exports = {
  name: "ai-multi-style-goodbye",
  event: "group-participants-update",

  run: async (sock, update) => {
    try {
      const user = update.participants[0];
      const action = update.action;

      if (action !== "remove") return;

      const metadata = await sock.groupMetadata(update.id);
      const groupName = metadata.subject;

      const username = user.split("@")[0];

      const styles = [

        // 1. Emotional Soft Goodbye
        `💔 *Farewell @${username}!*  
তোমাকে ছাড়া *${groupName}* আগের মতো থাকবে না…  
যেখানেই থাকো, ভাল থেকো। 🌸`,

        // 2. Cyber AI Shutdown Style
        `🖥️⚡ *AI SYSTEM NOTICE* ⚡🖥️  
User @${username} disconnected from *${groupName}* network.  
Status: OFFLINE ❌  
Goodbye, Operator.`,

        // 3. Dark Mode Goodbye
        `🌑😔 *A Shadow Has Left*  
@${username} has departed from *${groupName}*.  
Silence remains…`,

        // 4. Fire Warrior Style
        `🔥⚔️ *WARRIOR EXITED!* ⚔️🔥  
@${username} has left *${groupName}*.  
May your next battle be victorious!`,

        // 5. Soft Cute Goodbye
        `🐼💞 @${username},  
আমরা মিস করব তোমাকে!  
বিদায় বন্ধু… *${groupName}* তোমাকে ভুলবে না! 🌸`,

        // 6. Space Galaxy Goodbye
        `🌌🚀 *ASTRONAUT DEPARTURE!*  
@${username} has exited spaceship *${groupName}*.  
Safe travels to your next galaxy!`,

        // 7. Samurai Honor Goodbye
        `🗡️🇯🇵 *Samurai @${username} has left the dojo.*  
Respect & honor always with you. Farewell!`,

        // 8. Hacker Matrix Exit
        `🟩💻 *MATRIX UPDATE*  
@${username} logged out from *${groupName}* grid.  
Connection terminated.`,

        // 9. Royal Goodbye
        `👑✨ *Royal Departure*  
Sir/Madam @${username} has left the kingdom *${groupName}*.  
Safe journey beyond the castle walls.`,

        // 10. Magic Fairy Goodbye
        `🧚✨ *Fairy Dust Fades…*  
@${username} just left *${groupName}*.  
May magic follow your path! ✨`,

        // 11. Thunder Goodbye
        `⚡🌩️ *THUNDER FADES AWAY*  
@${username} left *${groupName}*.  
Storm quiets…`,

        // 12. Ice Cold Goodbye
        `❄️💙 *Frozen Exit*  
@${username} has melted away from *${groupName}*.  
Goodbye, cold traveler.`,

        // 13. Cartoon Funny Goodbye
        `😂👋 *BYE-BYE!*  
@${username} escaped from *${groupName}*!  
সবাই বলুক— টাটা টাটা টাটা! 🎉`,

        // 14. Silent Ghost Goodbye
        `👻… @${username} silently disappeared from *${groupName}*  
No noise. No goodbye. Only emptiness.`,

        // 15. Epic Hero Exit
        `🦸‍♂️✨ *HERO RETIRED!*  
@${username} completed their mission and left *${groupName}*.  
Legend remains.`,

      ];

      const randomStyle = styles[Math.floor(Math.random() * styles.length)];

      await sock.sendMessage(update.id, {
        text: randomStyle,
        mentions: [user]
      });

    } catch (e) {
      console.error("Goodbye Plugin Error:", e);
    }
  }
};
