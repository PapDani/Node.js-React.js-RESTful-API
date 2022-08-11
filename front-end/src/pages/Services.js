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
  // eslint-disable-next-line no-useless-escape
  const nameRegex = /[!$%^&*()_+|~=`{}\[\]:\/;<>?,@#]/;

  const [description, setDescription] = useState("");
  const [mobilePhoneCode, setMobilePhoneCode] = useState({
    value: "",
    hasError: false,
    errorMessage: "",
    color: "primary",
    variant: "outlined",
  });

  const [firstName, setFirstName] = useState({
    value: "",
    hasError: false,
    errorMessage: "",
    color: "primary",
    variant: "outlined",
    regEx: "(^[a-zA-ZöüóőúéáűíÖÜÓŐÚÉÁŰÍ .-]+$|^$)",
  });

  const [lastName, setLastName] = useState({
    value: "",
    hasError: false,
    errorMessage: "",
    color: "primary",
    variant: "outlined",
    regEx: "(^[a-zA-ZöüóőúéáűíÖÜÓŐÚÉÁŰÍ .-]+$|^$)",
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
    // regEx: "(^[a-z0-9.@]+$|^$)",
    regEx:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    splitRegEx: /[.@]/
  });

  const firstNameValidation = () => {
    if (!firstName.value) {
      setFirstName((prevState) => ({
        ...prevState,
        hasError: true,
        errorMessage: "Kötelező kitölteni!",
      }));
    } else {
      if (!firstName.value.match(nameRegex)) {
        setFirstName((prevState) => ({
          ...prevState,
          hasError: false,
          errorMessage: <CheckCircleSharpIcon />,
          color: "success",
          variant: "outlined",
        }));
      } else {
        setFirstName((prevState) => ({
          ...prevState,
          hasError: true,
          errorMessage: "Hibás név formátum!",
        }));
      }
    }
  };

  const lastNameValidation = () => {
    if (!lastName.value) {
      setLastName((prevState) => ({
        ...prevState,
        hasError: true,
        errorMessage: "Kötelező kitölteni!",
      }));
    } else {
      if (!lastName.value.match(nameRegex)) {
        setLastName((prevState) => ({
          ...prevState,
          hasError: false,
          errorMessage: <CheckCircleSharpIcon />,
          color: "success",
          variant: "outlined",
        }));
      } else {
        setLastName((prevState) => ({
          ...prevState,
          hasError: true,
          errorMessage: "Hibás név formátum!",
        }));
      }
    }
  };

  const mobileValidation = () => {
    if (!mobile.value) {
      setMobile((prevState) => ({
        ...prevState,
        hasError: true,
        errorMessage: "Kötelező kitölteni!",
      }));
    } else if (mobile.value.length < 7) {
      setMobile((prevState) => ({
        ...prevState,
        hasError: true,
        errorMessage: "7 karakter hosszúnak kell lennie!",
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
    let [userName = "", domainName = "", domain = ""] =
      email.value.split(email.splitRegEx);

    if (!email.value) {
      setEmail((prevState) => ({
        ...prevState,
        hasError: true,
        errorMessage: "Kötelező kitölteni!",
      }));
    } else {
      if (!userName || !domainName || !domain) {
        setEmail((prevState) => ({
          ...prevState,
          hasError: true,
          errorMessage: "Hiányos email cím!",
        }));
      } else if (email.value.length > 320) {
        setEmail((prevState) => ({
          ...prevState,
          hasError: true,
          errorMessage: "Maximum 320 karakter husszú lehet!",
        }));
      } else if (!email.value.match(email.regEx)) {
        setEmail((prevState) => ({
          ...prevState,
          hasError: true,
          errorMessage: "Hibás email cím formátum!",
        }));
      } else {
        setEmail((prevState) => ({
          ...prevState,
          hasError: false,
          errorMessage: <CheckCircleSharpIcon />,
          color: "success",
          variant: "outlined",
        }));
      }
    }
  };

  useEffect(() => {
    emailValidation();
    // console.log(`Email értéke: ${Boolean(email.value)}, ${email.value}`);
  }, [email.value]);

  useEffect(() => {
    lastNameValidation();
    // console.log(`Vezetéknév értéke: ${Boolean(
    //   lastName.value
    // )}, ${lastName.value}`);
  }, [lastName.value]);

  useEffect(() => {
    firstNameValidation();
    // console.log(`Keresztnév értéke: ${Boolean(
    //   firstName.value
    // )}, ${firstName.value}`);
  }, [firstName.value]);

  useEffect(() => {
    mobileValidation();
    // console.log(`Mobil értéke: ${Boolean(mobile.value)}, ${mobile.value}`);
  }, [mobile.value]);

  useEffect(() => {
    mobilePhoneCodeValidation();
    console
      .log
      // `Szolgáltató szám értéke: ${Boolean(mobilePhoneCode.value)}, ${
      //   mobilePhoneCode.value
      // }`
      ();
  }, [mobilePhoneCode.value]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !lastName.hasError &&
      !firstName.hasError &&
      !mobile.hasError &&
      !email.hasError &&
      !mobilePhoneCode.hasError
    ) {
      submitFormData();
      alert("Siker!");
    } else {
      alert("Hibásan lett átengedve a form!");
    }
  };

  /*
  //Tamásé
  const formData = {
    lastName: lastName.value,
    firstName: firstName.value,
    mobilePhoneCode: mobilePhoneCode.value,
    mobil: mobile.value,
    email: email.value,
    description: description,
  };
  */

  const formData = {
    lastName: lastName.value,
    firstName: firstName.value,
    mobil: mobilePhoneCode.value + mobile.value,
    email: email.value,
    description: description,
  };

  const submitFormData = async () => {
    try {
      console.log(formData);
      const response = await Axios.post(
        "http://localhost:3001/api/1",
        formData
      );
      // console.log("response.data:" + response.data);
      // console.log("response.data.message: " + response.data.message);
      // console.log(response.data.name);
      // console.log(response.data.mobil);
      // console.log(response.data.email);
      // console.log(response.data.description);
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
              error={lastName.hasError}
              id="lastName"
              label="Vezetéknév"
              placeholder="pl.: Tóth"
              value={lastName.value}
              required={true}
              onChange={(event) => {
                if (event.target.value.match(lastName.regEx)) {
                  setLastName((prevState) => ({
                    ...prevState,
                    value: event.target.value,
                  }));
                }
              }}
              helperText={lastName.errorMessage}
              color={lastName.color}
              variant={lastName.variant}
              type="text"
            />

            <TextField
              error={firstName.hasError}
              id="firstName"
              label="Keresztnév"
              placeholder="pl.: János"
              value={firstName.value}
              required={true}
              onChange={(event) => {
                if (event.target.value.match(firstName.regEx)) {
                  setFirstName((prevState) => ({
                    ...prevState,
                    value: event.target.value,
                  }));
                }
              }}
              helperText={firstName.errorMessage}
              color={firstName.color}
              variant={firstName.variant}
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
              type="text"
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
