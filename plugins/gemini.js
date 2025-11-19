const axios = require("axios");

module.exports = {
  name: "geminipack",
  alias: ["gpack"],
  desc: "Full Gemini All-in-one AI System",
  category: "AI",

  start: async (sock, m, { text, args, command }) => {
    const apiKey = "YOUR_GEMINI_API_KEY";  // এখানে তোমার API Key দাও

    if (!args[0]) {
      return m.reply(
        "🤖 *Gemini All Commands:*\n\n" +
        "🟣 *.gemini প্রশ্ন* — Full AI Chat\n" +
        "🟣 *.gimg prompt* — AI Image Generate\n" +
        "🟣 *.gcode code_prompt* — Code Writer\n" +
        "🟣 *.gs short_question* — Short Answer\n" +
        "🟣 *.gsum text* — Text Summarizer\n" +
        "🟣 *.gdef শব্দ* — Dictionary Meaning\n\n" +
        "🔥 *Powered by Limon Bot V5*"
      );
    }
  }
};



// ============ GEMINI CHAT =================

module.exports.gemini = {
  name: "gemini",
  alias: ["ai", "ask"],
  category: "AI",

  start: async (sock, m, { text }) => {
    if (!text) return m.reply("💬 প্রশ্ন লিখুন!\nExample: *.gemini Who are you?*");

    const apiKey = "YOUR_GEMINI_API_KEY";

    try {
      const res = await axios.post(
        `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${apiKey}`,
        { contents: [{ parts: [{ text }]}] }
      );

      const reply = res.data.candidates[0].content.parts[0].text;
      m.reply(reply);

    } catch (err) {
      console.log(err);
      m.reply("❌ Gemini Error!");
    }
  }
};



// ============ GEMINI IMAGE ===============

module.exports.gimg = {
  name: "gimg",
  alias: ["aiimg"],
  category: "AI",

  start: async (sock, m, { text }) => {
    if (!text) return m.reply("🎨 Prompt দিন!\nExample: *.gimg anime girl*");

    const apiKey = "YOUR_GEMINI_API_KEY";

    try {
      const gen = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-vision:generateImage?key=${apiKey}`,
        { prompt: text }
      );

      const img = gen.data.generatedImages[0].url;

      await sock.sendMessage(m.chat, {
        image: { url: img },
        caption: "✨ Gemini AI Image"
      });

    } catch (err) {
      console.log(err);
      m.reply("❌ Image Generation Error!");
    }
  }
};



// ============ CODE WRITER ================

module.exports.gcode = {
  name: "gcode",
  category: "AI",

  start: async (sock, m, { text }) => {
    if (!text) return m.reply("💻 Example:\n*.gcode calculator in js*");

    const apiKey = "YOUR_GEMINI_API_KEY";

    const res = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${apiKey}`,
      { contents: [{ parts: [{ text: "Write code for: " + text }]}] }
    );

    const reply = res.data.candidates[0].content.parts[0].text;
    m.reply("🧑‍💻 *Generated Code:*\n\n" + reply);
  }
};



// ============ SHORT ANSWER ================

module.exports.gs = {
  name: "gs",
  alias: ["gmini"],
  category: "AI",

  start: async (sock, m, { text }) => {
    if (!text) return m.reply("⚡ ছোট প্রশ্ন দিন!");

    const apiKey = "YOUR_GEMINI_API_KEY";

    const res = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${apiKey}`,
      { contents: [{ parts: [{ text: "Short answer: " + text }]}] }
    );

    const reply = res.data.candidates[0].content.parts[0].text;
    m.reply("⚡ " + reply);
  }
};



// ============ SUMMARY =====================

module.exports.gsum = {
  name: "gsum",
  alias: ["geminisum"],
  category: "AI",

  start: async (sock, m, { text }) => {
    if (!text) return m.reply("📘 Summarize text দিন!");

    const apiKey = "YOUR_GEMINI_API_KEY";

    const res = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${apiKey}`,
      { contents: [{ parts: [{ text: "Summarize: " + text }]}] }
    );

    const reply = res.data.candidates[0].content.parts[0].text;
    m.reply("📘 *Summary:*\n\n" + reply);
  }
};



// ============ DICTIONARY ==================

module.exports.gdef = {
  name: "gdef",
  alias: ["gmeaning"],
  category: "AI",

  start: async (sock, m, { text }) => {
    if (!text) return m.reply("🔤 শব্দ লিখুন!");

    const apiKey = "YOUR_GEMINI_API_KEY";

    const res = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${apiKey}`,
      { contents: [{ parts: [{ text: "Meaning of " + text }]}] }
    );

    const reply = res.data.candidates[0].content.parts[0].text;
    m.reply("📘 *Meaning:*\n\n" + reply);
  }
};