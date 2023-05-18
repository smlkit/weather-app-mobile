import { extendTheme } from "native-base";

const config: Parameters<typeof extendTheme>[0] = {
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  components: {
    Button: {
      baseStyle: {
        rounded: "md",
      },
      defaultProps: {
        backgroundColor: "emerald.600",
        borderRadius: "full",
        paddingLeft: "30px",
        paddingRight: "30px",
      },
    },
    Text: {
      baseStyle: {
        _light: { color: "muted.500" },
        _dark: { color: "muted.500" },
      },
    },
    View: {
      variants: {
        page: {
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "muted.200",
        },
      },
    },
    Heading: {
      baseStyle: () => {
        return {
          _light: { color: "red.500", size: "3xl" },
          _dark: { color: "emerald.600", size: "3xl" },
        };
      },
      Button: {
        baseStyle: () => {
          return {
            _light: { backgrounColor: "red.500" },
            _dark: { backgroundColor: "blue.500" },
          };
        },
      },
    },
  },
};

export const customTheme = extendTheme(config);
