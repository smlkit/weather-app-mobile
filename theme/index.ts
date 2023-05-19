import { extendTheme } from "native-base";

const config: Parameters<typeof extendTheme>[0] = {
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  components: {
    Button: {
      defaultProps: {
        borderRadius: "full",
        paddingLeft: "30px",
        paddingRight: "30px",
        backgroundColor: "blue.500",
      },
    },
    Text: {
      baseStyle: {
        _light: { color: "blue.100" },
        _dark: { color: "coolGray.300" },
      },
    },
    View: {
      baseStyle: {
        _light: { backgroundColor: "blue.300" },
        _dark: { backgroundColor: "coolGray.700" },
      },
      variants: {
        page: {
          flexGrow: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "muted.200",
        },
      },
    },
    ScrollView: {
      variants: {
        page: {
          flexGrow: 1,

          _contentContainerStyle: {
            flexGrow: 1,
            alignItems: "center",
            justifyContent: "center",
          },
        },
      },
    },
    Heading: {
      baseStyle: () => {
        return {
          _light: { color: "coolGray.50", size: "3xl" },
          _dark: { color: "coolGray.100", size: "3xl" },
        };
      },
      Button: {
        baseStyle: () => {
          return {
            _light: { backgrounColor: "coolGray.700", color: "muted.300" },
            _dark: { backgroundColor: "coolGray.400", color: "muted.700" },
          };
        },
      },
      SimpleLineIcons: {
        baseStyle: {
          _light: { color: "coolGray.200" },
          _dark: { color: "coolGray.700" },
        },
      },
    },
  },
};

export const customTheme = extendTheme(config);
