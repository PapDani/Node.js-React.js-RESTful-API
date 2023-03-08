import { createTheme } from "@mui/material/styles";

export const Theme = createTheme({
        breakpoints: {
          values: { //vajon ez zavarna be az imagelistnek? hogy values?
            mobile: 0,
            tablet: 900, //(chromeban tablet 768px) 900 ra áítrva 820 ról a fejlécben lévő 3 contact miatt (új design)
            laptop: 1024,
            desktop: 1440
          },
        },
        palette: {
          primary: {
            light: "#ffffff",
            main: "#ffffff",
            dark: "#ffffff",
            semiTransparent: "rgba(0,0,0,0.6)"
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
            // primary: "rgba(255,255,255,0.3)" átlátszó fehér, facebook logónál fent a border.
            primary: "rgba(62, 193, 188, 1)"
          },
          action: {
            focus: "rgba(255,0,0,1)"
          }
        }
});