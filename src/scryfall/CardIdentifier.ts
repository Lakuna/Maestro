/**
 * A card identifier.
 * @internal
 */
export type CardIdentifier =
	/* eslint-disable @typescript-eslint/naming-convention */
	| { readonly collector_number: string; readonly set: string }
	| { readonly id: string }
	| { readonly illustration_id: string }
	| { readonly mtgo_id: number }
	| { readonly multiverse_id: number }
	| { readonly name: string; readonly set: string }
	| { readonly name: string }
	| { readonly oracle_id: string };
/* eslint-enable @typescript-eslint/naming-convention */
