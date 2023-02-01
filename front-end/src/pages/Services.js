import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Gazlogo from "../images/logos/gaznagy.JPG";
import Vizlogo from "../images/logos/viznagy3.JPG";
import Futeslogo from "../images/logos/futesnagy.JPG";
import Dugulaslogo from "../images/logos/dugulasnagy3.JPG";
import "./Services.css";
import Stack from "@mui/material/Stack";
import { ThemeProvider } from "@mui/material/styles";
import { Theme } from "../theme";
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';

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
        logo: Dugulaslogo,
        alt: "Duguláselhárítás logó",
        typography: "Mosogató, mosdó, WC, piszoár, padlóösszefolyó, zuhanytálca, kád, csatorna, stang, főgerinc, alapvezeték, klíma csővezeték, csatorna csövek duguláselhárítása."
    }
]

function Services() {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div className="services">
            <ThemeProvider theme={Theme}>
                <Stack direction={{ mobile: "column", desktop: "row" }}
                    spacing={{ mobile: 4, desktop: 4 }}
                    justifyContent="center"
                >
                    <Stack
                        direction={{ mobile: "column", tablet: "row" }}
                        spacing={{ mobile: 4, desktop: 4 }}
                        justifyContent="center"
                        width={{ desktop: "50%" }}
                    //alignItems="center" - függőlegesen is középre teszi őket, ezért nem egy horizontális felső vonalhoz illeszkedve kezdődtek a Card-ok eddig
                    >
                        {CardDataList1.map((val) => {
                            return (

                                /* <Card sx={{ maxWidth: 400 }} lg={{maxWidth: 800}}> */
                                <Card className="cardHover"
                                    onClick={handleOpen}
                                >
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            src={val.logo}
                                            alt={val.alt}

                                        />
                                    </CardActionArea>
                                </Card>
                            )
                        })}
                    </Stack>

                    <Stack
                        direction={{ mobile: "column", tablet: "row" }}
                        spacing={{ mobile: 4, desktop: 4 }}
                        justifyContent="center"
                        width={{ desktop: "50%" }}
                    //alignItems="center" - függőlegesen is középre teszi őket, ezért nem egy horizontális felős vonalhoz illeszkedve kezdődtek a Card-ok eddig
                    >
                        {CardDataList2.map((val) => {
                            return (
                                /* <Card sx={{ maxWidth: 400 }} lg={{maxWidth: 800}}> */
                                <Card
                                    className="cardHover"
                                // onClick={}
                                >
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"

                                            src={val.logo}
                                            alt={val.alt}
                                        />
                                    </CardActionArea>
                                </Card>
                            )
                        })}
                    </Stack>
                </Stack>

                {/* <Modal
        open={open}
        onClose={handleClose}
      >
        <Card className="cardModal">
                    <CardMedia
                        sx={{ height: 140 }}
                        image="/static/images/cards/contemplative-reptile.jpg"
                        title="green iguana"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Lizard
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Lizards are a widespread group of squamate reptiles, with over 6,000
                            species, ranging across all continents except Antarctica
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Share</Button>
                        <Button size="small">Learn More</Button>
                    </CardActions>
                </Card>
      </Modal> */}


            </ThemeProvider>
        </div>
    );
}

export default Services;
