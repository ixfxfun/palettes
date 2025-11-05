import type { Palettes } from "../types.js";
import { randomElement } from "../util/random-element.js";
// import { hexStringPairs as colorionHexStringPairs } from "./colorion.js";
// import { hexStringPairs as designWizHexStringPairs } from "./design-wizard.js";

/**
 * Parse a string-based palette.
 * Each array item is expected to be the colours of the palette, separated by spaces.
 *
 * Example input:
 * ```
 * [` #50586C #DCE2F0`,` #815854 #F9EBDE`]
 * ```
 *
 * Output:
 * ```
 * [
 *  [ `#50586C`,  `#DCE2F0` ],
 *  [ `#815854`, `#F9EBDE` ]
 * ]
 * ```
 *
 * @param palettes
 * @returns
 */
export const unpackStringBasedPalettes = (palettes: string[]) => {
	return palettes.map((p) =>
		p
			.trim()
			.split(` `)
			.map((c) => c.trim()),
	);
};

const cachedUnpackedPalettes = new Map<string, string[][]>();

export const getHexPalettes = (palette: Palettes = `colorion-pair`) => {
	let c = cachedUnpackedPalettes.get(palette);
	if (c) {
		return c;
	}
	switch (palette) {
		case `designwiz-pair`:
			c = unpackStringBasedPalettes(designWizHexStringPairs);
			break;
		case `colorion-pair`:
			c = unpackStringBasedPalettes(colorionHexStringPairs);
			break;
		default:
			throw new Error(`Unknown palette: '${palette}'`);
	}
	cachedUnpackedPalettes.set(palette, c);
	return c;
};

/**
 * Returns a pair of hexdecimal-formatted colours that go well together
 *
 * Palettes:
 * `colorion-pair`: https://2colors.colorion.co/ (default)
 * @returns
 */
export const getRandomHexPair = (
	paletteName: Palettes = `colorion-pair`,
): [a: string, b: string] => {
	const palettes = getHexPalettes(paletteName);
	const palette = randomElement(palettes);

	if (palette.length === 2) {
		return palette as [a: string, b: string];
	}
	if (palette.length < 2) {
		throw new Error(`Palette length less than two`);
	}
	return [palette[0], palette[1]] as [a: string, b: string];
};

export const getLength = (paletteName: Palettes = `colorion-pair`) => {
	const palettes = getHexPalettes(paletteName);
	return palettes.length;
};

export const getHexByIndex = (
	index: number,
	paletteName: Palettes = `colorion-pair`,
) => {
	const palettes = getHexPalettes(paletteName);
	if (index < 0) throw new Error(`Param 'index' should be at least zero`);
	if (index >= palettes.length)
		throw new Error(
			`Param 'index' should be within length of palette (${palettes.length})`,
		);
	return palettes[index] as string[];
};
