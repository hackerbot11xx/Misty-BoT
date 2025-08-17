const fs = require("fs");

module.exports.config = {
  name: "autoreply",
  version: "1.0.0",
  prefix: false,
  permission: 0,
  credits: "Shakil", 
  description: "Auto reply to common messages",
  category: "no prefix",
  cooldowns: 3, 
};

module.exports.handleEvent = function({ api, event }) {
  var { threadID, messageID } = event;
  if (!event.body) return;
  let react = event.body.toLowerCase();

  // === Keyword -> Reply লিস্ট (100+ ready) ===
  const replies = {
    "kmn aco": "ভালো আছি, তুমি কেমন? 🙂",
    "kemon aso": "আলহামদুলিল্লাহ ভালো, ধন্যবাদ ❤️",
    "valo tmi": "শুনে ভালো লাগলো 🥰",
    "ki khobor": "সব শান্তি আলহামদুলিল্লাহ 🌸",
    "salam": "ওয়া আলাইকুম আসসালাম 🤲",
    "assalamu alaikum": "ওয়া আলাইকুম আসসালাম ভাই/বোন 💚",
    "hi": "হাই! 😊 কেমন আছো?",
    "hello": "হ্যালো! 🥰",
    "hey": "হেই! কেমন চলছে?",
    "bye": "বিদায়! আবার কথা হবে 🥹",
    "good night": "শুভ রাত্রি 🌙✨",
    "gn": "গুড নাইট 🌙",
    "good morning": "শুভ সকাল ☀️",
    "gm": "গুড মর্নিং 🌞",
    "good afternoon": "শুভ অপরাহ্ন 🌤",
    "good evening": "শুভ সন্ধ্যা 🌆",
    "thank you": "তোমাকেও ধন্যবাদ 🤍",
    "tnq": "ধন্যবাদ 💚",
    "thanks": "থ্যাঙ্কস 🥰",
    "love you": "আমিও তোমাকে ভালোবাসি ❤️",
    "ily": "I Love You Too 💞",
    "miss you": "আমিও তোমাকে মিস করি 😘",
    "ok": "হুম ঠিক আছে 🙂",
    "hmm": "হুম 🥱",
    "valo nai": "শুনে খারাপ লাগলো 😔 আল্লাহ সব ঠিক করে দিবে ইনশাআল্লাহ 🤲",
    "tmi ke": "আমি তোমার বট 🤖 Shakil বানানো! 💚",
    "bot": "জ্বী বলুন, আমি আছি 🥳",
    "kaj korbi": "হ্যাঁ, আমি সবসময় কাজের জন্য প্রস্তুত ⚡",
    "pagol": "তুমিই আসল পাগল 😂",
    "haha": "😂🤣",
    "hahaha": "😆",
    "😂": "কি এত হাসি ভাই 🤔",
    "😢": "কেঁদো না প্লিজ 😥",
    "😭": "আলিঙ্গন নাও 🤗",
    "😡": "রাগ কমাও প্লিজ 🥺",
    "🙄": "এইভাবে তাকিও না 😶",
    "🤔": "কি চিন্তা করছো?",
    "😴": "ঘুমাতে যাও 🛌",
    "🤤": "খিদা পাচ্ছে নাকি? 🍔",
    "🍫": "আমিও চকলেট ভালোবাসি 😋",
    "😍": "চোখ নামাও 😳",
    "😎": "একদম স্টাইল মাস্টার!",
    "🤩": "ওয়াও দারুণ!",
    "🥰": "আমিও তোমাকে ভালোবাসি 💕",
    "😘": "মুয়া 😘",
    "❤": "❤️ ভালোবাসা নিও",
    "💔": "ভেঙে যেও না প্লিজ 😢",
    "friend": "ফ্রেন্ড ফ্রেন্ড বলো না, ভাই বলো 😎",
    "bro": "কি খবর ভাই? 🤟",
    "vai": "ভাই আছি সবসময় 💪",
    "sis": "কি খবর বোন? 🤍",
    "baba": "ওরে বাবা! 😂",
    "ma": "মা পৃথিবীর সেরা ভালোবাসা ❤️",
    "baper bot": "হ্যাঁ আমি তোমার বাপের বট 😏",
    "single": "সিঙ্গেল লাইফ ইস বেস্ট ✌️",
    "couple": "জোড়ায় জোড়ায় ভালো লাগে 💞",
    "valobasha": "ভালোবাসা মানেই ত্যাগ 💔",
    "crush": "তোমার ক্রাশকে প্রপোজ দাও 😉",
    "study": "পড়াশোনা করো, সফলতা আসবেই 📚",
    "school": "স্কুল লাইফ ইস গোল্ডেন 🏫",
    "college": "কলেজ লাইফ অসাধারণ 😍",
    "exam": "পরীক্ষা নিয়ে দুশ্চিন্তা করোনা 🤲",
    "result": "আল্লাহ ভরসা রাখো ইনশাআল্লাহ ভালো হবে 💯",
    "football": "Messi না Ronaldo? ⚽",
    "cricket": "বাংলাদেশ জিতবে ইনশাআল্লাহ 🏏",
    "bd": "আমার সোনার বাংলা 🇧🇩",
    "india": "India ❤️ Bangladesh 🤝",
    "pakistan": "Pakistan 💚 Brother Country 🤝",
    "allahu akbar": "আল্লাহু আকবর 🤲",
    "la ilaha illallah": "লা ইলাহা ইল্লাল্লাহ মুহাম্মাদুর রাসূলুল্লাহ ☝️",
    "subhanallah": "সুবহানাল্লাহ 🌸",
    "alhamdulillah": "আলহামদুলিল্লাহ 💚",
    "astagfirullah": "আস্তাগফিরুল্লাহ 🤲",
    "inshallah": "ইনশাআল্লাহ ✨",
    "mashallah": "মাশাআল্লাহ 🌺",
    "jazakallah": "জাযাকাল্লাহ খাইর 🤍",
    "dua": "আল্লাহ তোমার মঙ্গল করুন 🤲",
    "happy birthday": "🎂 শুভ জন্মদিন! আল্লাহ তোমার জীবন সুন্দর করুক 🤲",
    "birthday": "HBD 🎉🥳",
    "new year": "Happy New Year 🎊",
    "eid mubarak": "ঈদ মোবারক 🌙✨",
    "ramadan": "রমজান মোবারক 🌙",
    "jumma": "জুম্মা মোবারক 🤲",
    "friday": "শুক্রবার মোবারক 🌸",
    "monday": "সোমবার মানেই নতুন শুরু 💪",
    "night": "ঘুমাও, শুভ রাত্রি 🌙",
    "morning": "সুপ্রভাত ☀️",
    "afternoon": "দুপুরে কি খাইলা? 🍛",
    "evening": "শুভ সন্ধ্যা 🌆",
    "game": "গেম খেলো, মজা করো 🎮",
    "pubg": "PUBG খেলি চল 🎮",
    "ff": "Free Fire না PUBG? 🔥",
    "ml": "Mobile Legends Lover ⚔️",
    "song": "কোন গান শুনছো? 🎶",
    "music": "Music ইস লাইফ 🎵",
    "dance": "চলো নাচি 🕺💃",
    "photo": "তোমার ছবি সুন্দর 📸",
    "pic": "Nice pic 😍",
    "video": "ভিডিওটা দারুণ ছিলো 🎥",
    "facebook": "FB addict নাকি? 😅",
    "messenger": "Messenger Lover 💬",
    "whatsapp": "WhatsApp চালাও নাকি? 📱",
    "tiktok": "TikTok star নাকি? 😜"
  };

  for (const key in replies) {
    if (react.includes(key)) {
      api.sendMessage(`${replies[key]}\n\n🤖 Credit: Shakil`, threadID, messageID);
      api.setMessageReaction("✅", event.messageID, (err) => {}, true);
      break;
    }
  }
};

module.exports.run = function({ api, event }) {
  api.sendMessage("এই কমান্ড ম্যানুয়ালি চালানো যাবে না, শুধু মেসেজ দিলেই অটো রিপ্লাই আসবে।", event.threadID);
};
