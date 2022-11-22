import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Gazlogo from "../images/logos/Gaz.jpg";
import Vizlogo from "../images/logos/Viz.jpg";
import Futeslogo from "../images/logos/Futes.jpg";

import "./Services.css";

import Stack from "@mui/material/Stack";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import NotoSansBlack from "../fonts/NotoSans-Black.ttf";
import NotoSansItalic from "../fonts/NotoSans-Italic.ttf";
import { fontFamily } from "@mui/system";

const theme = createTheme({
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 768,
      laptop: 1024,
      desktop: 1440,
    },
  },
  typography: {
    fontFamily: "sans-serif",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'NotoSans';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: local('NotoSans'), local('NotoSans'), url(${NotoSansBlack}) format('ttf');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
      `,
    },
  },
});

var CardMaxWitdh_mobile = "100%";
var CardMaxWitdh_tablet = "100%";
var CardMaxWitdh_laptop = "100%";
var CardMaxWitdh_desktop = "100%";

var CardWidth_mobile = "100%";
var CardWidth_tablet = "100%";
var CardWidth_laptop = "100%";
var CardWidth_desktop = "100%";

var CardHeight_mobile = "100%";
var CardHeight_tablet = "100%";
var CardHeight_laptop = "100%";
var CardHeight_desktop = "100%";

var CardMediaHeight_mobile = "auto";
var CardMediaHeight_tablet = "auto";
var CardMediaHeight_laptop = "auto";
var CardMediaHeight_desktop = "auto";

var CardContentHeight_mobile = "auto";
var CardContentHeight_tablet = "auto";
var CardContentHeight_laptop = "auto";
var CardContentHeight_desktop = "auto";

var CardMediaMaxHeight_laptop = 250;
var CardMediaMaxHeight_desktop = 300;

const CardDataList1 = [
  {
    logo: Vizlogo,
    alt: "Vízszerelés logó",
    typography: "Víz és lefolyórendszerek, szaniterek - mosdó,- mosogató, -zuhanyzó, - kád, - wc, - bojler szerelése, javítása, cseréje. Új víz és lefolyó csőhálózatok kiépítése, kialakítása, szaniterek beépítése. Vízhálózati rendszerelemek kiépítése, karbantartása, szervízelése."
  },
  {
    logo: Futeslogo,
    alt: "Fűtésszerelés logó",
    typography: "Fűtésrendszer elemeinek: - radiátorok, - szelepek, - csapok, - szivattyúk és egyéb gépészeti elemek javítása, cseréje, kiépítése. Kazánok, fűtő készülékek javítása, szervízelése, karbantartása, tisztítása. Új fűtésrendszerek kiépítése, radiátoros, padlófűtés, fal és mennyezetfűtéses rendszerek kivitelezése, gépészeti és kéményrendszer kialakítása."
  }
]

const CardDataList2 = [
  {
    logo: Gazlogo,
    alt: "Gázszerelés logó",
    typography: "Gázcsőhálózatok, gázelzáró csapok, gázbekötő csövek cseréje, szerelése, korszerűsítése. gázrendszerek tervezése terv ügyintézése, kivitelezése. Gázkészülékek, vízemelegítők, kazánok javítása, szerelése, cseréje, karbantartáse. Gáztűzhelyek garanciális beüzemelése."
  },
  {
    logo: Gazlogo,
    alt: "Duguláselhárítás logó",
    typography: "Mosogató, mosdó, WC, piszoár, padlóösszefolyó, zuhanytálca, kád, csatorna, stang, főgerinc, alapvezeték, klíma csővezeték, csatorna csövek duguláselhárítása."
  }
]

function Services() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Stack direction={{mobile: "column", desktop: "row" }}
          spacing={{ mobile: 4, desktop: 4 }}
          justifyContent="center"
        >
          <Stack
            direction={{ mobile: "column", tablet: "row" }}
            spacing={{ mobile: 4, desktop: 4 }}
            justifyContent="center"
            width={{desktop: "50%"}}
          //alignItems="center" - függőlegesen is középre teszi őket, ezért nem egy horizontális felős vonalhoz illeszkedve kezdődtek a Card-ok eddig
          >
            {CardDataList1.map((val) => {
              return (
                /* <Card sx={{ maxWidth: 400 }} lg={{maxWidth: 800}}> */
                <Card
                  sx={{ //miért jó, hogy van maxWidth is meg width is?
                    maxWidth: {
                      mobile: CardMaxWitdh_mobile,
                      tablet: CardMaxWitdh_tablet,
                      laptop: CardMaxWitdh_laptop,
                      desktop: CardMaxWitdh_desktop
                    },
                    width: {
                      mobile: CardWidth_mobile,
                      tablet: CardWidth_tablet,
                      laptop: CardWidth_laptop,
                      desktop: CardWidth_desktop
                    },
                    height: {
                      mobile: CardHeight_mobile,
                      tablet: CardHeight_tablet,
                      laptop: CardHeight_laptop,
                      desktop: CardHeight_desktop
                    }
                  }}
                >
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      sx={{
                        maxHeight: {
                          laptop: CardMediaMaxHeight_laptop,
                          desktop: CardMediaMaxHeight_desktop
                        },
                        height: {
                          mobile: CardMediaHeight_mobile,
                          tablet: CardMediaHeight_tablet,
                          laptop: CardMediaHeight_laptop,
                          desktop: CardMediaHeight_desktop
                        }
                      }}
                      src={val.logo}
                      alt={val.alt}
                    />
                    <CardContent
                      sx={{
                        height: {
                          mobile: CardContentHeight_mobile,
                          tablet: CardContentHeight_tablet,
                          laptop: CardContentHeight_laptop,
                          desktop: CardContentHeight_desktop
                        },
                      }}>
                      <Typography
                        variant="h6"
                        color="text.secondary"
                        textAlign="center"
                        display="flex"
                        alignItems="center"
                      >
                        {val.typography}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              )
            })}
          </Stack>

          <Stack
            direction={{ mobile: "column", tablet: "row" }}
            spacing={{ mobile: 4, desktop: 4 }}
            justifyContent="center"
            width={{desktop: "50%"}}
          //alignItems="center" - függőlegesen is középre teszi őket, ezért nem egy horizontális felős vonalhoz illeszkedve kezdődtek a Card-ok eddig
          >
            {CardDataList2.map((val) => {
              return (
                /* <Card sx={{ maxWidth: 400 }} lg={{maxWidth: 800}}> */
                <Card
                  sx={{ //miért jó, hogy van maxWidth is meg width is?
                    maxWidth: {
                      mobile: CardMaxWitdh_mobile,
                      tablet: CardMaxWitdh_tablet,
                      laptop: CardMaxWitdh_laptop,
                      desktop: CardMaxWitdh_desktop
                    },
                    width: {
                      mobile: CardWidth_mobile,
                      tablet: CardWidth_tablet,
                      laptop: CardWidth_laptop,
                      desktop: CardWidth_desktop
                    },
                    height: {
                      mobile: CardHeight_mobile,
                      tablet: CardHeight_tablet,
                      laptop: CardHeight_laptop,
                      desktop: CardHeight_desktop
                    }
                  }}
                >
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      sx={{
                        maxHeight: {
                          laptop: CardMediaMaxHeight_laptop,
                          desktop: CardMediaMaxHeight_desktop
                        },
                        height: {
                          mobile: CardMediaHeight_mobile,
                          tablet: CardMediaHeight_tablet,
                          laptop: CardMediaHeight_laptop,
                          desktop: CardMediaHeight_desktop
                        },
                      }}
                      src={val.logo}
                      alt={val.alt}
                    />
                    <CardContent
                      sx={{
                        height: {
                          mobile: CardContentHeight_mobile,
                          tablet: CardContentHeight_tablet,
                          laptop: CardContentHeight_laptop,
                          desktop: CardContentHeight_desktop
                        },
                      }}>
                      <Typography
                        variant="h6"
                        color="text.secondary"
                        textAlign="center"
                        display="flex"
                        alignItems="center"
                      >
                        {val.typography}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              )
            })}
          </Stack>
        </Stack>
      </ThemeProvider>
    </div>
  );
}

export default Services;
