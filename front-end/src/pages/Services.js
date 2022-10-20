import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Gazlogo from "../images/Gaz.JPG";
import Vizlogo from "../images/Viz.JPG";
import Futeslogo from "../images/Futes.JPG";

import "./Services.css";

import Stack from '@mui/material/Stack';

import { createTheme, ThemeProvider } from '@mui/material/styles';

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

      <Stack direction={{ mobile: 'column', laptop: 'row' }} spacing={{ mobile: 3, desktop: 6}} justifyContent="center" mb={3}>
        {/* <Card sx={{ maxWidth: 400 }} lg={{maxWidth: 800}}> */}
        <Card sx={{
          width: {
            mobile: 250,
            tablet: 650,
            laptop: 300,
            desktop: 450
          },
          height: {
            mobile: 250,
            tablet: 650,
            laptop: 300,
            desktop: 450
          }
        }}>
          <CardActionArea>
            <CardMedia
              component="img"
              // height='200'
              sx={{
                height: {
                  mobile: 125,
                  tablet: 325,
                  laptop: 150,
                  desktop: 225
                }
              }}
              src={Vizlogo}
              alt="Vízszerelés logó"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Vízszerelés
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Víz és lefolyórendszerek, szaniterek - mosdó,- mosogató, - zuhanyzó, - kád, - wc, - bojler szerelése, javítása, cseréje.
                Új víz és lefolyó csőhálózatok kiépítése, kialakítása, szaniterek beépítése. Vízhálózati rendszerelemek kiépítése, karbantartása, szervízelése.
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>

        <Card sx={{
          width: {
            mobile: 250,
            tablet: 650,
            laptop: 300,
            desktop: 450
          },
          height: {
            mobile: 250,
            tablet: 650,
            laptop: 300,
            desktop: 450
          }
        }}>
          <CardActionArea>
            <CardMedia
              component="img"
              sx={{
                height: {
                  mobile: 125,
                  tablet: 325,
                  laptop: 150,
                  desktop: 225
                }
              }}
              src={Futeslogo}
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Fűtésszerelés
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Fűtésrendszer elemeinek: - radiátorok, - szelepek, - csapok, - szivattyúk és egyéb gépészeti elemek javítása, cseréje, kiépítése.
                Kazánok, fűtő készülékek javítása, szervízelése, karbantartása, tisztítása.
                Új fűtésrendszerek kiépítése, radiátoros, padlófűtés, fal és mennyezetfűtéses rendszerek kivitelezése, gépészeti és kéményrendszer kialakítása.
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>

        <Card sx={{
          width: {
            mobile: 250,
            tablet: 650,
            laptop: 300,
            desktop: 450
          },
          height: {
            mobile: 250,
            tablet: 650,
            laptop: 300,
            desktop: 450
          }
        }}>
          <CardActionArea>
            <CardMedia
              component="img"
              sx={{
                height: {
                  mobile: 125,
                  tablet: 325,
                  laptop: 150,
                  desktop: 225
                }
              }}
              //image="C:/Users/papda/OneDrive/Asztali gép/Projekt01/Node.js-React.js-RESTful-API/front-end/images/Gáz.JPG"
              //image='/front-end/src/pages/gaz.jpg'
              //image='https://www.ops-store.fr/upload/image/replique-h-k-416-a5-black-umarex-vfc-gbbr-p-image-155396-grande.png'
              src={Gazlogo}
              alt="Gázszerelés logó"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Gázszerelés
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Gázcsőhálózatok, gázelzáró csapok, gázbekötő csövek cseréje, szerelése, korszerűsítése.
                gázrendszerek tervezése terv ügyintézése, kivitelezése.
                Gázkészülékek, vízemelegítők, kazánok javítása, szerelése, cseréje, karbantartáse.
                Gáztűzhelyek garanciális beüzemelése.
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Stack>

      </ThemeProvider>
    </div>
  )
}

export default Services