const fs = require("fs");

module.exports.config = {
  name: "autoreply",
  version: "1.0.1",
  prefix: false,
  permission: 0,
  credits: "Removed", 
  description: "Auto reply to common messages",
  category: "no prefix",
  cooldowns: 3, 
};

module.exports.handleEvent = function({ api, event }) {
  var { threadID, messageID } = event;
  if (!event.body) return;
  let react = event.body.toLowerCase();

  // === Keyword -> Multiple Replies ===
  const replies = {
    "hi": ["হাই! 😊", "কেমন আছো? 🥰", "হাই হাই ভাই 👋"],
    "hello": ["হ্যালো! 🌸", "হ্যালো কেমন আছো? 🤍"],
    "kmn aco": ["ভালো আছি, তুমি কেমন? 🙂", "আলহামদুলিল্লাহ ভালো ❤️", "শান্তি তে আছি 🌸"],
    "salam": ["ওয়া আলাইকুম আসসালাম 🤲", "আসসালামু আলাইকুম, কেমন আছো? 💚"],
    "bye": ["বিদায়! আবার কথা হবে 🥹", "ঠিক আছে, খোদা হাফেজ 🤲"],
    "good night": ["শুভ রাত্রি 🌙✨", "গুড নাইট 💤", "ভালো ঘুমাও 🤍"],
    "good morning": ["শুভ সকাল ☀️", "গুড মর্নিং 🌞", "দিনটা সুন্দর কাটুক 🌸"],
    "love you": ["আমিও তোমাকে ভালোবাসি ❤️", "Love you too 💞", "ভালোবাসা চিরন্তন 💚"],
    "ok": ["হুম ঠিক আছে 🙂", "ওকে ভাই 👍"],
    "valo nai": ["শুনে খারাপ লাগলো 😔", "আল্লাহ সব সহজ করে দিন 🤲"]
  };

  // === Bot kar special replies ===
  const botReplies = [
    "আমি Shakil এর বট 🤖",
    "Shakil এর তৈরি করা বট আমি 😎",
    "এই বটের মালিক Shakil ✨",
    "Shakil ছাড়া আমার কেউ নাই 🤍",
    "Bot owner = Shakil ভাই 🥰",
    "আমি শুধুই Shakil এর জন্য কাজ করি 🔥",
    "Shakil is my Boss 😎",
    "আমি Shakil ভাই এর property 😅",
    "Bot kar? → Shakil 💚",
    "Shakil = আমার Owner 🤖"
  ];

  // === Normal reply check ===
  for (const key in replies) {
    if (react.includes(key)) {
      let ans = replies[key];
      if (Array.isArray(ans)) {
        ans = ans[Math.floor(Math.random() * ans.length)]; // Random reply
      }
      api.sendMessage(ans, threadID, messageID);
      api.setMessageReaction("✅", event.messageID, (err) => {}, true);
      return;
    }
  }

  // === Special bot kar check ===
  if (react.includes("bot kar") || react.includes("kar bot") || react.includes("tumi kar bot")) {
    let ans = botReplies[Math.floor(Math.random() * botReplies.length)];
    api.sendMessage(ans, threadID, messageID);
    api.setMessageReaction("🤖", event.messageID, (err) => {}, true);
  }
};

module.exports.run = function({ api, event }) {
  api.sendMessage("এই কমান্ড ম্যানুয়ালি চালানো যাবে না, শুধু মেসেজ দিলেই অটো রিপ্লাই আসবে।", event.threadID);
};
