"use client";

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { SINGLETONS, schemaTypes } from "./src/sanity/schemaTypes";
import { structure } from "./src/sanity/structure";

const singletons = new Set<string>(SINGLETONS);

export default defineConfig({
  name: "default",
  title: "StuduRoj",
  basePath: "/studio",
  projectId,
  dataset,
  plugins: [structureTool({ structure }), visionTool({ defaultApiVersion: apiVersion })],
  schema: {
    types: schemaTypes,
    // Hide singletons from "create new document" menus.
    templates: (templates) => templates.filter(({ schemaType }) => !singletons.has(schemaType)),
  },
  document: {
    actions: (actions, { schemaType }) =>
      singletons.has(schemaType) ? actions.filter(({ action }) => action && ["publish", "discardChanges", "restore"].includes(action)) : actions,
  },
});
