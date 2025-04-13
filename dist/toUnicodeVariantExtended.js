function toUnicodeVariant(str, variant, flags) {
	if (variant === 'upper') {
		str = str.toUpperCase();
	} else if (variant === 'lower') {
		str = str.toLowerCase();
	} else if (variant === 'camel') {
		str = str
			.toLowerCase()
			.replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase());
	} else if (variant === 'capitalized') {
		str = str
			.toLowerCase()
			.replace(/(?:^|\s)\S/g, (a) => a.toUpperCase());
	} else if (variant === 'title') {
		str = str
			.toLowerCase()
			.replace(/\b\w/g, (c) => c.toUpperCase());
	} else if (variant === 'sentence') {
		str = str.charAt(0).toUpperCase() + str.slice(1);
	} else if (variant === 'inverse') {
		str = str
			.split('')
			.map((char) => char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase())
			.join('');
	} else if (variant === 'alternating') {
		str = str
			.split('')
			.map((char, index) => index % 2 === 0 ? char.toUpperCase() : char.toLowerCase())
			.join('');
	} else {
		const offsets = {
			m: [0x1d670, 0x1d7f6],
			b: [0x1d400, 0x1d7ce],
			i: [0x1d434, 0x00030],
			bi: [0x1d468, 0x00030],
			g: [0x1d504, 0x00030],
			bg: [0x1d56c, 0x00030],

			d: [0x1d538, 0x1d7d8],

			bs: [0x1d5d4, 0x1d7ec],
			is: [0x1d608, 0x00030],
			bis: [0x1d63c, 0x00030],

			o: [0x24B6, 0x2460],
			on: [0x0001f150, 0x2460],

			q: [0x1f130, 0x00030],
			qn: [0x0001F170, 0x00030],

			p: [0x249c, 0x2474],
			w: [0xff21, 0xff10],
			u: [0x2090, 0xff10],
			s: [0x0336, 0xff10],
		}

		const variantOffsets = {
			'monospace': 'm',
			'bold': 'b',
			'italic': 'i',
			'bold italic': 'bi',
			'fraktur': 'g', 'gothic': 'g',
			'fraktur bold': 'bg', 'gothic bold': 'bg',
			'doublestruck': 'd',
			'bold sans': 'bs',
			'italic sans': 'is',
			'bold italic sans': 'bis',
			'circled': 'o',
			'circled negative': 'on',
			'squared': 'q',
			'squared negative': 'qn',
			'parenthesis': 'p',
			'fullwidth': 'w',
			'underline': 'u',
			'strike': 's',
		}

		const special = {
			m: { ' ': 0x2000, '-': 0x2013 },
			i: { 'h': 0x210e },
			g: { 'C': 0x212d, 'H': 0x210c, 'I': 0x2111, 'R': 0x211c, 'Z': 0x2128 },
			d: { 'C': 0x2102, 'H': 0x210D, 'N': 0x2115, 'P': 0x2119, 'Q': 0x211A, 'R': 0x211D, 'Z': 0x2124 },
			o: {
				'0': 0x24EA, '1': 0x2460, '2': 0x2461, '3': 0x2462,
				'4': 0x2463, '5': 0x2464, '6': 0x2465, '7': 0x2466,
				'8': 0x2467, '9': 0x2468
			},
			on: {}, p: {}, q: {}, qn: {}, w: {}
		};

		['p', 'w', 'on', 'q', 'qn'].forEach(t => {
			for (let i = 97; i <= 122; i++) {
				special[t][String.fromCharCode(i)] = offsets[t][0] + (i - 97)
			}
		})

		const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
		const numbers = '0123456789'

		const getType = variant => variantOffsets[variant] || offsets[variant] ? variantOffsets[variant] || variant : 'm'
		const getFlag = (flag, flags) => flags && flag.split('|').some(f => flags.split(',').includes(f))

		const type = getType(variant)
		const underline = getFlag('underline|u', flags)
		const strike = getFlag('strike|s', flags)
		let result = ''

		const exoticMaps = window.exoticMaps || {};
		Object.assign(exoticMaps, {
			greek: {
				a: 'α', b: 'в', c: 'ς', d: 'δ', e: 'ε', f: 'ғ', g: 'g', h: 'η', i: 'ι', j: 'ј', k: 'κ', l: 'λ', m: 'м', n: 'и', o: 'σ', p: 'ρ', q: 'φ', r: 'я', s: 'ѕ', t: 'т', u: 'υ', v: 'ν', w: 'ω', x: 'χ', y: 'γ', z: 'ζ',
				A: 'Α', B: 'Β', C: 'Ϲ', D: 'Δ', E: 'Σ', F: 'Ϝ', G: 'Γ', H: 'Η', I: 'Ι', J: 'ϳ', K: 'Κ', L: 'Λ', M: 'Μ', N: 'Ν', O: 'Ө', P: 'Ρ', Q: 'Ϙ', R: 'Я', S: 'Ѕ', T: 'Ƭ', U: 'Ʊ', V: 'Ѵ', W: 'Ш', X: 'Χ', Y: 'Ψ', Z: 'Ζ',
				'0': 'Ϭ', '1': 'ϭ', '2': 'Ϯ', '3': 'ϯ', '4': 'ϰ', '5': 'ϱ', '6': 'ϲ', '7': 'ϳ', '8': 'ϴ', '9': 'ϵ'
			},
			mirrored: {
				a: 'ɐ', b: 'q', c: 'ɔ', d: 'p', e: 'ǝ', f: 'ɟ', g: 'ƃ', h: 'ɥ', i: 'ᴉ', j: 'ɾ', k: 'ʞ', l: 'ʃ', m: 'ɯ', n: 'u', o: 'o', p: 'd', q: 'b', r: 'ɹ', s: 's', t: 'ʇ', u: 'n', v: 'ʌ', w: 'ʍ', x: 'x', y: 'ʎ', z: 'z',
				A: '∀', B: '𐐒', C: 'Ↄ', D: '◖', E: 'Ǝ', F: 'Ⅎ', G: '⅁', H: 'H', I: 'I', J: 'ſ', K: '⋊', L: '⅃', M: 'W', N: 'N', O: 'O', P: 'Ԁ', Q: 'Ό', R: 'ᴚ', S: 'S', T: '⊥', U: '∩', V: 'Λ', W: 'M', X: 'X', Y: '⅄', Z: 'Z',
				'0': '0', '1': 'Ɩ', '2': 'ᄅ', '3': 'Ɛ', '4': 'ᔭ', '5': 'ϛ', '6': '9', '7': 'ꞁ', '8': '8', '9': '6'
			},
			upside: {
				a: 'ɐ', b: 'q', c: 'ɔ', d: 'p', e: 'ǝ', f: 'ɟ', g: 'ƃ', h: 'ɥ', i: 'ı', j: 'ɾ', k: 'ʞ', l: 'l', m: 'ɯ', n: 'u', o: 'o', p: 'd', q: 'b', r: 'ɹ', s: 's', t: 'ʇ', u: 'n', v: 'ʌ', w: 'ʍ', x: 'x', y: 'ʎ', z: 'z',
				A: '∀', B: 'B', C: 'Ɔ', D: 'D', E: 'Ǝ', F: 'F', G: '⅁', H: 'H', I: 'I', J: 'ſ', K: 'K', L: '˥', M: 'W', N: 'N', O: 'O', P: 'Ԁ', Q: 'Q', R: 'R', S: 'S', T: '⊥', U: '∩', V: 'Λ', W: 'M', X: 'X', Y: '⅄', Z: 'Z',
				'0': '0', '1': 'Ɩ', '2': 'ᄅ', '3': 'Ɛ', '4': 'ᔭ', '5': 'ϛ', '6': '9', '7': 'ꞁ', '8': '8', '9': '6'
			},
			glitch: {
				A: 'ꮯ', B: 'Ꞗ', C: 'ꮯ', D: 'ꭷ', E: 'ꞓ', F: 'Ꞙ', G: 'ꞡ', H: 'ꞣ', I: 'ꟲ', J: 'ꞛ', K: 'Ꝁ', L: 'Ɬ', M: 'ꟸ', N: 'Ꞥ', O: 'Ꞩ', P: 'ꟼ', Q: 'Ꝗ', R: 'Ꞧ', S: 'Ꞩ', T: 'Ꞇ', U: 'ꞈ', V: 'ꞓ', W: 'Ɦ', X: 'Ꭓ', Y: 'Ʝ', Z: 'ꟿ',
				a: 'ꭺ', b: 'ɓ', c: 'ƈ', d: 'ɗ', e: 'ɇ', f: 'ƒ', g: 'ɠ', h: 'ɧ', i: 'ɨ', j: 'ʝ', k: 'ƙ', l: 'ꞎ', m: 'ɱ', n: 'ꞑ', o: 'ɵ', p: 'ƥ', q: 'ʠ', r: 'ʀ', s: 'ʂ', t: 'ƭ', u: 'ʋ', v: 'ʌ', w: 'ɯ', x: 'ҳ', y: 'ƴ', z: 'ƶ',
			},
			wiggly: {
				a: "\u0E04", b: "\u0E52", c: "\u03C2", d: "\u0E54", e: "\u0454", f: "\u0166", g: "\uFEEE", h: "\u0452", i: "\u0E40", j: "\u05DF", k: "\u043A", l: "\u026D", m: "\u0E53", n: "\u0E20", o: "\u0E4F", p: "\u05E7", q: "\u1EE3", r: "\u0433", s: "\u0E23", t: "\u0547", u: "\u0E22", v: "\u05E9", w: "\u0E2C", x: "\u05D0", y: "\u05E5", z: "\u0579",
				A: "\u0E04", B: "\u0E52", C: "\u03A7", D: "\u0E54", E: "\u0454", F: "\u0166", G: "\uFEEE", H: "\u0452", I: "\u0E40", J: "\u05DF", K: "\u043A", L: "\u026D", M: "\u0E53", N: "\u0E20", O: "\u0E4F", P: "\u05E7", Q: "\u1EE3", R: "\u0433", S: "\u0E23", T: "\u0547", U: "\u0E22", V: "\u05E9", W: "\u0E2C", X: "\u05D0", Y: "\u05E5", Z: "\u0579"
			},
			wiggly2: {
				a: "\u01DF", b: "\u026E", c: "\u0188", d: "\u0256", e: "\u025B", f: "\u0284", g: "\u0262", h: "\u0266", i: "\u0268", j: "\u029D", k: "\u04C4", l: "\u029F", m: "\u028D", n: "\u057C", o: "\u0585", p: "\u0584", q: "\u0566", r: "\u0280", s: "\u0586", t: "\u0236", u: "\u028A", v: "\u028B", w: "\u0561", x: "\u04FC", y: "\u028F", z: "\u0290",
				A: "\u01DF", B: "\u026E", C: "\u0188", D: "\u0256", E: "\u025B", F: "\u0284", G: "\u0262", H: "\u0266", I: "\u0268", J: "\u029D", K: "\u04C4", L: "\u029F", M: "\u028D", N: "\u057C", O: "\u0585", P: "\u0584", Q: "\u0566", R: "\u0280", S: "\u0586", T: "\u0236", U: "\u028A", V: "\u028B", W: "\u0561", X: "\u04FC", Y: "\u028F", Z: "\u0290"
			},
			crossed: {
				a: "\u20B3", b: "\u0E3F", c: "\u20B5", d: "\u0110", e: "\u0246", f: "\u20A3", g: "\u20B2", h: "\u2C67", i: "\u0142", j: "J", k: "\u20AD", l: "\u2C60", m: "\u20A5", n: "\u20A6", o: "\xD8", p: "\u20B1", q: "Q", r: "\u2C64", s: "\u20B4", t: "\u20AE", u: "\u0244", v: "V", w: "\u20A9", x: "\u04FE", y: "\u024E", z: "\u2C6B",
				A: "\u20B3", B: "\u0E3F", C: "\u20B5", D: "\u0110", E: "\u0246", F: "\u20A3", G: "\u20B2", H: "\u2C67", I: "\u0142", J: "J", K: "\u20AD", L: "\u2C60", M: "\u20A5", N: "\u20A6", O: "\xD8", P: "\u20B1", Q: "Q", R: "\u2C64", S: "\u20B4", T: "\u20AE", U: "\u0244", V: "V", W: "\u20A9", X: "\u04FE", Y: "\u024E", Z: "\u2C6B"
			},
			cutout: {
				a: "\uFF21", b: "\u1D47", c: "\u{1D4EC}", d: "\u{1D4ED}", e: "\uFF25", f: "\u24D5", g: "\uFF27", h: "\u{1D4F1}", i: "\u{1D422}", j: "\u05E0", k: "\u{1D542}", l: "\u{1D529}", m: "\u722A", n: "\u0147", o: "\u03C3", p: "\uFF50", q: "\u24E0", r: "\u044F", s: "\u015F", t: "t", u: "\u{1D54C}", v: "\u0476", w: "\u24CC", x: "\u{1D417}", y: "\u{1D56A}", z: "\u{1D4CF}",
				A: "\uFF21", B: "\u1D47", C: "\u{1D4EC}", D: "\u{1D4ED}", E: "\uFF25", F: "\u24D5", G: "\uFF27", H: "\u{1D4F1}", I: "\u{1D422}", J: "\u05E0", K: "\u{1D542}", L: "\u{1D529}", M: "\u722A", N: "\u0147", O: "\u03C3", P: "\uFF50", Q: "\u24E0", R: "\u044F", S: "\u015F", T: "t", U: "\u{1D54C}", V: "\u0476", W: "\u24CC", X: "\u{1D417}", Y: "\u{1D56A}", Z: "\u{1D4CF}",
				1: "\uFF11", 2: "\u2781", 3: "\uFF13", 4: "\u2783", 5: "\u277A", 6: "\uFF16", 7: "\uFF17", 8: "\u277D", 9: "\u277E", 0: "\u0472"
			},
			cutout2: {
				a: "\u{1D4B6}", b: "\u{1D4EB}", c: "\u{1D4EC}", d: "\u{1D4ED}", e: "\u{1D404}", f: "\u{1D53D}", g: "\u011E", h: "\u{1D4D7}", i: "\u0E40", j: "\u06B6", k: "\u049C", l: "\u14AA", m: "\u{1D426}", n: "\u{1D4DD}", o: "\u3116", p: "\u24C5", q: "\u1EE3", r: "\u211D", s: "\u{1D564}", t: "\u{1D4C9}", u: "\u{1D4E4}", v: "\u1D5B", w: "\u0174", x: "\u24E7", y: "\u02B8", z: "\u2124",
				1: "\u2780", 2: "\uFF12", 3: "\u2782", 4: "\uFF14", 5: "\uFF15", 6: "\u277B", 7: "\u277C", 8: "\u2787", 9: "\u277E", 0: "\u0298"
			},
			squiggle: {
				a: "à¸„", b: "à¹–", c: "Â¢", d: "à»“", e: "Ä“", f: "f", g: "àº‡", h: "h", i: "i", j: "à¸§", k: "k", l: "l", m: "à¹“", n: "àº–", o: "à»", p: "p", q: "à¹‘", r: "r", s: "Åž", t: "t", u: "à¸™", v: "à¸‡", w: "àºŸ", x: "x", y: "à¸¯", z: "àºŠ",
				A: "à¸„", B: "à¹–", C: "Â¢", D: "à»“", E: "Ä“", F: "f", G: "àº‡", H: "h", I: "i", J: "à¸§", K: "k", L: "l", M: "à¹“", N: "àº–", O: "à»", P: "p", Q: "à¹‘", R: "r", S: "Åž", T: "t", U: "à¸™", V: "à¸‡", W: "àºŸ", X: "x", Y: "à¸¯", Z: "àºŠ",
				"0": "0", "1": "1", "2": "2", "3": "3", "4": "4", "5": "5", "6": "6", "7": "7", "8": "8", "9": "9",
			},
			eastern: {
				a: "\u4E39", b: "\u65E5", c: "\u4EA1", d: "\u53E5", e: "\u30E8", f: "\u4E4D", g: "\u5442", h: "\u5EFE", i: "\u5DE5", j: "\u52F9", k: "\u7247", l: "\u3057", m: "\u518A", n: "\u51E0", o: "\u56DE", p: "\u5C38", q: "\u7532", r: "\u5C3A", s: "\u5DF1", t: "\u535E", u: "\u51F5", v: "\u30EC", w: "\u5C71", x: "\u30E1", y: "\u3068", z: "\u4E59",
				A: "\u4E39", B: "\u65E5", C: "\u4EA1", D: "\u53E5", E: "\u30E8", F: "\u4E4D", G: "\u5442", H: "\u5EFE", I: "\u5DE5", J: "\u52F9", K: "\u7247", L: "\u3057", M: "\u518A", N: "\u51E0", O: "\u56DE", P: "\u5C38", Q: "\u7532", R: "\u5C3A", S: "\u5DF1", T: "\u535E", U: "\u51F5", V: "\u30EC", W: "\u5C71", X: "\u30E1", Y: "\u3068", Z: "\u4E59",
				1: "\uFF11", 2: "\uFF12", 3: "\uFF13", 4: "\uFF14", 5: "\uFF15", 6: "\uFF16", 7: "\uFF17", 8: "\uFF18", 9: "\uFF19", 0: "\uFF10"
			},
			ancient: {
				a: "\uA2EC", b: "\uA0F3", c: "\uA254", d: "\uA4AF", e: "\uA3C2", f: "\uA2B0", g: "\uA34C", h: "\uA05D", i: "\uA490", j: "\uA4BB", k: "\uA018", l: "\uA492", m: "\uA0B5", n: "\uA2CA", o: "\uA132", p: "\uA263", q: "\uA1B0", r: "\uA2EA", s: "\uA1D9", t: "\uA4C4", u: "\uA4A4", v: "\uA4A6", w: "\uA150", x: "\uA267", y: "\uA326", z: "\uA074",
				A: "\uA2EC", B: "\uA0F3", C: "\uA254", D: "\uA4AF", E: "\uA3C2", F: "\uA2B0", G: "\uA34C", H: "\uA05D", I: "\uA490", J: "\uA4BB", K: "\uA018", L: "\uA492", M: "\uA0B5", N: "\uA2CA", O: "\uA132", P: "\uA263", Q: "\uA1B0", R: "\uA2EA", S: "\uA1D9", T: "\uA4C4", U: "\uA4A4", V: "\uA4A6", W: "\uA150", X: "\uA267", Y: "\uA326", Z: "\uA074"
			},
			ancient2: {
				a: "\uA072", b: "\uA2F0", c: "\uA02F", d: "\uA0A0", e: "\uA23C", f: "\uA11E", g: "\uA045", h: "\uA369", i: "\uA091", j: "\uA4BB", k: "\uA017", l: "\uA492", m: "\uA0B5", n: "\uA2CA", o: "\uA0A6", p: "\uA263", q: "\uA077", r: "\uA305", s: "\uA31A", t: "\uA2D6", u: "\uA407", v: "\uA030", w: "\uA14F", x: "\uA1D2", y: "\uA41E", z: "\uA074"
			},
			ufo: {
				a: "\u15E9", b: "\u15F7", c: "\u1455", d: "\u15EA", e: "E", f: "\u15B4", g: "G", h: "\u157C", i: "I", j: "\u148D", k: "K", l: "\u14AA", m: "\u15F0", n: "\u144E", o: "O", p: "\u146D", q: "\u146B", r: "\u1587", s: "\u1515", t: "T", u: "\u144C", v: "\u142F", w: "\u15EF", x: "\u166D", y: "Y", z: "\u1614",
				A: "\u15E8", B: "\u15F6", C: "\u1454", D: "\u15E9", E: "E", F: "\u15B3", G: "G", H: "\u157B", I: "I", J: "\u148C", K: "K", L: "\u14A9", M: "\u15EF", N: "\u144D", O: "O", P: "\u146C", Q: "\u146A", R: "\u1586", S: "\u1514", T: "T", U: "\u144B", V: "\u142E", W: "\u15EE", X: "\u166C", Y: "Y", Z: "\u1613"
			},
			cursive: {
				a: "\u{1D4B6}", b: "\u{1D4B7}", c: "\u{1D4B8}", d: "\u{1D4B9}", e: "\u212F", f: "\u{1D4BB}", g: "\u210A", h: "\u{1D4BD}", i: "\u{1D4BE}", j: "\u{1D4BF}", k: "\u{1D4C0}", l: "\u{1D4C1}", m: "\u{1D4C2}", n: "\u{1D4C3}", o: "\u2134", p: "\u{1D4C5}", q: "\u{1D4C6}", r: "\u{1D4C7}", s: "\u{1D4C8}", t: "\u{1D4C9}", u: "\u{1D4CA}", v: "\u{1D4CB}", w: "\u{1D4CC}", x: "\u{1D4CD}", y: "\u{1D4CE}", z: "\u{1D4CF}",
				A: "\u{1D49C}", B: "\u212C", C: "\u{1D49E}", D: "\u{1D49F}", E: "\u2130", F: "\u2131", G: "\u{1D4A2}", H: "\u210B", I: "\u2110", J: "\u{1D4A5}", K: "\u{1D4A6}", L: "\u2112", M: "\u2133", N: "\u{1D4A9}", O: "\u{1D4AA}", P: "\u{1D4AB}", Q: "\u{1D4AC}", R: "\u211B", S: "\u{1D4AE}", T: "\u{1D4AF}", U: "\u{1D4B0}", V: "\u{1D4B1}", W: "\u{1D4B2}", X: "\u{1D4B3}", Y: "\u{1D4B4}", Z: "\u{1D4B5}"
			},
			cursive_bold: {
				a: "\u{1D4EA}", b: "\u{1D4EB}", c: "\u{1D4EC}", d: "\u{1D4ED}", e: "\u{1D4EE}", f: "\u{1D4EF}", g: "\u{1D4F0}", h: "\u{1D4F1}", i: "\u{1D4F2}", j: "\u{1D4F3}", k: "\u{1D4F4}", l: "\u{1D4F5}", m: "\u{1D4F6}", n: "\u{1D4F7}", o: "\u{1D4F8}", p: "\u{1D4F9}", q: "\u{1D4FA}", r: "\u{1D4FB}", s: "\u{1D4FC}", t: "\u{1D4FD}", u: "\u{1D4FE}", v: "\u{1D4FF}", w: "\u{1D500}", x: "\u{1D501}", y: "\u{1D502}", z: "\u{1D503}",
				A: "\u{1D4D0}", B: "\u{1D4D1}", C: "\u{1D4D2}", D: "\u{1D4D3}", E: "\u{1D4D4}", F: "\u{1D4D5}", G: "\u{1D4D6}", H: "\u{1D4D7}", I: "\u{1D4D8}", J: "\u{1D4D9}", K: "\u{1D4DA}", L: "\u{1D4DB}", M: "\u{1D4DC}", N: "\u{1D4DD}", O: "\u{1D4DE}", P: "\u{1D4DF}", Q: "\u{1D4E0}", R: "\u{1D4E1}", S: "\u{1D4E2}", T: "\u{1D4E3}", U: "\u{1D4E4}", V: "\u{1D4E5}", W: "\u{1D4E6}", X: "\u{1D4E7}", Y: "\u{1D4E8}", Z: "\u{1D4E9}",
				1: "\u{1D7CF}", 2: "\u{1D7D0}", 3: "\u{1D7D1}", 4: "\u{1D7D2}", 5: "\u{1D7D3}", 6: "\u{1D7D4}", 7: "\u{1D7D5}", 8: "\u{1D7D6}", 9: "\u{1D7D7}", 0: "\u{1D7CE}", "!": "\u2757", "?": "\u2753"
			},
			sans: {
				a: "\u{1D5BA}", b: "\u{1D5BB}", c: "\u{1D5BC}", d: "\u{1D5BD}", e: "\u{1D5BE}", f: "\u{1D5BF}", g: "\u{1D5C0}", h: "\u{1D5C1}", i: "\u{1D5C2}", j: "\u{1D5C3}", k: "\u{1D5C4}", l: "\u{1D5C5}", m: "\u{1D5C6}", n: "\u{1D5C7}", o: "\u{1D5C8}", p: "\u{1D5C9}", q: "\u{1D5CA}", r: "\u{1D5CB}", s: "\u{1D5CC}", t: "\u{1D5CD}", u: "\u{1D5CE}", v: "\u{1D5CF}", w: "\u{1D5D0}", x: "\u{1D5D1}", y: "\u{1D5D2}", z: "\u{1D5D3}",
				A: "\u{1D5A0}", B: "\u{1D5A1}", C: "\u{1D5A2}", D: "\u{1D5A3}", E: "\u{1D5A4}", F: "\u{1D5A5}", G: "\u{1D5A6}", H: "\u{1D5A7}", I: "\u{1D5A8}", J: "\u{1D5A9}", K: "\u{1D5AA}", L: "\u{1D5AB}", M: "\u{1D5AC}", N: "\u{1D5AD}", O: "\u{1D5AE}", P: "\u{1D5AF}", Q: "\u{1D5B0}", R: "\u{1D5B1}", S: "\u{1D5B2}", T: "\u{1D5B3}", U: "\u{1D5B4}", V: "\u{1D5B5}", W: "\u{1D5B6}", X: "\u{1D5B7}", Y: "\u{1D5B8}", Z: "\u{1D5B9}",
				1: "\u{1D7E3}", 2: "\u{1D7E4}", 3: "\u{1D7E5}", 4: "\u{1D7E6}", 5: "\u{1D7E7}", 6: "\u{1D7E8}", 7: "\u{1D7E9}", 8: "\u{1D7EA}", 9: "\u{1D7EB}", 0: "\u{1D7E2}"
			},
		});

		if (exoticMaps[variant]) {
			return [...str].map(c => {
				let out = exoticMaps[variant][c] || c
				if (underline) out += '\u0332'
				if (strike) out += '\u0336'
				return out
			}).join('')
		}

		for (let c of str) {
			let index
			if (special[type] && special[type][c]) c = String.fromCodePoint(special[type][c])
			if (type && (index = chars.indexOf(c)) > -1) {
				result += String.fromCodePoint(index + offsets[type][0])
			} else if (type && (index = numbers.indexOf(c)) > -1) {
				result += String.fromCodePoint(index + offsets[type][1])
			} else {
				result += c
			}
			if (underline) result += '\u0332'
			if (strike) result += '\u0336'
		}
		return result
	}

	return str;
}

if (typeof module === 'object' && module && typeof module.exports === 'object') {
	module.exports = toUnicodeVariant

} else {
	window.toUnicodeVariant = toUnicodeVariant
}
if (typeof define === 'function' && define.amd) {
	define([], function () {
		return toUnicodeVariant
	})
}
if (typeof window !== 'undefined' && window) {
	window.toUnicodeVariant = toUnicodeVariant
}