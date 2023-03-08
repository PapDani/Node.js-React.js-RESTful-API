//Első
// export const CustomButton = styled(Button)({
//   backgroundColor: "#2196f3",
//   border: "none",
//   color: "white",
//   padding: "8px 16px",
//   maxWidth: "200px",
//   "&:hover": {
//     backgroundColor: "#0d8ddb",
//     color: "white",
//     boxShadow: "none",
//   },
//   "&:active": {
//     boxShadow: "none",
//     backgroundColor: "#0d8ddb",
//   },
//   "&:focus": {
//     boxShadow: "0 0 0 0.2rem rgba(13, 141, 219, 0.5)",
//   },
// });

//Második
import {styled} from "@mui/material/styles";
import Button from "@mui/material/Button";

export const CustomButton = styled(Button)({
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    color: "white",
    border: "1px solid rgb(255, 193, 4)",
    borderRadius: "4px",
    padding: "8px 16px",
    maxWidth: "200px",
    "&:hover": {
        backgroundColor: "rgb(255, 193, 4)",
        color: "black",
    },
    "&:disabled": {
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        border: "none",
        color: "rgba(255, 255, 255, 0.3)"
    },
});