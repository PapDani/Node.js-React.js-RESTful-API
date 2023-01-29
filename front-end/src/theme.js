import { createTheme, ThemeProvider } from "@mui/material/styles";

export const Theme = createTheme({
        breakpoints: {
          values: {
            mobile: 0,
            tablet: 768,
            laptop: 1024,
            desktop: 1440
          },
        },
        palette: {
          primary: {
            light: "#ffffff",
            main: "#ffffff",
            dark: "#ffffff"
          },
          secondary: {
            light: "rgb(255, 193, 4)",
            main: "rgb(255, 193, 4)",
            dark: "rgb(255, 193, 4)"
          },
          text: {
            primary: "#ffffff",
            secondary: "rgb(255, 193, 4)"
          },
          divider: {
            primary: "rgba(255,255,255,0.3)"
          },
          action: {
            focus: "rgba(255,0,0,1)"
          },
        }
});