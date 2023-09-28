export const capitalizeWords = (words) => {
	const splittedString = words.split(" ");

	let stringAccumulator = "";
	for (let i = 0; i < splittedString.length; i++) {
		stringAccumulator +=
			splittedString[i].charAt(0).toUpperCase() +
			splittedString[i].slice(1) +
			" ";
	}

	return stringAccumulator;
};
