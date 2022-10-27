import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Gazlogo from "../images/Gaz.JPG";
import Vizlogo from "../images/Viz.JPG";
import Futeslogo from "../images/Futes.JPG";

import "./Services.css";

import Stack from "@mui/material/Stack";

import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 768,
      laptop: 1024,
      desktop: 1440,
    },
  },
});

function Services() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Stack
          direction={{ mobile: "column", laptop: "row" }}
          spacing={{ mobile: 3, desktop: 6 }}
          mb={3}
          justifyContent="center"
          alignItems="center"
        >
          {/* <Card sx={{ maxWidth: 400 }} lg={{maxWidth: 800}}> */}
          <Card
            sx={{
              maxWidth: {
                mobile: "100%",
                tablet: 650,
                laptop: 450,
                desktop: 450,
              },
              width: {
                mobile: "100%",
                tablet: 650,
                laptop: 450,
                desktop: 450,
              },
            }}
          >
            <CardActionArea>
              <CardMedia
                component="img"
                // height='200'
                sx={{
                  height: {
                    mobile: 250,
                    tablet: 325,
                    laptop: 225,
                    desktop: 225,
                  },
                }}
                src={Vizlogo}
                alt="Vízszerelés logó"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Vízszerelés
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    height: {
                      mobile: "auto",
                      tablet: "auto",
                      laptop: 225,
                      desktop: 225,
                    },
                  }}
                >
                  Víz és lefolyórendszerek, szaniterek - mosdó,- mosogató, -
                  zuhanyzó, - kád, - wc, - bojler szerelése, javítása, cseréje.
                  Új víz és lefolyó csőhálózatok kiépítése, kialakítása,
                  szaniterek beépítése. Vízhálózati rendszerelemek kiépítése,
                  karbantartása, szervízelése.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>

          <Card
            sx={{
              maxWidth: {
                mobile: "100%",
                tablet: 650,
                laptop: 450,
                desktop: 450,
              },
              width: {
                mobile: "100%",
                tablet: 650,
                laptop: 450,
                desktop: 450,
              },
            }}
          >
            <CardActionArea>
              <CardMedia
                component="img"
                sx={{
                  height: {
                    mobile: 250,
                    tablet: 325,
                    laptop: 225,
                    desktop: 225,
                  },
                }}
                src={Futeslogo}
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Fűtésszerelés
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    height: {
                      mobile: "auto",
                      tablet: "auto",
                      laptop: 225,
                      desktop: 225,
                    },
                  }}
                >
                  Fűtésrendszer elemeinek: - radiátorok, - szelepek, - csapok, -
                  szivattyúk és egyéb gépészeti elemek javítása, cseréje,
                  kiépítése. Kazánok, fűtő készülékek javítása, szervízelése,
                  karbantartása, tisztítása. Új fűtésrendszerek kiépítése,
                  radiátoros, padlófűtés, fal és mennyezetfűtéses rendszerek
                  kivitelezése, gépészeti és kéményrendszer kialakítása.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>

          <Card
            sx={{
              maxWidth: {
                mobile: "100%",
                tablet: 650,
                laptop: 450,
                desktop: 450,
              },
              width: {
                mobile: "100%",
                tablet: 650,
                laptop: 450,
                desktop: 450,
              },
            }}
          >
            <CardActionArea>
              <CardMedia
                component="img"
                sx={{
                  height: {
                    mobile: 250,
                    tablet: 325,
                    laptop: 225,
                    desktop: 225,
                  },
                }}
                src={Gazlogo}
                alt="Gázszerelés logó"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Gázszerelés
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    height: {
                      mobile: "auto",
                      tablet: "auto",
                      laptop: 225,
                      desktop: 225,
                    },
                  }}
                >
                  Gázcsőhálózatok, gázelzáró csapok, gázbekötő csövek cseréje,
                  szerelése, korszerűsítése. gázrendszerek tervezése terv
                  ügyintézése, kivitelezése. Gázkészülékek, vízemelegítők,
                  kazánok javítása, szerelése, cseréje, karbantartáse.
                  Gáztűzhelyek garanciális beüzemelése.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Stack>
      </ThemeProvider>
    </div>
  );
}

export default Services;
