import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Box } from '@mui/material';
import { Theme } from "../theme";
import { ThemeProvider } from "@mui/material/styles";
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import React, { useState, useEffect } from 'react';

import "./Gallery.css";

import IMG_01 from "../images/gallery/IMG_01.jpg";
import IMG_02 from "../images/gallery/IMG_02.jpg";
import IMG_03 from "../images/gallery/IMG_03.jpg";
import IMG_04 from "../images/gallery/IMG_04.jpg";
import IMG_05 from "../images/gallery/IMG_05.jpg";
import IMG_06 from "../images/gallery/IMG_06.jpg";
import IMG_07 from "../images/gallery/IMG_07.jpg";
import IMG_08 from "../images/gallery/IMG_08.jpg";
import IMG_09 from "../images/gallery/IMG_09.jpg";
import IMG_10 from "../images/gallery/IMG_10.jpg";
import IMG_11 from "../images/gallery/IMG_11.jpg";
import IMG_12 from "../images/gallery/IMG_12.jpg";

const itemData = [
  {
    img: IMG_01,
    id: 1,
    alt: "",
    title: "Szerelés",
    desc: "Csináltam ilyen szép csöveket"
  },
  {
    img: IMG_02,
    id: 2,
    alt: "",
    title: "Szerelés2",
    desc: "Csináltam ilyen szép csöveket2"
  },
  { img: IMG_03 },
  { img: IMG_04 },
  { img: IMG_05 },
  { img: IMG_06 },
  { img: IMG_07 },
  { img: IMG_08 },
  { img: IMG_09 },
  { img: IMG_10 },
  {
    img: IMG_11,
    id: 11,
    alt: "",
    title: "Esőelvezető cső tisztítása, duguláselhárítás.",
    desc: ""
  },
  { img: IMG_12 },
]

//Ezt a Theme.js-ből hogy lehetne használni, hogy itt ne legyen?
const breakpoints = {
  mobile: 426,
  tablet: 769,
  laptop: 1025,
  desktop: 1440
}

const getColumns = (width) => {
  console.log("width: " + width);
  if (width < breakpoints.mobile) {
    console.log("mobile");
    return 1
  } else if (width < breakpoints.tablet) {
    console.log("tablet");
    return 2
  } else if (width < breakpoints.laptop) {
    console.log("laptop");
    return 2
  } else {
    console.log("else");
    return 3
  }
}

// const getId = (gotId) => {
//   console.log("id: " + gotId);
//   document.getElementById(gotId).setAttribute("className", "imgToFullScreen");
// }

// const getId = event => {
//   console.log(event.target.dataset);
//   // console.log(event.target.getAttribute("className"));
//   event.target.setAttribute("className", "imgToFullScreen");
// }

function Gallery() {

  const [imageListItemClassName, setimageListItemClassName] = useState("hoverZoom");
  const handleClickOnImg = () => setimageListItemClassName("imgToFullScreen");
  const handleClickOnImgClose = () => setimageListItemClassName("");

  const [columns, setColumns] = useState(getColumns(window.innerWidth))
  const updateDimensions = () => {
    setColumns(getColumns(window.innerWidth))
  }

  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  return (
    <ThemeProvider theme={Theme}>
      <Box>
        <ImageList
          variant='masonry'
          cols={columns}
          gap={20}
          rowHeight={"auto"}
          sx={{
            width: "auto",
            height: "auto",
            backgroundColor: "divider.primary",
            padding: 2,
            // cols:{mobile: "1 !important", tablet: "2 !important", laptop: "3 !important", desktop: "3 !important" },
            // gap:{mobile: "15 !important", tablet: "15 !important", laptop: "15 !important", desktop: "15 !important"}

            // columnCount: {mobile: '1 !important', tablet:'2 !important', laptop:'3 !important', desktop:'3 !important'}
          }}
        // cols={{ mobile: 1, tablet: 2, laptop: 3, desktop: 3 }}
        // gap={{ mobile: 15, tablet: 15, laptop: 15, desktop: 15 }}
        // cols={2}
        // rows={2}
        >
          {itemData.map((item) => (
            // <ImageListItem onClick={() => {getId(item.id)}} className="hoverZoom" key={item.img}>
            <ImageListItem className="hoverZoom" key={item.img}>
              <img
                src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt={item.alt}
                loading="lazy"
              />
              <ImageListItemBar
                title={item.title}
                subtitle={item.desc}
                actionIcon={
                  <IconButton
                    sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                    aria-label={`info about ${item.title}`}
                  >
                    <InfoIcon />
                  </IconButton>
                }
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    </ThemeProvider >
  )
}

export default Gallery