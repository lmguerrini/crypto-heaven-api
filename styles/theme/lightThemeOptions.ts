import { createTheme } from "@mui/material/styles";

const lightThemeOptions = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#3F51B5",
        },
        text: {
            primary: "rgba(0, 0, 0, 0,87)",
            secondary: "rgba(0, 0, 0, 0.6)",
        },
        background: {
            paper: "#FFFFFF",
        },
    },
    components: {
        MuiTypography: {
            styleOverrides: {
                body1: {
                    fontFamily: "Roboto",
                    fontStyle: "normal",
                    fontWeight: "normal",
                    fontSize: "16px",
                    lineHeight: "150%",
                },
                body2: {
                    fontFamily: "Roboto",
                    fontStyle: "normal",
                    fontWeight: "normal",
                    fontSize: "14px",
                    lineHeight: "143%",
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                outlined: {
                    "&:hover, &:focus": {
                        backgroundColor: "rgba(63, 81, 181, 0.08)",
                    },
                },
            },
        },
    },
});

export default lightThemeOptions;
