import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./src/sanity/schema";

export default defineConfig({
	name: "default",
	title: "我的个人博客",

	projectId: "pc4vypln",
	dataset: "production",

	plugins: [structureTool(), visionTool()],

	schema: {
		types: schemaTypes,
	},

	document: {
		actions: (prev, _context) => {
			return prev.filter(({ action }) => action !== "unpublish");
		},
	},
});
