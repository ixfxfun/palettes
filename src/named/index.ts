import type { NamedPaletteOptions } from "../types.js";

export const unpackStringObjectPalette = (obj: object) => {
	const map = new Map<string, string>();
	const add = (o: object, prefix: string) => {
		for (const [key, value] of Object.entries(o)) {
			if (typeof value === "string") {
				const k = prefix + key;
				map.set(k, value);
			} else {
				add(value, `${prefix}${key}-`);
			}
		}
	};

	add(obj, ``);
	return map;
};

const findInMap = (
	map: Map<string, string>,
	name: string,
	fallbackSuffixes: string[] = [`base`, `5`],
	fallbackColour?: string,
) => {
	if (map.has(name)) return map.get(name);
	for (const s of fallbackSuffixes) {
		const key = `${name}-${s}`;
		if (map.has(key)) return map.get(key);
	}
	return fallbackColour;
};

export const loadStringObjectPalette = (
	stringObjectPalette: object,
	options: Partial<NamedPaletteOptions> = {},
) => {
	const map = unpackStringObjectPalette(stringObjectPalette);
	const fallbackSuffixesDefault = options.fallbackSuffixesDefault ?? [
		`base`,
		`5`,
	];
	return {
		get length() {
			return [...map.keys()].length;
		},
		find: (
			name: string,
			fallbackSuffixes = fallbackSuffixesDefault,
			fallbackColour?: string,
		) => findInMap(map, name, fallbackSuffixes, fallbackColour),
	};
};

// const cachedUnpackedPalettes = new Map<string, Map<string, string>>();

// export const getColourStringPalettes = (palette: Palettes = `uchu`) => {
// 	let c = cachedUnpackedPalettes.get(palette);
// 	if (c) {
// 		return c;
// 	}
// 	switch (palette) {
// 		case `uchu-expanded`:
// 			c = unpackStringObjectPalette(Uchu.expandedColourStrings);
// 			break;
// 		case `uchu`:
// 			c = unpackStringObjectPalette(Uchu.basicColourStrings);
// 			break;
// 		default:
// 			throw new Error(`Unknown palette: '${palette}'`);
// 	}
// 	cachedUnpackedPalettes.set(palette, c);
// 	return c;
// };
