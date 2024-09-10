import { Button, createTheme, Input, rem } from "@mantine/core";
import inputVariantStyles from "./InputVariants.module.css";
import buttonVariantStyles from "./ButtonVariants.module.css";

export const theme = createTheme({
  // adding and/or overriding variants of commonly used components
  components: {
    Input: Input.extend({ classNames: inputVariantStyles }),
    Button: Button.extend({ classNames: buttonVariantStyles }),
  },
  // color theme
  colors: {
    primary: [
      "#E5F0FF",
      "#C3DDFF",
      "#8AB7F4",
      "#437AC4",
      "#25528F",
      "#10376C",
      "#09254B",
      "#09254B",
      "#09254B",
      "#09254B",
    ],
    neutral: [
      "#F9FCFF",
      "#E7EFF7",
      "#C9D8E9",
      "#AEBAC9",
      "#78899F",
      "#45566B",
      "#141C28",
      "#141C28",
      "#141C28",
      "#141C28",
    ],
    secondary: [
      "#F1FFFF",
      "#E3FEFF",
      "#BEF5F5",
      "#7AEFF0",
      "#34C7C9",
      "#199697",
      "#066162",
      "#066162",
      "#066162",
      "#066162",
    ],
    accentGreen: [
      "#EBFFF6",
      "#CBFDE5",
      "#9DF6CC",
      "#78E4B0",
      "#3FC082",
      "#1D8754",
      "#0D4F2F",
      "#0D4F2F",
      "#0D4F2F",
      "#0D4F2F",
    ],
    accentYellow: [
      "#FFF9E5",
      "#FDF0C4",
      "#F9DD7E",
      "#F5C521",
      "#CDA313",
      "#9F7D0B",
      "#5E4A04",
      "#5E4A04",
      "#5E4A04",
      "#5E4A04",
    ],
    accentRed: [
      "#FFE8EC",
      "#FFACBB",
      "#FC6983",
      "#E61D41",
      "#9C0923",
      "#710619",
      "#4A0310",
      "#4A0310",
      "#4A0310",
      "#4A0310",
    ],
  },

  primaryColor: "primary",

  // Text component
  fontFamily: "Inter, DM Sans",
  fontFamilyMonospace: "DM Sans, Inter",
  fontSizes: {
    textSm: rem(14),
    textReg: rem(16),
    textLg: rem(18),
  },

  // Title component
  headings: {
    fontFamily: "DM Sans, Inter",
    fontWeight: "700",
    sizes: {
      h1: { fontSize: rem(36) },
      h2: { fontSize: rem(30) },
      h3: { fontSize: rem(24) },
      h4: { fontSize: rem(20) },
      h5: { fontSize: rem(20), fontWeight: "400" }, // sub heading
      h6: { fontSize: rem(20), fontWeight: "400" }, // sub title
    },
  },
});
