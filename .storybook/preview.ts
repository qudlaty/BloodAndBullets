import type { Preview } from "@storybook/react";
import { themes } from "@storybook/theming";

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: "dark",
    },
    layout: "centered",
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      theme: themes.dark,
    },
    options: {
      storySort: {
        method: "alphabetical",
      },
    },
  },
};

export default preview;
