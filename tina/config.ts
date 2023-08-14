import { defineConfig } from "tinacms";

const BRANCH = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";
const BASE_PATH = String(process.env.BASE_PATH ?? "");

const TINA_PUBLIC_CLIENT_ID = String(process.env.TINA_PUBLIC_CLIENT_ID ?? "");
const TINA_TOKEN = String(process.env.TINA_TOKEN ?? "");
const TINA_SEARCH_TOKEN = String(process.env.TINA_SEARCH_TOKEN ?? "");

export default defineConfig({
  branch: BRANCH,
  clientId: TINA_PUBLIC_CLIENT_ID,
  token: TINA_TOKEN,
  build: {
    publicFolder: "/",
    outputFolder: "admin",
    basePath: BASE_PATH,
  },
  media: {
    tina: {
      publicFolder: "/",
      mediaRoot: "assets/uploads",
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
        templates: [
          {
            name: "global",
            label: "Global Settings",
            fields: [
              {
                name: "layout",
                label: "Title",
                type: "string",
              },
            ],
          },
          {
            name: "nav",
            label: "Navigation Settings",
            fields: [
              {
                name: "layout",
                label: "Title",
                type: "string",
              },
            ],
          },
        ],
      },
      {
        name: "pages",
        label: "Pages",
        path: "_pages",
        ui: {
          filename: {
            readonly: true,
            slugify: (values) => {
              return `${values?.title?.toLowerCase().replace(/\s/g, "-")}`;
            },
          },
        },
        templates: [
          {
            name: "home",
            label: "Home Page",
            ui: {
              defaultItem: {
                title: "Home",
                layout: "home",
                permalink: "/",
              },
            },
            fields: [
              {
                name: "title",
                label: "Title",
                type: "string",
                isTitle: true,
                required: true,
              },
              {
                name: "layout",
                label: "Layout",
                type: "string",
              },
              {
                name: "permalink",
                label: "Permalink",
                type: "string",
              },
            ],
          },
          {
            name: "default",
            label: "Default Page",
            ui: {
              defaultItem: {
                layout: "default",
              },
            },
            fields: [
              {
                name: "title",
                label: "Title",
                type: "string",
                isTitle: true,
                required: true,
              },
              {
                name: "layout",
                label: "Layout",
                type: "string",
              },
              {
                name: "permalink",
                label: "Permalink",
                type: "string",
              },
            ],
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
        defaultItem: {
          layout: "default",
        },
        fields: [
          {
            name: "layout",
            label: "Layout",
            type: "string",
          },
          {
            name: "permalink",
            label: "Permalink",
            type: "string",
          },
          {
            name: "published",
            label: "Published",
            type: "boolean",
            required: true,
            description: "Should this be published",
          },
          {
            name: "title",
            label: "Title",
            type: "string",
            isTitle: true,
            required: true,
          },
          {
            name: "body",
            label: "Body",
            type: "rich-text",
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
