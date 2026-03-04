export * from "./getDecapCollection.ts";
export * from "./getDecapConfig.ts";
export * from "./getDecapPage.ts";
export * from "./inlineComponentProcessor.ts";

export interface ComponentData {
	type: string;
	text: string;
	props?: Record<string, any>;
}
