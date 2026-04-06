import { int, iso, object, string, url, uuid } from "zod";

/**
 * Information about a Scryfall bulk data file.
 * @see {@link https://scryfall.com/docs/api/bulk-data | Bulk Data Files}
 * @internal
 */
const bulkData = object({
	/* eslint-disable @typescript-eslint/naming-convention */
	content_encoding: string(),
	content_type: string(),
	description: string(),
	download_uri: url(),
	id: uuid(),
	name: string(),
	size: int(),
	type: string(),
	updated_at: iso.datetime({ offset: true }),
	uri: url()
	/* eslint-enable @typescript-eslint/naming-convention */
});

export default bulkData;
