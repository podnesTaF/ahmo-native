import {extendTheme, ITheme} from "native-base";

export const theme: ITheme = extendTheme({
    colors: {
        // Add new color
        primary: {
            50: '#E3F2F9',
            100: '#C5E4F3',
            200: '#A2D4EC',
            300: '#B885F4',
            400: '#47A9DA',
            500: '#484153',
            600: '#007AB8',
            700: '#120428',
            800: '#005885',
            900: '#1A1E28',
        },
        secondary: {
            500: '#23B1D0',
            600: '#F3FB8C',
            700: '#810984',
        },
        warning: {
            500: '#FFC700',
        },
        success: {
            500: '#08EA62',
        },
        // Redefining only one shade, rest of the color will remain same.
        amber: {
            400: '#d97706',
        },
    },
    fontConfig: {
        QuickSand: {
            400: {
                normal: "Quicksand-Regular",
            },
            500: {
              normal: "Quicksand-Medium",
            },
            700: {
                normal: "Quicksand-Bold",
            }
        }
    },
    fonts: {
        heading: "Quicksand-Bold",
        body: "Quicksand-Medium",
        mono: "Quicksand-Medium",
    },
    config: {
        // Changing initialColorMode to 'dark'
        initialColorMode: 'dark',
    },
});
