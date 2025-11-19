// ================================
//     FULL APPROVE SYSTEM PACK
//     Limon Bot V5
// ================================

const approved = new Set();

module.exports = {

  cmds: [
    {
      name: "approve",
      alias: ["allow","aprv"],
      desc: "Approve a user",

      start: async (sock, m, { args }) => {
        let user =
          m.quoted ? m.quoted.sender :
          args[0] ? args[0].replace(/[^0-9]/g, "") + "@s.whatsapp.net" : null;

        if (!user)
          return sock.sendMessage(m.chat, { text: "⚠️ Tag or write number to approve!" });

        approved.add(user);

        sock.sendMessage(m.chat, {
          text: `✅ *User Approved Successfully*\n\n@${user.split("@")[0]} এখন বটের স্পেশাল কমান্ড ইউজ করতে পারবে!`,
          mentions: [user]
        });
      }
    },

    {
      name: "unapprove",
      alias: ["disallow","unaprv"],
      desc: "Unapprove user",

      start: async (sock, m, { args }) => {
        let user =
          m.quoted ? m.quoted.sender :
          args[0] ? args[0].replace(/[^0-9]/g, "") + "@s.whatsapp.net" : null;

        if (!user)
          return sock.sendMessage(m.chat, { text: "⚠️ Tag or write number to unapprove!" });

        approved.delete(user);

        sock.sendMessage(m.chat, {
          text: `🛑 *User Unapproved*\n\n@${user.split("@")[0]} এখন আর বটের স্পেশাল কমান্ড ইউজ করতে পারবে না।`,
          mentions: [user]
        });
      }
    },

    {
      name: "approvedlist",
      alias: ["aprvlist"],
      desc: "Show approved users",

      start: async (sock, m) => {
        let text = "📃 *Approved User List:*\n\n";

        if (approved.size === 0) text += "➤ কেউ Approved নাই!\n";

        approved.forEach(u => {
          text += `• @${u.split("@")[0]}\n`;
        });

        sock.sendMessage(m.chat, {
          text,
          mentions: [...approved]
        });
      }
    }
  ],

  // ======================
  // MAIN HANDLER CHECKER
  // ======================
  checkApproved: function (m, isOwner, needApproval) {
    if (!needApproval) return true;

    if (isOwner) return true;

    if (!approved.has(m.sender)) {
      return false;
    }

    return true;
  }
};