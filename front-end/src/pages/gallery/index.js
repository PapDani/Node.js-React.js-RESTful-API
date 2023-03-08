import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Box } from '@mui/material';
import { Theme } from "../../theme";
import { ThemeProvider } from "@mui/material/styles";
import IconButton from '@mui/material/IconButton';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import React, { useState, useEffect } from 'react';
import Typography from "@mui/material/Typography";
import { Info as InfoIcon, Close as CloseIcon, KeyboardDoubleArrowDown as KeyboardDoubleArrowDownIcon, KeyboardDoubleArrowUp as KeyboardDoubleArrowUpIcon } from "@mui/icons-material";

import "./style.css";

import IMG_01 from "../../images/gallery/IMG_01.jpg";
import IMG_02 from "../../images/gallery/IMG_02.jpg";
import IMG_03 from "../../images/gallery/IMG_03.jpg";
import IMG_04 from "../../images/gallery/IMG_04.jpg";
import IMG_05 from "../../images/gallery/IMG_05.jpg";
import IMG_06 from "../../images/gallery/IMG_06.jpg";
import IMG_07 from "../../images/gallery/IMG_07.jpg";
import IMG_08 from "../../images/gallery/IMG_08.jpg";
import IMG_09 from "../../images/gallery/IMG_09.jpg";
import IMG_10 from "../../images/gallery/IMG_10.jpg";
import IMG_11 from "../../images/gallery/IMG_11.jpg";
import IMG_12 from "../../images/gallery/IMG_12.jpg";

const itemData = [
    {
        img: IMG_01,
        id: 1,
        alt: "",
        title: "Ipari csarnok hétkörös padlófűtései rendszere",
        desc: ""
    },
    {
        img: IMG_02,
        id: 2,
        alt: "",
        title: "Víz -víz hőszivattyú fűtési, hűtési rendszer hőközpontja",
        desc: ""
    },
    {
        img: IMG_03,
        id: 3,
        alt: "",
        title: "Ipari fűtési rendszer osztó-gyüjtője",
        desc: ""
    },
    {
        img: IMG_04,
        id: 4,
        alt: "",
        title: "Családiház fürdőszobája szerelvényezés után",
        desc: ""
    },
    {
        img: IMG_05,
        id: 5,
        alt: "",
        title: "Mennyezet hűtés/fűtés",
        desc: ""
    },
    {
        img: IMG_06,
        id: 6,
        alt: "",
        title: "Családiház nappali szobájának padlófűtési rendszere",
        desc: ""
    },
    {
        img: IMG_07,
        id: 7,
        alt: "",
        title: "Családiház alapvezetékeinek lefektetése",
        desc: ""
    },
    {
        img: IMG_08,
        id: 8,
        alt: "",
        title: "Családhiáz fürdőszobájának alapszerelése",
        desc: "Fürdőkád, dupla mosdó"
    },
    {
        img: IMG_09,
        id: 9,
        alt: "",
        title: "Családiház épített zuhanykabin vízellátása és szennyvíz elvezetése",
        desc: ""
    },
    {
        img: IMG_10,
        id: 10,
        alt: "",
        title: "Családiház vízellátása és csatornázása a pincében, a mennyezeten szerelve",
        desc: ""
    },
    {
        img: IMG_11,
        id: 11,
        alt: "",
        title: "Esőelvezető cső tisztítása, duguláselhárítás.",
        desc: ""
    },
    {
        img: IMG_12,
        id: 12,
        alt: "",
        title: "Radiátorszelep cseréje csőfagyasztásos eljárással, fűtési víz leengedése nélkül",
        desc: ""
    },
]

const getColumns = (width) => {
    console.log("width: " + width);
    if (width < Theme.breakpoints.values.tablet) {
        console.log("mobile");
        return 1
    } else if (width < Theme.breakpoints.values.laptop) {
        console.log("tablet");
        return 2
    } else if (width < Theme.breakpoints.values.desktop) {
        console.log("laptop");
        return 3
    } else {
        console.log("else");
        return 3
    }
}

