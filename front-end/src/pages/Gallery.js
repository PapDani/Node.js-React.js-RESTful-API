import React from 'react'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

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
  { img: IMG_01 },
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
    <ImageList sx={{ width: "100%", height: "100%", borderRadius: "1rem" }} cols={2} gap={15} rowHeight={"100%"}>
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