import { defineConfig } from "tinacms";

const BRANCH = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";
const TINA_PUBLIC_CLIENT_ID = String(process.env.TINA_PUBLIC_CLIENT_ID ?? "");
const TINA_TOKEN = String(process.env.TINA_TOKEN ?? "");
const TINA_SEARCH_TOKEN = String(process.env.TINA_SEARCH_TOKEN ?? "");

export default defineConfig({
  branch: BRANCH,
  clientId: TINA_PUBLIC_CLIENT_ID,
  token: TINA_TOKEN,
  build: {
    outputFolder: "admin",
    publicFolder: "/",
    basePath: "aidens-jekyll-boilerplate",
  },
  media: {
    tina: {
      publicFolder: "/",
      mediaRoot: "uploads",
    },
  },
  schema: {
    collections: [
      {
        name: "settings",
        label: "Settings",
        path: "_settings",
        ui: {
          // Don't allow editors to create new settings items
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
          },
        ],
      },
      {
        name: "post",
        label: "Posts",
        path: "_posts",
        ui: {
          // Take the title, slugify it, prefix with current date for Jekyll to find
          // Source: https://dev.to/huwfulcher/how-to-integrate-tinacms-with-jekyll-1m6j
          filename: {
            readonly: false,
            slugify: (values) => {
              const date = new Date();
              const day = date.getDate();
              const month = date.getMonth() + 1;
              const year = date.getFullYear();
              let currentDate = `${year}-${month}-${day}`;
              return `${currentDate}-${values?.title
                ?.toLowerCase()
                .replace(/ /g, "-")}`;
            },
          },
        },
        fields: [
          {
            type: "string",
            name: "layout",
            label: "Layout",
          },
          {
            type: "string",
            name: "permalink",
            label: "Permalink",
          },
          {
            type: "boolean",
            name: "published",
            label: "Published",
            required: true,
            description: "Should this be published",
          },
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
    ],
  },
  search: {
    tina: {
      indexerToken: TINA_SEARCH_TOKEN,
      stopwordLanguages: ["eng"],
    },
    indexBatchSize: 100,
    maxSearchIndexFieldLength: 100,
  },
});
