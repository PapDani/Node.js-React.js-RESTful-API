import React from 'react'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

import IMG_01 from "../images/gallery/IMG_01.jpg";
import IMG_02 from "../images/gallery/IMG_02.jpg";
import IMG_03 from "../images/gallery/IMG_03.jpg";
import IMG_04 from "../images/gallery/IMG_04.jpg";

const itemData = [
  { img: IMG_01 },
  { img: IMG_02 },
  { img: IMG_03 },
  { img: IMG_04 }
]

function Gallery() {
  return (
    <ImageList sx={{ width: "100%", height: "100%" }} cols={2} rowHeight={"100%"}>
      {itemData.map((item) => (
        <ImageListItem key={item.img}>
          <img
            src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt={item.title}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  )
}

export default Gallery