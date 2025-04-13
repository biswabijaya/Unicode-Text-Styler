/*
 * supported unicode variants
 *
 * m: monospace
 * b: bold
 * i: italic
 * c: script (Mathematical Alphanumeric Symbols)
 * g: gothic / fraktur
 * d: double-struck
 * s: sans-serif
 * o: circled text
 * p: parenthesized latin letters
 * q: squared text
 * w: fullwidth
 */

function toUnicodeVariant(str, variant, flags) {

	const offsets = {
		m: [0x1d670, 0x1d7f6],
		b: [0x1d400, 0x1d7ce],
		i: [0x1d434, 0x00030],
		bi: [0x1d468, 0x00030],
		c: [0x0001d49c, 0x00030],
		bc: [0x1d4d0, 0x00030],
		g: [0x1d504, 0x00030],
		d: [0x1d538, 0x1d7d8],
		bg: [0x1d56c, 0x00030],
		s: [0x1d5a0, 0x1d7e2],
		bs: [0x1d5d4, 0x1d7ec],
		is: [0x1d608, 0x00030],
		bis: [0x1d63c, 0x00030],
		o: [0x24B6, 0x2460],
		on: [0x0001f150, 0x2460],
		p: [0x249c, 0x2474],
		q: [0x1f130, 0x00030],
		qn: [0x0001F170, 0x00030],
		w: [0xff21, 0xff10],
		u: [0x2090, 0xff10]
	}

	const variantOffsets = {
		'monospace': 'm',
		'bold': 'b',
		'italic': 'i',
		'bold italic': 'bi',
		'script': 'c',
		'bold script': 'bc',
		'gothic': 'g',
		'gothic bold': 'bg',
		'doublestruck': 'd',
		'sans': 's',
		'bold sans': 'bs',
		'italic sans': 'is',
		'bold italic sans': 'bis',
		'parenthesis': 'p',
		'circled': 'o',
		'circled negative': 'on',
		'squared': 'q',
		'squared negative': 'qn',
		'fullwidth': 'w'
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
	}

		;['p', 'w', 'on', 'q', 'qn'].forEach(t => {
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
			A: 'Α', B: 'Β', C: 'Ϲ', D: 'Δ', E: 'Σ', F: 'Ϝ', G: 'Γ',
			H: 'Η', I: 'Ι', J: 'ϳ', K: 'Κ', L: 'Λ', M: 'Μ', N: 'Ν',
			O: 'Ө', P: 'Ρ', Q: 'Ϙ', R: 'Я', S: 'Ѕ', T: 'Ƭ', U: 'Ʊ',
			V: 'Ѵ', W: 'Ш', X: 'Χ', Y: 'Ψ', Z: 'Ζ',
			a: 'α', b: 'в', c: 'ς', d: 'δ', e: 'ε', f: 'ғ', g: 'g', h: 'η',
			i: 'ι', j: 'ј', k: 'κ', l: 'λ', m: 'м', n: 'и', o: 'σ', p: 'ρ',
			q: 'φ', r: 'я', s: 'ѕ', t: 'т', u: 'υ', v: 'ν', w: 'ω', x: 'χ',
			y: 'γ', z: 'ζ'
		},
		mirrored: {
			A: '∀', B: '𐐒', C: 'Ↄ', D: '◖', E: 'Ǝ', F: 'Ⅎ', G: '⅁',
			H: 'H', I: 'I', J: 'ſ', K: '⋊', L: '⅃', M: 'W', N: 'N', O: 'O',
			P: 'Ԁ', Q: 'Ό', R: 'ᴚ', S: 'S', T: '⊥', U: '∩', V: 'Λ',
			W: 'M', X: 'X', Y: '⅄', Z: 'Z',
			a: 'ɐ', b: 'q', c: 'ɔ', d: 'p', e: 'ǝ', f: 'ɟ', g: 'ƃ',
			h: 'ɥ', i: 'ᴉ', j: 'ɾ', k: 'ʞ', l: 'ʃ', m: 'ɯ', n: 'u',
			o: 'o', p: 'd', q: 'b', r: 'ɹ', s: 's', t: 'ʇ', u: 'n',
			v: 'ʌ', w: 'ʍ', x: 'x', y: 'ʎ', z: 'z'
		},
		glitch: {
			A: 'ꮯ', B: 'Ꞗ', C: 'ꮯ', D: 'ꭷ', E: 'ꞓ', F: 'Ꞙ', G: 'ꞡ',
			H: 'ꞣ', I: 'ꟲ', J: 'ꞛ', K: 'Ꝁ', L: 'Ɬ', M: 'ꟸ', N: 'Ꞥ',
			O: 'Ꞩ', P: 'ꟼ', Q: 'Ꝗ', R: 'Ꞧ', S: 'Ꞩ', T: 'Ꞇ', U: 'ꞈ',
			V: 'ꞓ', W: 'Ɦ', X: 'Ꭓ', Y: 'Ʝ', Z: 'ꟿ',
			a: 'ꭺ', b: 'ɓ', c: 'ƈ', d: 'ɗ', e: 'ɇ', f: 'ƒ', g: 'ɠ',
			h: 'ɧ', i: 'ɨ', j: 'ʝ', k: 'ƙ', l: 'ꞎ', m: 'ɱ', n: 'ꞑ',
			o: 'ɵ', p: 'ƥ', q: 'ʠ', r: 'ʀ', s: 'ʂ', t: 'ƭ', u: 'ʋ',
			v: 'ʌ', w: 'ɯ', x: 'ҳ', y: 'ƴ', z: 'ƶ'
		},
		upside: {
			a: 'ɐ', b: 'q', c: 'ɔ', d: 'p', e: 'ǝ', f: 'ɟ',
			g: 'ƃ', h: 'ɥ', i: 'ı', j: 'ɾ', k: 'ʞ', l: 'l',
			m: 'ɯ', n: 'u', o: 'o', p: 'd', q: 'b', r: 'ɹ',
			s: 's', t: 'ʇ', u: 'n', v: 'ʌ', w: 'ʍ', x: 'x',
			y: 'ʎ', z: 'z', A: '∀', B: 'B', C: 'Ɔ', D: 'D',
			E: 'Ǝ', F: 'F', G: '⅁', H: 'H', I: 'I', J: 'ſ',
			K: 'K', L: '˥', M: 'W', N: 'N', O: 'O', P: 'Ԁ', Q: 'Q',
			R: 'R', S: 'S', T: '⊥', U: '∩', V: 'Λ', W: 'M', X: 'X',
			Y: '⅄', Z: 'Z'
		},
		wiggly: {
			T: 't̴', e: 'e̷', x: 'x̸', t: 't̷', E: 'E̴', d: 'd̶', i: 'i̵', o: 'o̶', r: 'r̷'
		},
		anchor: {
			T: 'Ⲏ', e: 'ҽ', x: '×', t: 'է', E: 'Ɛ', d: 'ժ', i: 'ì', o: 'օ', r: 'ɾ'
		},
		faux: {
			T: 'Г', e: 'э', x: 'х', t: 'т', E: 'Є', d: 'ↁ', i: 'і', o: 'о', r: 'ѓ'
		}
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