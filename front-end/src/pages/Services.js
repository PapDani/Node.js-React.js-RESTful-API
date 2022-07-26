import React, { useEffect, useState } from "react";
import Axios from "axios";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import CheckCircleSharpIcon from "@mui/icons-material/CheckCircleSharp";

function Services() {
  const [description, setDescription] = useState("");
  const [userName, setUserName] = useState({
    value: "",
    hasError: false,
    errorMessage: "",
    color: "primary",
  });

  const [mobile, setMobile] = useState({
    value: "",
    hasError: false,
    errorMessage: "",
    color: "primary",
    regEx: "(^[0-9]+$|^$)",
  });

  const [email, setEmail] = useState({
    value: "",
    hasError: false,
    errorMessage: "",
    color: "primary",
    variant: "outlined",
  });

  // eslint-disable-next-line no-useless-escape
  const specialChars3 = /[-!$%^&*()_+|~=`{}\[\]:\/;<>?,@#]/;

  const nameValidation = () => {
    if (userName.value === undefined) {
      setUserName((prevState) => ({
        ...prevState,
        hasError: true,
        errorMessage: "Nem lehet üres ez a mező!",
      }));
    } else {
      if (userName.value.length < 6) {
        setUserName((prevState) => ({
          ...prevState,
          hasError: true,
          errorMessage: "Minimum 6 karakter hosszúságú legyen!",
        }));
      } else if (userName.value.length >= 25) {
        setUserName.hasError(true);
        setUserName.errorMessage("Maximum 25 karakter husszú lehet!");

        setUserName((prevState) => ({
          ...prevState,
          hasError: true,
          errorMessage: "Maximum 25 karakter husszú lehet!",
        }));
      } else {
        if (!userName.value.match(specialChars3)) {
          setUserName((prevState) => ({
            ...prevState,
            hasError: false,
            errorMessage: <CheckCircleSharpIcon />,
            color: "success",
            variant: "outlined",
          }));
        } else {
          setUserName((prevState) => ({
            ...prevState,
            hasError: true,
            errorMessage: "Hibás név formátum!",
          }));
        }
      }
    }
  };

  const mobileValidation = () => {
    if (mobile.value.length < 11) {
      setMobile((prevState) => ({
        ...prevState,
        hasError: true,
        errorMessage:
          "Túl rövid a telefonszám! Legalább 11 karakter hosszúnak kell lennie.",
      }));
    } else {
      setMobile((prevState) => ({
        ...prevState,
        hasError: false,
        errorMessage: <CheckCircleSharpIcon />,
        color: "success",
        variant: "outlined",
      }));
    }
  };

  const emailValidation = () => {
    if (email.value === undefined) {
      setEmail((prevState) => ({
        ...prevState,
        hasError: true,
        errorMessage: "Nem lehet üres ez a mező!",
      }));
    } else {
      if (email.value.length < 11) {
        setEmail((prevState) => ({
          ...prevState,
          hasError: true,
          errorMessage: "Minimum 11 karakter hosszúságú legyen!",
        }));
      } else if (email.value.length >= 35) {
        setEmail((prevState) => ({
          ...prevState,
          hasError: true,
          errorMessage: "Maximum 35 karakter husszú lehet!",
        }));
      } else if (!email.value.includes(".")) {
        setEmail((prevState) => ({
          ...prevState,
          hasError: true,
          errorMessage: "Hiányzik a '.' az email címből!",
        }));
      } else {
        setEmail((prevState) => ({
          ...prevState,
          hasError: true,
          errorMessage: "Hiányzik a '.' az email címből!",
          color: "success",
          variant: "outlined",
        }));
      }
    }
  };

  useEffect(() => {
    emailValidation();
    console.log(`Email értéke: ${Boolean(email.value)}`);
  }, [email.value]);

  useEffect(() => {
    nameValidation();
    console.log(`Fasz név értéke: ${Boolean(userName.value)}`);
  }, [userName.value]);

  useEffect(() => {
    mobileValidation();
    console.log(`Mobil értéke: ${Boolean(mobile.value)}`);
  }, [mobile.value]);


  const handleSubmit = (event) => {
    event.preventDefault();

    if (userName.hasError && mobile.hasError && email.hasError) {
      submitFormData();
      alert("Siker!");
    } else {
      alert("Hibásan lett átengedve a form!");
    }
  };

  const formData = {
    name: userName.value,
    mobil: mobile.value,
    email: email.value,
    description: description,
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
    } catch (error) {
      console.log("hiba: " + error);
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
              error={userName.hasError}
              id="nev"
              label="Név"
              placeholder="Minta Név"
              value={userName.value}
              required={true}
              onChange={(event) => {
                setUserName((prevState) => ({
                  ...prevState,
                  value: event.target.value,
                }));
              }}
              helperText={userName.errorMessage}
              color={userName.color}
              variant={userName.variant}
              type="text"
            />

            <TextField
              error={mobile.hasError}
              id="mobil"
              label="Mobil"
              placeholder="+36202349876"
              value={mobile.value}
              required={true}
              onChange={(event) => {
                if (event.target.value.match(mobile.regEx)) {
                  setMobile((prevState) => ({
                    ...prevState,
                    value: event.target.value,
                  }));
                }
              }}
              helperText={mobile.errorMessage}
              color={mobile.color}
              variant={mobile.variant}
            />
          </div>
          <div>
            <TextField
              error={email.hasError}
              id="email"
              label="Email"
              placeholder="minta@email.com"
              value={email.value}
              required={true}
              onChange={(event) => {
                setEmail((prevState) => ({
                  ...prevState,
                  value: event.target.value,
                }));
              }}
              helperText={email.errorMessage}
              color={email.color}
              variant={email.variant}
              type="email"
            />
            <TextField
              multiline
              rows={1}
              placeholder="Kérjük írja le, hogy miben segíthetünk"
              label="Leírás"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
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
