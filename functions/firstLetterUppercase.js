export function firstLetterUppercase(str) {
	let newString = str.split("").reduce((prev, curr, i) => {
		if (i === 0 || (prev[prev.length - 1] === " " && curr !== " ")) {
			prev += curr.toUpperCase();
		} else {
			prev += curr;
		}

		return prev;
	}, "");

	return newString;
}
