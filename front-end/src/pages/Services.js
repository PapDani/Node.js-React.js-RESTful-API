import React, { useEffect, useState } from "react";
import Axios from "axios";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import CheckCircleSharpIcon from "@mui/icons-material/CheckCircleSharp";

function Services() {
  const [nevValue, setNevValue] = useState("");
  const [nevErrorBoolean, setNevErrorBoolean] = useState(false);
  const [nevErrorMsg, setNevErrorMsg] = useState("");
  const [nevColor, setNevColor] = useState("primary");
  const [nevVariant, setNevVariant] = useState("outlined");
  const [mobilValue, setMobilValue] = useState("");
  const [mobilErrorBoolean, setMobilErrorBoolean] = useState(false);
  const [mobilErrorMsg, setMobilErrorMsg] = useState("");
  const [mobilColor, setMobilColor] = useState("primary");
  const [mobilVariant, setMobilVariant] = useState("outlined");
  const [emailValue, setEmailValue] = useState("");
  const [emailErrorBoolean, setEmailErrorBoolean] = useState(false);
  const [emailErrorMsg, setEmailErrorMsg] = useState("");
  const [emailColor, setEmailColor] = useState("primary");
  const [emailVariant, setEmailVariant] = useState("outlined");
  const [descriptionValue, setDescriptionValue] = useState("");

  // const handleNevChange = (event) => {
  //   setNevValue(event.target.value);
  // };

  const handleMobilChange = (event) => {
    setMobilValue(event.target.value);

  };

  const handleEmailChange = (event) => {
    setEmailValue(event.target.value);
    emailError();
  };

  const handleDescriptionChange = (event) => {
    setDescriptionValue(event.target.value);
  };

  //const nevReg = new RegExp("^([A-ZÁÉÍÓÖŐÚÜŰ]([a-záéíóöőúüű.]+\s?)){2,}$");
  //const nevReg2 = /^[a-zA-Z]+$/;
  //const nevReg3 = /^[a-zA-Z\s]*$/;
  //const specialChars = /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]+$/g;
  //const specialChars2 = /^[A-Za-z0-9\!\@\#\$\%\^\&\*\)\(+\=\._-]+$/g

  // eslint-disable-next-line no-useless-escape
  const specialChars3 = /[-!$%^&*()_+|~=`{}\[\]:\/;<>?,.@#]/;

  const nevError = () => {
    if (nevValue === undefined) {
      setNevErrorBoolean(true);
      setNevErrorMsg("Nem lehet üres ez a mező!");
    } else {
      if (nevValue.length < 6) {
        setNevErrorBoolean(true);
        setNevErrorMsg("Minimum 6 karakter hosszúságú legyen!");
      } else if (nevValue.length >= 25) {
        setNevErrorBoolean(true);
        setNevErrorMsg("Maximum 25 karakter husszú lehet!");
      } else {
        if (!nevValue.match(specialChars3)) {
          setNevErrorBoolean(false);
          setNevErrorMsg(<CheckCircleSharpIcon />);
          setNevColor("success");
          setNevVariant("outlined");
        } else {
          setNevErrorBoolean(true);
          setNevErrorMsg("Hibás név formátum!");
        }
      }
    }
  };

  const mobilError = () => {
    if (mobilValue.match(mobilReg2)) {
      setMobilErrorBoolean(false);
      setMobilErrorMsg(<CheckCircleSharpIcon />);
      setMobilColor("success");
      setMobilVariant("outlined");
    } else {
      setMobilErrorBoolean(true);
      setMobilErrorMsg("Hibás formátum!");
    }
  };

  const emailError = () => {
    if (emailValue === undefined || emailValue === null || emailValue === " ") {
      setEmailErrorBoolean(true);
      setEmailErrorMsg("Nem lehet üres ez a mező!");
    } else {
      if (emailValue.length < 11) {
        setEmailErrorBoolean(true);
        setEmailErrorMsg("Minimum 11 karakter hosszúságú legyen!");
      } else if (emailValue.length >= 35) {
        setEmailErrorBoolean(true);
        setEmailErrorMsg("Maximum 35 karakter husszú lehet!");
      } else if (!emailValue.includes(".")) {
        setEmailErrorBoolean(true);
        setEmailErrorMsg("Hiányzik a '.' az email címből!");
      } else {
        setEmailErrorBoolean(false);
        setEmailErrorMsg(<CheckCircleSharpIcon />);
        setEmailColor("success");
        setEmailVariant("outlined");
      }
    }
  };

  //const mobilReg = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;
  const mobilReg2 =
    /^((?:\+?3|0)6)(?:-|\()?(\d{1,2})(?:-|\))?(\d{3})-?(\d{3,4})$/;

  useEffect(() => {
    emailError();
    console.log(`Email értéke: ${Boolean(emailValue)}`);
  }, [emailValue]);

  useEffect(() => {
    nevError();
    console.log(`Fasz név értéke: ${Boolean(nevValue)}`);
  }, [nevValue]);

  useEffect(() => {
    mobilError();
    console.log(`Mobil értéke: ${Boolean(mobilValue)}`);
  }, [mobilValue]);

  //1. Név regex
  //2. Telefonszám hossza
  //3. Email .-ok száma

  const handleSubmit = (e) => {
    e.preventDefault();
    nevError();
    mobilError();
    emailError();
    if (
      nevErrorBoolean === false &&
      mobilErrorBoolean === false &&
      emailErrorBoolean === false
    ) {
      submitFormData();
      alert("Siker!");
    } else {
      alert("Hibásan lett átengedve a form!");
    }
  };

  /* Erre nincs szükség, hacsaknem a handleXY függvényekben pl a használjuk a setName(nevValue)-t
  const [name, setName] = useState();
  const [mobil, setMobil] = useState();
  const [email, setEmail] = useState();
  const [description, setDescription] = useState()
  */

  const formData = {
    name: nevValue,
    mobil: mobilValue,
    email: emailValue,
    description: descriptionValue,
  };

  const submitFormData = async () => {
    try {
      const response = await Axios.post(
        "http://localhost:3001/api/1",
        formData
      );
      console.log("response.data:" + response.data);
      console.log("response.data.message: " + response.data.message);
      console.log(response.data.name);
      console.log(response.data.mobil);
      console.log(response.data.email);
      console.log(response.data.description);
    } catch (err) {
      console.log("hiba: " + err);
    }
  };

  return (
    <div>
      <Box
        component=""
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <form onSubmit={handleSubmit}>
          <div>
            <TextField
              error={nevErrorBoolean}
              id="nev"
              label="Név"
              placeholder="Minta Név"
              value={nevValue}
              required={true}
              onChange={(event) => {
                setNevValue(event.target.value);
              }}
              helperText={nevErrorMsg}
              color={nevColor}
              variant={nevVariant}
              type="text"
              //inputProps={{ pattern: "^([A-ZÁÉÍÓÖŐÚÜŰ]([a-záéíóöőúüű.]+\s?)){2,}$" }}
            />

            <TextField
              error={mobilErrorBoolean}
              id="mobil"
              label="Mobil"
              placeholder="+36202349876"
              value={mobilValue}
              required={true}
              onChange={handleMobilChange}
              helperText={mobilErrorMsg}
              color={mobilColor}
              variant={mobilVariant}
              type="tel"
              inputProps= {{ pattern: '[a-z]'}}
            />
          </div>
          <div>
            <TextField
              error={emailErrorBoolean}
              id="email"
              label="Email"
              placeholder="minta@email.com"
              value={emailValue}
              required={true}
              onChange={handleEmailChange}
              helperText={emailErrorMsg}
              color={emailColor}
              variant={emailVariant}
              type="email"
            />
            <TextField
              multiline
              rows={1}
              placeholder="Kérjük írja le, hogy miben segíthetünk"
              label="Leírás"
              value={descriptionValue}
              onChange={handleDescriptionChange}
            />
          </div>

          <Button type="submit" variant="contained">
            Küldés
          </Button>
        </form>
      </Box>
    </div>
  );
}

export default Services;