function Gallery() {

    const [columns, setColumns] = useState(getColumns(window.innerWidth))
    const updateDimensions = () => {
        setColumns(getColumns(window.innerWidth))
    }

    useEffect(() => {
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, []);

    // const [expanded, setExpanded] = useState(false);
    // const [expandedClassName, setExpandedClassName] = useState("notExpanded");

    // const handleExpandClick = () => {
    //     setExpanded(!expanded);
    // }

    // const expandedClassNameFun = () =>{
    //     console.log("expanded boolean:" + expanded);
    //     console.log(expandedClassName);
    //     if(expanded){
    //         setExpandedClassName("expanded");
    //         console.log(expanded);
    //         console.log(expandedClassName);
    //     }
    //     if(!expanded){
    //         setExpandedClassName("notExpanded");
    //         console.log(expanded);
    //         console.log(expandedClassName);
    //     }
    // }

    //Kép nagyítása
    const [enlarged, setEnlarged] = useState(false);
    const [enlargedItemId, setEnlargedItemId] = useState(null);

    const handleEnlargedItemClick = (itemId) => {
        setEnlarged(true);
        var trueItemId = itemId-1;
        setEnlargedItemId(trueItemId);
    };

    const handleEnlargedItemClose = () => {
        setEnlarged(false);
        setEnlargedItemId(null);
    };
    ///

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
                        borderRadius: 2,
                        padding: 2,
                    }}
                >
                    {itemData.map((item) => (
                        <ImageListItem className="hoverZoom" key={item.img}>
                            <img
                                className="roundedImage"
                                src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                                srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                alt={item.alt}
                                loading="lazy"
                            />
                            {/* <ImageListItemBar className={expandedClassName} */}
                            <ImageListItemBar
                                sx={{
                                    borderBottomLeftRadius: 11,
                                    borderBottomRightRadius: 11,
                                    // height: expanded ? 128 : 'auto',
                                    // overflow: 'hidden'
                                }}
                                title={
                                    <Typography sx={{textOverflow: "ellipsis"}} variant="subtitle1">
                                        {item.title}
                                    </Typography>
                                }
                                subtitle={
                                    <Typography variant="subtitle2">
                                        {item.desc}
                                    </Typography>
                                }
                                actionIcon={
                                    <>
                                        <IconButton onClick={() => handleEnlargedItemClick(item.id)} sx={{ color: 'rgba(255, 255, 255, 0.54)' }}>
                                            <InfoIcon />
                                        </IconButton>
                                        <IconButton
                                            sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                            // onClick={() => {handleExpandClick()}}
                                        >
                                            {/* {expanded ? (
                                                <KeyboardDoubleArrowDownIcon />
                                            ) : (
                                                <KeyboardDoubleArrowUpIcon />
                                            )} */}
                                        </IconButton>
                                    </>
                                }
                            />
                        </ImageListItem>
                    ))}
                </ImageList>

                {enlarged && (
                    <ImageListItem>
                        <IconButton onClick={handleEnlargedItemClose} sx={{ top: 50, left: "97%", color: 'rgba(255, 255, 255, 0.54)' }}>
                            <CloseIcon />
                        </IconButton>
                        <img
                            className="roundedImage"
                            src={`${itemData[enlargedItemId].img}?w=auto&h=auto&fit=crop&auto=format`}
                            srcSet={`${itemData[enlargedItemId].img}?w=auto&h=auto&fit=crop&auto=format&dpr=2 2x`}
                            alt={itemData[enlargedItemId].alt}
                            loading="lazy"
                        />
                        {/* <ImageListItemBar className={expandedClassName} */}
                        <ImageListItemBar
                            sx={{
                                borderBottomLeftRadius: 11, //% ra át kellene írni, hogy egyezzen a kép lekerekítéssel
                                borderBottomRightRadius: 11, //% ra át kellene írni
                            }}
                            title={
                                <Typography variant="subtitle1">
                                    {itemData[enlargedItemId].title}
                                </Typography>
                            }
                            subtitle={
                                <Typography variant="subtitle1">
                                    {itemData[enlargedItemId].desc}
                                </Typography>
                            }
                            actionIcon={
                                <>
                                    <IconButton
                                        sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                        // onClick={() => {handleExpandClick()}}
                                    >
                                        {/* {expanded ? (
                                            <KeyboardDoubleArrowDownIcon />
                                        ) : (
                                            <KeyboardDoubleArrowUpIcon />
                                        )} */}
                                    </IconButton>
                                </>
                            }
                        />
                    </ImageListItem>
                )}

            </Box>
        </ThemeProvider >
    )
}

export default Gallery