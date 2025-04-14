# Unicode Text Styler

Convert plain text into fancy Unicode variants like - this is 𝗯𝗼𝗹𝗱, 𝘪𝘵𝘢𝘭𝘪𝘤, 𝙗𝙤𝙡𝙙-𝙞𝙩𝙖𝙡𝙞𝙘, 𝚞̲𝚗̲𝚍̲𝚎̲𝚛̲𝚕̲𝚒̲𝚗̲𝚎̲𝚍̲, 𝗯̲𝗼̲𝗹̲𝗱̲-̲𝘂̲𝗻̲𝗱̲𝗲̲𝗿̲𝗹̲𝗶̲𝗻̲𝗲̲𝗱̲, strikethrough, circle, b-circle, box, 🅱-🅱🅾🆇, ＣＲＡＺＹ, 𝓈𝒸𝓇𝒾𝓅𝓉, 𝓫𝓸𝓵𝓭-𝓼𝓬𝓻𝓲𝓹𝓽, 𝔊𝔩𝔬𝔱𝔥𝔦𝔠, 𝔻𝕠𝕦𝕓𝕝𝕖𝕤𝕥𝕣𝕦𝕔𝕜 text..

Perfect for:
- LinkedIn posts
- Instagram captions
- Push notifications
- Stylish logs and terminal messages
- YouTube titles & thumbnails
- WhatsApp bios
- Tweet formatting
- Markdown blog highlights
- Git commit styling
- Resume or portfolio flair
- Emojis with context

---

## ✨ Features

✅ Supports styles like:
- **Classic**: 𝗕𝗼𝗹𝗱, 𝘪𝘵𝘢𝘭𝘪𝘤, 𝙗𝙤𝙡𝙙-𝙞𝙩𝙖𝙡𝙞𝙘, 𝚞̲𝚗̲𝚍̲𝚎̲𝚛̲𝚕̲𝚒̲𝚗̲𝚎̲, 𝗯̲𝗼̲𝗹̲𝗱̲-𝘂̲𝗻̲𝗱̲𝗲̲𝗿̲𝗹̲𝗶̲𝗻̲𝗲̲, 𝚜̶𝚝̶𝚛̶𝚒̶𝚔̶𝚎̶𝚝̶𝚑̶𝚛̶𝚘̶𝚞̶𝚐̶𝚑̶
- **Sans**: 𝖲𝖺𝗇𝗌, 𝗕𝗼𝗹𝗱 𝗦𝗮𝗻𝘀, 𝘐𝘵𝘢𝘭𝘪𝘤 𝘚𝘢𝘯𝘴, 𝘽𝙤𝙡𝙙 𝙄𝙩𝙖𝙡𝙞𝙘 𝙎𝙖𝙣𝙨
- **Fancy Fonts**: 𝒞𝓊𝓇𝓈𝒾𝓋ℯ, 𝓑𝓸𝓵𝓭 𝓒𝓾𝓻𝓼𝓲𝓿𝓮, 𝔊𝔩𝔬𝔱𝔥𝔦𝔠, 𝔅𝔬𝔩𝔡, 𝔻𝕠𝕦𝕓𝕝𝕖-𝕤𝕥𝕣𝕦𝕔𝕜
- **Special Shapes**: ⓒⓘⓡⓒⓛⓔ, 🅑🅛🅐🅒🅚 🅒🅘🅡🅒🅛🅔, 🅂🅀🅄🄰🅁🄴, 🅱🅻🅰🅲🅺 🆂🆀🆄🅰🆁🅴, ⒫⒜⒭⒠⒩
- **Exotic**: Γρεεκ, Wᴉɹɹoɹ, ∩dsᴉpǝ, ꞡꞎɨƭƈɧ, ฬเﻮﻮɭץ, աɨռɢʟʏ, ₵ⱤØ₴₴ɆĐ, 𝓬𝕌tσ𝕌t, 𝓬𝕌tσ𝕌t, 𝓬𝓤𝓉ㄖ𝓤𝓉, ꋬꋊꉔ꒐ꏂꋊ꓄, Aꋊꀯꂑꈼꋊꋖ, ᑌᖴO
- **Case Variants**: UPPER, lower, camelCase, Capitalized, Title Case, Sentence case, InVeRsE CaSe, aLtErNaTiNg cAsE

---
### 🧩 Installation

```bash
npm install unicode-text-styler
```

🔗 [View on NPM](https://www.npmjs.com/package/unicode-text-styler)

---

## 🧪 Usage

```js
const { toUnicodeVariant } = require('unicode-text-styler');

console.log(toUnicodeVariant("Hello World", "bold"));
// Output: 𝗛𝗲𝗹𝗹𝗼 𝗪𝗼𝗿𝗹𝗱
console.log(toUnicodeVariant("CIRCLE", "circled"));
// Output: ⒸⒾⓇⒸⓁⒺ
console.log(toUnicodeVariant("BLOCK", "squared negative"));
// Output: 🅱🅻🅾🅲🅺
console.log(toUnicodeVariant("Stylish", "monospace", "underline,strike"));
// Output: 𝚜̶̲𝚝̶̲𝚢̶̲𝚕̶̲𝚒̶̲𝚜̶̲𝚑̶̲
// Upper/lower are not unicode variants but case utilities
console.log("linkedin".toUpperCase()); // LINKEDIN
console.log("LinkedInIsGreat".toLowerCase()); // linkedinisgreat
```

---

## 🌐 Live Demo
👉 Try it at: [https://biswabijaya.com/Unicode-Text-Styler/](https://biswabijaya.com/Unicode-Text-Styler/)

---

## 🛠 Supported Flags
- `underline`
- `strike`

---

## 📖 License
MIT
---

> ✨ Star this project on [GitHub](https://github.com/biswabijaya/Unicode-Text-Styler) if you find it useful!

Made with 💖 by [@biswabijaya](https://github.com/biswabijaya)


