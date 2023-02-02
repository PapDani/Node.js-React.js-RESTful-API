import React from 'react'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Box } from '@mui/material';
import { Theme } from "../theme";
import { ThemeProvider } from "@mui/material/styles";
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import ImageListItemBar from '@mui/material/ImageListItemBar';

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

const itemData = [
  {
    img: IMG_01,
    alt: "",
    title: "Szerelés",
    desc: "Csináltam ilyen szép csöveket"
  },
  { img: IMG_02 },
  { img: IMG_03 },
  { img: IMG_04 },
  { img: IMG_05 },
  { img: IMG_06 },
  { img: IMG_07 },
  { img: IMG_08 },
  { img: IMG_09 },
  { img: IMG_10 },
]

function Gallery() {
  return (
    <ThemeProvider theme={Theme}>
      <Box>
        <ImageList
        rowHeight={"auto"}
          sx={{
            width: "auto",
            height: "auto",
            backgroundColor: "divider.primary",
            padding: 2,
            // cols:{mobile: "1 !important", tablet: "2 !important", laptop: "3 !important", desktop: "3 !important" },
            // gap:{mobile: "15 !important", tablet: "15 !important", laptop: "15 !important", desktop: "15 !important"}
            
            columnCount: {mobile: '1 !important', tablet:'2 !important', laptop:'3 !important', desktop:'3 !important'}
          }}
          // cols={{mobile:1, tablet:2, laptop:3, desktop:3}}
          // gap={{mobile:15, tablet:15, laptop:15, desktop:15}}
          // cols={2}
          // rows={2}
          gap={15}
          >
          {itemData.map((item) => (
            <ImageListItem className='hoverZoom' key={item.img}>
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
    </ThemeProvider>
  )
}

export default Gallery