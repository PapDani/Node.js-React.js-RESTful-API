import React from 'react'

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import IMG_01 from "../images/gallery/IMG_01.jpg";
import IMG_02 from "../images/gallery/IMG_02.jpg";

const CardDataList = [
  { img: IMG_01 },
  { img: IMG_02 }
]

function Gallery() {
  return (
    <div>
      {CardDataList.map((val) => {
        return (
          <Card sx={{ 
            maxWidth: 345,
            padding: 1,
            margin: 2
            }}>
            <CardMedia
              component="img"
              height="400"
              src={val.img}
            />
          </Card>
        )
      })}
    </div>
  )
}

export default Gallery