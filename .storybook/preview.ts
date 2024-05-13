import type { Preview } from "@storybook/react";
import { themes } from "@storybook/theming";
import DocumentationTemplate from "./templates/DocumentationTemplate.mdx";

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: "dark",
    },
    layout: "centered",
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)/i,
        date: /Date$/i,
      },
    },
    docs: {
      theme: themes.dark,
      page: DocumentationTemplate,
      controls: { exclude: [] },
    },
    options: {
      storySort: {
        method: "alphabetical",
      },
    },
  },
};

export default preview;
