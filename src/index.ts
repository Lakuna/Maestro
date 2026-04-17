import getDeck from "./moxfield/getDeck.js";

const [, , id] = process.argv;
if (!id) {
	throw new Error("Missing ID.");
}

// eslint-disable-next-line no-console
console.log(await getDeck(id));
