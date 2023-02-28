import * as React from "react";
import Gazlogo from "../../images/logos/gaznagy.JPG";
import Vizlogo from "../../images/logos/viznagy3.JPG";
import Futeslogo from "../../images/logos/futesnagy.JPG";
import Dugulaslogo from "../../images/logos/dugulasnagy3.JPG";
import "./style.css";
import { ThemeProvider } from "@mui/material/styles";
import { Theme } from "../../theme";
import Card from "../../components/Card/Card";


const CardDataList1 = [
    {
        logo: Vizlogo,
        heading: "Vízszerelés",
        alt: "Vízszerelés logó",
        typography: "Víz és lefolyórendszerek, szaniterek - mosdó,- mosogató, -zuhanyzó, - kád, - wc, - bojler szerelése, javítása, cseréje. Új víz és lefolyó csőhálózatok kiépítése, kialakítása, szaniterek beépítése. Vízhálózati rendszerelemek kiépítése, karbantartása, szervízelése."
    },
    {
        logo: Futeslogo,
        heading: "Fűtésszerelés",
        alt: "Fűtésszerelés logó",
        typography: "Fűtésrendszer elemeinek: - radiátorok, - szelepek, - csapok, - szivattyúk és egyéb gépészeti elemek javítása, cseréje, kiépítése. Kazánok, fűtő készülékek javítása, szervízelése, karbantartása, tisztítása. Új fűtésrendszerek kiépítése, radiátoros, padlófűtés, fal és mennyezetfűtéses rendszerek kivitelezése, gépészeti és kéményrendszer kialakítása."
    },
    {
        logo: Gazlogo,
        heading: "Gázszerelés",
        alt: "Gázszerelés logó",
        typography: "Gázcsőhálózatok, gázelzáró csapok, gázbekötő csövek cseréje, szerelése, korszerűsítése. gázrendszerek tervezése terv ügyintézése, kivitelezése. Gázkészülékek, vízemelegítők, kazánok javítása, szerelése, cseréje, karbantartáse. Gáztűzhelyek garanciális beüzemelése."
    },
    {
        logo: Dugulaslogo,
        heading: "Duguláselhárítás",
        alt: "Duguláselhárítás logó",
        typography: "Mosogató, mosdó, WC, piszoár, padlóösszefolyó, zuhanytálca, kád, csatorna, stang, főgerinc, alapvezeték, klíma csővezeték, csatorna csövek duguláselhárítása."
    }
]

function Services() {

    return (
        <div className="services">
            <ThemeProvider theme={Theme}>


                        {CardDataList1.map((val) => {
                            return (
                                <Card key={val.heading} src={val.logo} heading={val.heading} paragraph={val.typography}></Card>
                            )
                        })}



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
