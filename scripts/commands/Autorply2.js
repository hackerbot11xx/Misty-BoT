const fs = require("fs");

module.exports.config = {
  name: "autoreply",
  version: "1.0.2",
  prefix: false,
  permission: 0,
  credits: "Removed", 
  description: "Auto reply to common messages + Denied special reply",
  category: "no prefix",
  cooldowns: 3, 
};

module.exports.handleEvent = async function({ api, event }) {
  try {
    const { threadID, messageID, body } = event;

    if (!body) return;
    const react = body.toLowerCase().trim();

    // === Keyword -> Multiple Replies ===
    const replies = {
      "hi": ["হাই! 😊", "কেমন আছো? 🥰", "হাই হাই ভাই 👋"],
      "hello": ["হ্যালো! 🌸", "হ্যালো কেমন আছো? 🤍"],
      "kmn aco": ["ভালো আছি, তুমি কেমন? 🙂", "আলহামদুলিল্লাহ ভালো ❤️", "শান্তিতে আছি 🌸"],
      "salam": ["ওয়া আলাইকুম আসসালাম 🤲", "আসসালামু আলাইকুম, কেমন আছো? 💚"],
      "bye": ["বিদায়! আবার কথা হবে 🥹", "ঠিক আছে, খোদা হাফেজ 🤲"],
      "good night": ["শুভ রাত্রি 🌙✨", "গুড নাইট 💤", "ভালো ঘুমাও 🤍"],
      "good morning": ["শুভ সকাল ☀️", "গুড মর্নিং 🌞", "দিনটা সুন্দর কাটুক 🌸"],
      "love you": ["আমিও তোমাকে ভালোবাসি ❤️", "Love you too 💞", "ভালোবাসা চিরন্তন 💚"],
      "ok": ["হুম ঠিক আছে 🙂", "ওকে ভাই 👍"],
      "valo nai": ["শুনে খারাপ লাগলো 😔", "আল্লাহ সব সহজ করে দিন 🤲"]
    };

    // === Bot special replies ===
    const botReplies = [
      "আমি Shakil এর বট 🤖",
      "Shakil এর তৈরি করা বট আমি 😎",
      "এই বটের মালিক Shakil ✨",
      "Shakil ছাড়া আমার কেউ নাই 🤍",
      "Bot owner = Shakil ভাই 🥰",
      "আমি শুধুই Shakil এর জন্য কাজ করি 🔥",
      "Shakil is my Boss 😎",
      "আমি Shakil ভাই এর property 😅",
      "Bot কর? → Shakil 💚",
      "Shakil = আমার Owner 🤖"
    ];

    // === Denied special reply (link/logo) ===
    const deniedReply = "❌ Denied! ❌\nhttps://i.ibb.co/2NwF1KP/denied-logo.png"; // Replace with your own logo URL if needed

    // === Normal reply check ===
    for (const key in replies) {
      const regex = new RegExp(`\\b${key}\\b`, "i");
      if (regex.test(react)) {
        let ans = replies[key];
        if (Array.isArray(ans)) {
          ans = ans[Math.floor(Math.random() * ans.length)]; // Random reply
        }
        await api.sendMessage(ans, threadID);
        await api.setMessageReaction("✅", messageID, (err) => {}, true);
        return;
      }
    }

    // === Special bot check ===
    if (/bot\s*kar|kar\s*bot|tumi\s*kar\s*bot/i.test(react)) {
      let ans = botReplies[Math.floor(Math.random() * botReplies.length)];
      await api.sendMessage(ans, threadID);
      await api.setMessageReaction("🤖", messageID, (err) => {}, true);
      return;
    }

    // === Denied keyword check ===
    if (react.includes("denied")) {
      await api.sendMessage(deniedReply, threadID);
      await api.setMessageReaction("❌", messageID, (err) => {}, true);
      return;
    }

  } catch (error) {
    console.error("Error in autoreply:", error);
  }
};

module.exports.run = function({ api, event }) {
  api.sendMessage(
    "এই কমান্ড ম্যানুয়ালি চালানো যাবে না, শুধু মেসেজ দিলেই অটো রিপ্লাই আসবে।",
    event.threadID
  );
};
