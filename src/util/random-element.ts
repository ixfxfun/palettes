export const randomElement = <V>(array: ArrayLike<V>): V => {
	const v = array[Math.floor(Math.random() * array.length)];
	if (!v) throw new Error(`Array empty`);
	return v;
};
