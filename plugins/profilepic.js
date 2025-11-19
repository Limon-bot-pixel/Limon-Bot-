module.exports = {
  name: "setpp",
  alias: ["setprofile", "profilepic"],
  desc: "Set Profile Picture",
  category: "Tools",

  start: async (sock, m, { command, args }) => {

    if (!m.quoted || !/image/.test(m.quoted.mtype)) {
      return m.reply("📸 *দয়া করে কোনো ছবি রিপ্লাই করে কমান্ড দিন*\nউদাহরণ:\nReply an image and type *.setpp*")
    }

    try {
      let buffer = await m.quoted.download()

      await sock.updateProfilePicture(m.sender, buffer)

      await m.reply("✅ *Profile Photo Successfully Updated!* 🔥\n_By Limon Bot_")

    } catch (err) {
      console.log(err)
      return m.reply("❌ *PP সেট করতে সমস্যা হয়েছে!*")
    }
  }
}