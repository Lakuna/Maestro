import { array, int, object, string, url } from "zod";

/**
 * An array of Magic datapoints as returned by the Scryfall API.
 * @see {@link https://scryfall.com/docs/api/catalogs}
 * @internal
 */
const catalog = object({
	/* eslint-disable @typescript-eslint/naming-convention */
	data: array(string()),
	total_values: int(),
	uri: url()
	/* eslint-enable @typescript-eslint/naming-convention */
});

export default catalog;
