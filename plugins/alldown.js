module.exports = {
  name: "alldown",
  alias: ["download", "dl"],
  category: "Downloader",

  start: async (sock, m, { text }) => {
    if (!text) 
      return sock.sendMessage(m.chat, {
        text: `🔽 *All Downloader*\n\nSend a valid link.\n\nExample:\n.alldown https://youtube.com/...`
      });

    const link = text;

    try {
      await sock.sendMessage(m.chat, { react: { text: "⏳", key: m.key } });

      // =============== YOUTUBE ===============
      if (link.includes("youtube.com") || link.includes("youtu.be")) {
        let api = `https://api.akuari.my.id/downloader/yt?link=${link}`;
        let res = await fetch(api);
        let data = await res.json();

        return sock.sendMessage(m.chat, {
          video: { url: data.result.video },
          caption: `✅ *YouTube Video Downloaded*\n🎬 Title: ${data.result.title}`
        });
      }

      // =============== FACEBOOK ===============
      if (link.includes("facebook.com") || link.includes("fb.watch")) {
        let api = `https://api.akuari.my.id/downloader/fb?link=${link}`;
        let res = await fetch(api);
        let data = await res.json();

        return sock.sendMessage(m.chat, {
          video: { url: data.url },
          caption: `📘 Facebook Video Downloaded`
        });
      }

      // =============== INSTAGRAM ===============
      if (link.includes("instagram.com")) {
        let api = `https://api.akuari.my.id/downloader/ig?link=${link}`;
        let res = await fetch(api);
        let data = await res.json();

        return sock.sendMessage(m.chat, {
          image: { url: data.result[0].url },
          caption: `📸 Instagram Content Downloaded`
        });
      }

      // =============== TIKTOK ===============
      if (link.includes("tiktok.com")) {
        let api = `https://api.akuari.my.id/downloader/tiktok?link=${link}`;
        let res = await fetch(api);
        let data = await res.json();

        return sock.sendMessage(m.chat, {
          video: { url: data.result.nowm },
          caption: `🎵 TikTok No-Watermark Video`
        });
      }

      // =============== PINTEREST ===============
      if (link.includes("pin.it") || link.includes("pinterest.com")) {
        let api = `https://api.akuari.my.id/downloader/pinterestdl?link=${link}`;
        let res = await fetch(api);
        let data = await res.json();

        return sock.sendMessage(m.chat, {
          image: { url: data.result },
          caption: `📌 Pinterest Image Downloaded`
        });
      }

      // =============== MEDIAFIRE ===============
      if (link.includes("mediafire.com")) {
        let api = `https://api.akuari.my.id/downloader/mediafire?link=${link}`;
        let res = await fetch(api);
        let data = await res.json();

        return sock.sendMessage(m.chat, {
          document: { url: data.result.link, fileName: data.result.filename },
          mimetype: "application/octet-stream",
          caption: `📦 Mediafire File Downloaded`
        });
      }

      // =============== APKPURE ===============
      if (link.includes("apkpure.com")) {
        let api = `https://api.akuari.my.id/downloader/apkpure?link=${link}`;
        let res = await fetch(api);
        let data = await res.json();

        return sock.sendMessage(m.chat, {
          document: { url: data.result.dl, fileName: data.result.name + ".apk" },
          mimetype: "application/vnd.android.package-archive",
          caption: `📱 APK Downloaded`
        });
      }

      return sock.sendMessage(m.chat, { text: "❌ Unsupported link!" });

    } catch (e) {
      return sock.sendMessage(m.chat, {
        text: "⚠️ Error! Try another link."
      });
    }
  }
};