import type { ComponentData } from "./index.ts";

export function processText(
	content: (string | ComponentData)[],
): (string | ComponentData)[] {
	return content.map((item) => {
		if (typeof item === "string") {
			let processedText = item;

			// modal triggers: #modal_trigger(text | id)
			processedText = processedText.replace(
				/#modal_trigger\(([^|]+?)\s*\|\s*([^)]+)\)/g,
				(match, text, id) => {
					// This would need to return ComponentData, but for now return string
					return `<span data-modal-trigger="${id}">${text}</span>`;
				},
			);
			// tooltips: #tooltip(text | tooltip_text)
			processedText = processedText.replace(
				/#tooltip\(([^|]+?)\s*\|\s*([^)]+)\)/g,
				(match, text, tooltipText) => {
					return `<span title="${tooltipText}">${text}</span>`;
				},
			);
			// external links: #external_link(text | url)
			processedText = processedText.replace(
				/#external_link\(([^|]+?)\s*\|\s*([^)]+)\)/g,
				(match, text, url) => {
					return `<a href="${url}" target="_blank" rel="noopener noreferrer">${text}</a>`;
				},
			);

			return processedText;
		}
		return item;
	});
}

// Keep the old string version for backward compatibility
export function processTextString(text: string): string {
	if (typeof text !== "string") return text;
	let processedText = text;

	// modal triggers: #modal_trigger(text | id)
	processedText = processedText.replace(
		/#modal_trigger\(([^|]+?)\s*\|\s*([^)]+)\)/g,
		'<span data-modal-trigger="$2">$1</span>',
	);
	// tooltips: #tooltip(text | tooltip_text)
	processedText = processedText.replace(
		/#tooltip\(([^|]+?)\s*\|\s*([^)]+)\)/g,
		'<span title="$2">$1</span>',
	);
	// external links: #external_link(text | url)
	processedText = processedText.replace(
		/#external_link\(([^|]+?)\s*\|\s*([^)]+)\)/g,
		'<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>',
	);

	return processedText;
}

export function processObjectText(obj: any): any {
	if (typeof obj === "string") return processText(obj);
	if (Array.isArray(obj)) return obj.map((item) => processObjectText(item));

	if (obj && typeof obj === "object") {
		const processed: any = {};
		for (const [key, value] of Object.entries(obj)) {
			processed[key] = processObjectText(value);
		}
		return processed;
	}

	return obj;
}
