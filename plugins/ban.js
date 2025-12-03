//================= Limon Ban Command ==================//
cmd({
    pattern: "ban",
    alias: ["kick"],
    react: "🔨",
    desc: "Ban সদস্য",
    category: "group",
    use: "<reply/tag>",
    filename: __filename
},
async (Void, citel, text) => {

    //===== ONLY ADMINS CAN USE =====//
    if (!citel.isGroup) return citel.reply("⚠️ এই কমান্ড শুধুমাত্র গ্রুপে ব্যবহার করা যাবে!");
    const groupMetadata = await Void.groupMetadata(citel.chat);
    const participants = groupMetadata.participants;

    const isBotAdmin = participants.find(p => p.id == Void.user.id)?.admin;
    const isUserAdmin = participants.find(p => p.id == citel.sender)?.admin;

    if (!isUserAdmin) return citel.reply("❌ শুধুমাত্র গ্রুপ অ্যাডমিন এই কমান্ডটি ব্যবহার করতে পারবেন!");
    if (!isBotAdmin) return citel.reply("❌ প্রথমে আমাকে গ্রুপ অ্যাডমিন করুন!");

    //===== TARGET USER =====//
    let target;
    if (citel.quoted) {
        target = citel.quoted.sender;
    } else if (text) {
        target = text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
    } else {
        return citel.reply("⚠️ কাকে BAN করবেন? রিপ্লাই দিন বা নম্বর লিখুন!");
    }

    if (!participants.find(p => p.id === target))
        return citel.reply("⚠️ টার্গেট গ্রুপে নেই!");

    //==== BAN MESSAGE ====//
    const banMsg = `🔨 *BAN সফল হয়েছে!*

👤 *Ban দেওয়া হয়েছে:* @${target.split("@")[0]}
👮‍♂️ *Ban প্রদানকারী:* @${citel.sender.split("@")[0]}
📛 *গ্রুপ:* ${groupMetadata.subject}
⏰ *সময়:* ${new Date().toLocaleString("bn-BD")}
⚡ *Powered By:* 𝐋𝐢𝐦𝐨𝐧ايڪـͬــͤــᷜــͨــͣــͪـي_么`;

    //==== SEND =====//
    await Void.sendMessage(citel.chat, {
        text: banMsg,
        mentions: [target, citel.sender]
    });

    //==== BAN (REMOVE) ====//
    await Void.groupParticipantsUpdate(citel.chat, [target], "remove");
});