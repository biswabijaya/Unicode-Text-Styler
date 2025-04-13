# Unicode Text Styler

Convert plain text into fancy Unicode variants like 𝗯𝗼𝗹𝗱, 𝓼𝓬𝓻𝓲𝓹𝓽, 🅒🅘🅡🅒🅛🅔, ᴍɪʀʀᴏʀᴇᴅ, and more!

Perfect for:
- LinkedIn posts
- Instagram captions
- Mobile app push notifications
- Stylish blog headers

## Installation

```bash
npm install unicode-text-styler
```

## Usage

```js
const { toUnicodeVariant } = require('unicode-text-styler');

console.log(toUnicodeVariant("Text Editor", "bold italic"));
console.log(toUnicodeVariant("Stylish", "circled negative"));
console.log(toUnicodeVariant("Push", "mirrored", "underline"));
```

## Variants Supported
- `bold`, `italic`, `bold italic`, `monospace`, `sans`, `script`
- `circled`, `circled negative`, `parenthesis`, `squared`, `squared negative`
- Exotic: `greek`, `mirrored`, `upside`, `glitch`, `wiggly`, `anchor`, `faux`

## License

MIT
