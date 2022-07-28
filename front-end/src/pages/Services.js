import React, { useEffect, useState } from "react";
import Axios from "axios";

import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  TextField,
  Box,
  FormHelperText,
} from "@mui/material";

import CheckCircleSharpIcon from "@mui/icons-material/CheckCircleSharp";

function Services() {
  const [description, setDescription] = useState("");
  const [mobilePhoneCode, setMobilePhoneCode] = useState({
    value: "",
    hasError: false,
    errorMessage: "",
    color: "primary",
    variant: "outlined",
  });

  const [userName, setUserName] = useState({
    value: "",
    hasError: false,
    errorMessage: "",
    color: "primary",
    variant: "outlined",
  });

  const [mobile, setMobile] = useState({
    value: "",
    hasError: false,
    errorMessage: "",
    color: "primary",
    variant: "outlined",
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
    if (!userName.value) {
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
        setUserName.errorMessage("Maximum 25 karakter hosszú lehet!");

        setUserName((prevState) => ({
          ...prevState,
          hasError: true,
          errorMessage: "Maximum 25 karakter hosszú lehet!",
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
    if (!mobile.value) {
      setMobile((prevState) => ({
        ...prevState,
        hasError: true,
        errorMessage: "Nem lehet üres a mező!",
      }));
    } else if (mobile.value.length < 7) {
      setMobile((prevState) => ({
        ...prevState,
        hasError: true,
        errorMessage:
          "Túl rövid a telefonszám! 7 karakter hosszúnak kell lennie.",
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

  const mobilePhoneCodeValidation = () => {
    if (!mobilePhoneCode.value) {
      setMobilePhoneCode((prevState) => ({
        ...prevState,
        hasError: true,
        errorMessage: "Kötelező választani",
      }));
    } else {
      setMobilePhoneCode((prevState) => ({
        ...prevState,
        hasError: false,
        errorMessage: <CheckCircleSharpIcon />,
        color: "success",
        variant: "outlined",
      }));
    }
  };

  const emailValidation = () => {
    if (!email.value) {
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
    console.log(`Email értéke: ${Boolean(email.value)}, ${email.value}`);
  }, [email.value]);

  useEffect(() => {
    nameValidation();
    console.log(
      `Fasz név értéke: ${Boolean(userName.value)}, ${userName.value}`
    );
  }, [userName.value]);

  useEffect(() => {
    mobileValidation();
    console.log(`Mobil értéke: ${Boolean(mobile.value)}, ${mobile.value}`);
  }, [mobile.value]);

  useEffect(() => {
    mobilePhoneCodeValidation();
    console.log(
      `Szolgáltató szám értéke: ${Boolean(mobilePhoneCode.value)}, ${
        mobilePhoneCode.value
      }`
    );
  }, [mobilePhoneCode.value]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      userName.hasError &&
      mobile.hasError &&
      email.hasError &&
      mobilePhoneCode.hasError
    ) {
      submitFormData();
      alert("Siker!");
    } else {
      alert("Hibásan lett átengedve a form!");
    }
  };

  const formData = {
    name: userName.value,
    mobilePhoneCode: mobilePhoneCode.value,
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
          "& .MuiFormControl-root": { m: 1 },
          "& .MuiButton-root": { m: 1 },
        }}
        noValidate
        autoComplete="off"
      >
        <form onSubmit={handleSubmit}>
          <div>
            <TextField
              error={userName.hasError}
              id="name"
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

            <FormControl style={{ minWidth: 110 }}>
              <InputLabel id="mobile-phone-codes-label">Válassz *</InputLabel>
              <Select
                error={mobilePhoneCode.hasError}
                id="mobile-phone-codes-select"
                labelId="mobile-phone-codes-label"
                value={mobilePhoneCode.value}
                required={true}
                label="Mobile phone codes"
                color={mobilePhoneCode.color}
                onChange={(event) => {
                  setMobilePhoneCode((prevState) => ({
                    ...prevState,
                    value: event.target.value,
                  }));
                }}
              >
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={30}>30</MenuItem>
                <MenuItem value={31}>31</MenuItem>
                <MenuItem value={70}>70</MenuItem>
              </Select>
              <FormHelperText
                error={mobilePhoneCode.hasError}
                variant={mobilePhoneCode.variant}
              >
                {mobilePhoneCode.errorMessage}
              </FormHelperText>
            </FormControl>

            <TextField
              error={mobile.hasError}
              id="mobil"
              label="Mobil"
              placeholder="Telefonszám"
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
              inputProps={{ maxLength: 7 }}
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

          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "#1f2d30",
              maxWidth: 100,
              ":hover": {
                backgroundColor: "white",
                color: "#1f2d30",
              },
            }}
          >
            Küldés
          </Button>
        </form>
      </Box>
    </div>
  );
}

export default Services;
