import { boolean, int, iso, nullish, object, optional } from "zod";

/**
 * Discord thread metadata.
 * @see {@link https://docs.discord.com/developers/resources/channel#thread-metadata-object}
 * @internal
 */
const threadMetadata = object({
	/* eslint-disable @typescript-eslint/naming-convention */
	archive_timestamp: iso.datetime({ offset: true }),
	archived: boolean(),
	auto_archive_duration: int(),
	create_timestamp: nullish(iso.datetime({ offset: true })),
	invitable: optional(boolean()),
	locked: boolean()
	/* eslint-enable @typescript-eslint/naming-convention */
});

export default threadMetadata;
