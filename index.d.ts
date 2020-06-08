declare module 'initials' {
	type NameOrNames = string | string[];

	type ParsedNames = {name: string, initials: string};

	interface Options {
		existing: {
			[name: string]: string
		}
	}

	function initials(nameOrNames: NameOrNames, options?: Options): string | string[];

	export function find(name: string): string;

	export function parse(name: string): ParsedNames | undefined;

	export function addTo(name: string): string | undefined;

	export default initials;
}
