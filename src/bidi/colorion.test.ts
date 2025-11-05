import { bidi } from "@ixfx/palettes";
import { expect, test } from "vitest";

test("colorion", () => {
	expect(bidi.getLength(`colorion-pair`)).toBe(81);

	expect(bidi.getHexByIndex(0, `colorion-pair`)).toStrictEqual([
		`#50586C`,
		`#DCE2F0`,
	]);
	expect(bidi.getHexByIndex(80, `colorion-pair`)).toStrictEqual([
		`#DAA03D`,
		`#616247`,
	]);
});
