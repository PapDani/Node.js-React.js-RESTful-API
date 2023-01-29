import "./App.css";
import { useState } from "react";

import Gallery from "./pages/Gallery";
import Services from "./pages/Services";
import Offer from "./pages/Offer";

import SwipeableViews from "react-swipeable-views";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

import Logo from "./images/logos/logo.png";
//import HoneycombBlue from "../public/Design/Black_honeycomb_with_blue_lights/Watermark_nelkuli.jpg"; - kint van src-ből
import HoneycombBlue from "./images/background/Black_honeycomb_with_blue_lights/Watermark_nelkuli2.jpg";

import { Email, Facebook, Call } from "@mui/icons-material";
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

function App() {
  // const theme = useTheme();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      "aria-controls": `full-width-tabpanel-${index}`,
    };
  }

  return (
    <Box>
      <ThemeProvider theme={theme}>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />

        <Box>
          {/* <AppBar position="static" sx={{ backgroundImage: `url(${HoneycombBlue})` }}> */}
          <AppBar position="static">

            {/* <Stack direction="row"
            justifyContent="center"
            spacing={2}
            > */}

              <div>
                
              </div>
              <Stack direction="row"
              justifyContent="flex-start"
              >

                <Stack direction="row"
                  alignItems="center"
                >
                  <Box
                    component="img"
                    sx={{
                      height: 150,
                    }}
                    alt="Logo"
                    src={Logo}
                  />
                  <Typography variant="h3">
                    Perfect System Hungary
                  </Typography>
                </Stack>

              </Stack>


              <Stack direction="row"
                justifyContent="flex-end"
                alignItems="center"
                justifyItems="center"
                spacing={2}
              >

                <Stack direction="row"
                  alignItems="center"
                  spacing={1}
                >
                  <Email />
                  <a href="mailto:perfectsystemhungary@gmail.com">
                    perfectsystemhungary@gmail.com
                  </a>
                </Stack>

                <Stack direction="row"
                  alignItems="center"
                  spacing={1}
                >
                  <Call />
                  <a href="tel:+36202125022">+36 (20) 212 5022</a>
                </Stack>

                <Stack direction="row"
                  alignItems="center"
                  spacing={1}
                >
                  <Facebook />
                  <a href="https://www.facebook.com/profile.php?id=100083219104359">
                    Facebook
                  </a>
                </Stack>

              </Stack>

            {/* </Stack> */}


          </AppBar>
        </Box>

        <Box sx={{ width: "100%" }}>
          {/* <AppBar position="static" style={{ backgroundColor: "#354244" }}> */}
          <AppBar position="static">
            {/* <Tabs value={value} onChange={handleChange} centered variant="scrollable" textColor="primary" inkBarStyle={{ background: 'yellow' }} scrollButtons allowScrollButtonsMobile */}
            <Tabs value={value} onChange={handleChange} centered variant="scrollable" textColor="primary" inkBarStyle={{ background: 'yellow' }} scrollButtons allowScrollButtonsMobile
            >
              <Tab label="Szolgáltatások" {...a11yProps(0)} />
              <Tab label="Galéria" {...a11yProps(1)} />
              <Tab label="Ajánlat kérés" {...a11yProps(2)} />
            </Tabs>
          </AppBar>

          <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel value={value} index={0}>
              <Services sx={{ width: "100%", justifyContent: "center" }} />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Gallery />
            </TabPanel>
            <TabPanel value={value} index={2}>

              <Offer />
            </TabPanel>
          </SwipeableViews>
        </Box>
      </ThemeProvider>
    </Box>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={"span"} /* default: p, causes warning */>
            {children}
          </Typography>
        </Box>
      )}
    </div>
  );
}

export default App;
