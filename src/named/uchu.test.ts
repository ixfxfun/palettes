import { named } from "@ixfx/palettes";
import { expect, test } from "vitest";
// biome-ignore lint/style/noNamespaceImport: <explanation>
import * as Uchu from "./uchu.js";

test("uchu", () => {
	const uchu = named.loadStringObjectPalette(Uchu.basicColourStrings);

	expect(uchu.length).toBe(27);

	expect(uchu.find(`gray`)).toBe(`oklch(84.68% 0.002 197.12)`);
	expect(uchu.find(`gray-base`)).toBe(`oklch(84.68% 0.002 197.12)`);
	expect(uchu.find(`gray-light`)).toBe(`oklch(95.57% 0.003 286.35)`);
	expect(uchu.find(`gray-dark`)).toBe(`oklch(63.12% 0.004 219.55)`);
});

test("uchu-expanded", () => {
	const uchu = named.loadStringObjectPalette(Uchu.expandedColourStrings);

	expect(uchu.length).toBe(83);

	expect(uchu.find(`pink`)).toBe(`oklch(82.23% 0.112 355.33)`);
	expect(uchu.find(`pink-5`)).toBe(`oklch(82.23% 0.112 355.33)`);

	expect(uchu.find(`pink-1`)).toBe(`oklch(95.8% 0.023 354.27)`);
	expect(uchu.find(`orange-5`)).toBe(`oklch(74.61% 0.171 51.56)`);
	expect(uchu.find(`yin-9`)).toBe(`oklch(25.11% 0.006 258.36)`);
});
