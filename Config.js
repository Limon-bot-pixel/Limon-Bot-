const config = {
    botName: "Limon Bot",
    ownerName: "Limon",
    ownerNumber: ["8801XXXXXXXXX"],   // তোমার নাম্বার এখানে বসাও
    prefix: ".",                     // কমান্ড প্রিফিক্স (যেমন: .help, .menu)
    autoread: true,                  // অটো-রিড অন/অফ
    autoTyping: false,               // অটো-টাইপিং
    autoRecording: false,            // অটো-রেকর্ডিং
    mode: "public",                  // public / private

    messages: {
        success: "✔ সফলভাবে সম্পন্ন হয়েছে!",
        admin: "⚠ শুধুমাত্র এডমিনদের জন্য!",
        botAdmin: "⚠ বটকে আগে গ্রুপে এডমিন করো!",
        owner: "⚠ এই কমান্ড শুধুমাত্র মালিক ব্যবহার করতে পারবেন!",
        group: "⚠ এই কমান্ড শুধু গ্রুপে ব্যবহার করা যাবে!",
        private: "⚠ এই কমান্ড শুধু ইনবক্সে কাজ করবে!",
        wait: "⏳ অনুগ্রহ করে অপেক্ষা করুন...",
        error: "❌ ভুল হয়েছে! আবার চেষ্টা করুন।"
    }
}

module.exports = config;
