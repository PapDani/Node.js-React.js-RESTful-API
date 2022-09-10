import React, { useEffect, useState, useRef } from "react";
import Axios from "axios";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
//import ErroModal from "../components/ErrorModal";

import ReCAPTCHA from "react-google-recaptcha"

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

function Services(props) {

  const descMaxLength = 1000;
  const [maxPhoneInputLenght, setMaxPhoneInputLenght] = useState("");
  
  //const [error, setError] = useState();
  const [formVisible, setFormVisible] = useState(true);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [disabledSubmitBtn, setDisabledSubmitBtn] = useState(true);
  const [mobilCodeDisabled, setMobilCodeDisabled] = useState(true);
  const [phoneNumberDisabled, setPhoneNumberDisabled] = useState(true);
  const [regionTypeMobile, setRegionTypeMobile] = useState(false);
  const [regionTypeLandLine, setRegionTypeLandLine] = useState(false);

  const mobileCodes = [
    '20',
    '30',
    '70'
  ];

  /*
  const landLineCodes = [
    '1-es körzetszám – Budapest',
    '22-es körzetszám – Fejér megye',
    '23-as körzetszám – Pest megye',
    '24-es körzetszám – Pest megye',
    '25-ös körzetszám – Fejér megye',
    '26-os körzetszám – Pest megye',
    '27-es körzetszám – Pest megye',
    '28-as körzetszám – Pest megye',
    '29-es körzetszám – Pest megye',
    '32-es körzetszám – Nógrád megye',
    '33-as körzetszám – Komárom-Esztergom megye',
    '34-es körzetszám – Komárom-Esztergom megye',
    '35-ös körzetszám – Nógrád megye',
    '36-os körzetszám – Heves megye',
    '37-es körzetszám – Heves megye',
    '42-es körzetszám – Szabolcs-Szatmár-Bereg megye',
    '44-es körzetszám – Szabolcs-Szatmár-Bereg megye',
    '45-ös körzetszám – Szabolcs-Szatmár-Bereg megye',
    '46-os körzetszám – Borsod-Abaúj-Zemplén megye',
    '47-es körzetszám – Borsod-Abaúj-Zemplén megye',
    '48-as körzetszám – Borsod-Abaúj-Zemplén megye',
    '49-es körzetszám – Borsod-Abaúj-Zemplén megye',
    '52-es körzetszám – Hajdú-Bihar megye',
    '53-as körzetszám – Pest megye',
    '54-es körzetszám – Hajdú-Bihar megye',
    '56-os körzetszám – Jász-Nagykun-Szolnok megye',
    '57-es körzetszám – Jász-Nagykun-Szolnok megye',
    '59-es körzetszám – Jász-Nagykun-Szolnok megye',
    '62-es körzetszám – Csongrád megye',
    '63-as körzetszám – Csongrád megye',
    '66-os körzetszám – Békés megye',
    '68-as körzetszám – Békés megye',
    '69-es körzetszám – Baranya megye',
    '72-es körzetszám – Baranya megye',
    '73-as körzetszám – Baranya megye',
    '74-es körzetszám – Tolna megye',
    '75-ös körzetszám – Tolna megye',
    '76-os körzetszám – Bács-Kiskun megye',
    '77-es körzetszám – Bács-Kiskun megye',
    '78-as körzetszám – Bács-Kiskun megye',
    '79-es körzetszám – Bács-Kiskun megye',
    '82-es körzetszám – Somogy megye',
    '83-as körzetszám – Zala megye',
    '84-es körzetszám – Somogy megye',
    '85-ös körzetszám – Somogy megye',
    '87-es körzetszám – Veszprém megye',
    '88-as körzetszám – Veszprém megye',
    '89-es körzetszám – Veszprém megye',
    '92-es körzetszám – Zala megye',
    '93-as körzetszám – Zala megye',
    '94-es körzetszám – Vas megye',
    '95-ös körzetszám – Vas megye',
    '96-os körzetszám – Győr-Moson-Sopron megye',
    '99-es körzetszám – Győr-Moson-Sopron megye'
  ];
  */

  const landLineCodes = [
    '1-es körzetszám – Budapest',
    '22-es körzetszám – Fejér megye',
    '23-as körzetszám – Pest megye',
    '24-es körzetszám – Pest megye',
    '25-ös körzetszám – Fejér megye',
    '26-os körzetszám – Pest megye',
    '27-es körzetszám – Pest megye',
    '28-as körzetszám – Pest megye',
    '29-es körzetszám – Pest megye',
    '32-es körzetszám – Nógrád megye',
    '33-as körzetszám – Komárom-Esztergom megye',
    '34-es körzetszám – Komárom-Esztergom megye',
    '35-ös körzetszám – Nógrád megye',
    '36-os körzetszám – Heves megye',
    '37-es körzetszám – Heves megye',
    '42-es körzetszám – Szabolcs-Szatmár-Bereg megye',
    '44-es körzetszám – Szabolcs-Szatmár-Bereg megye',
    '45-ös körzetszám – Szabolcs-Szatmár-Bereg megye',
    '46-os körzetszám – Borsod-Abaúj-Zemplén megye',
    '47-es körzetszám – Borsod-Abaúj-Zemplén megye',
    '48-as körzetszám – Borsod-Abaúj-Zemplén megye',
    '49-es körzetszám – Borsod-Abaúj-Zemplén megye',
    '52-es körzetszám – Hajdú-Bihar megye',
    '53-as körzetszám – Pest megye',
    '54-es körzetszám – Hajdú-Bihar megye',
    '56-os körzetszám – Jász-Nagykun-Szolnok megye',
    '57-es körzetszám – Jász-Nagykun-Szolnok megye',
    '59-es körzetszám – Jász-Nagykun-Szolnok megye',
    '62-es körzetszám – Csongrád megye',
    '63-as körzetszám – Csongrád megye',
    '66-os körzetszám – Békés megye',
    '68-as körzetszám – Békés megye',
    '69-es körzetszám – Baranya megye',
    '72-es körzetszám – Baranya megye',
    '73-as körzetszám – Baranya megye',
    '74-es körzetszám – Tolna megye',
    '75-ös körzetszám – Tolna megye',
    '76-os körzetszám – Bács-Kiskun megye',
    '77-es körzetszám – Bács-Kiskun megye',
    '78-as körzetszám – Bács-Kiskun megye',
    '79-es körzetszám – Bács-Kiskun megye',
    '82-es körzetszám – Somogy megye',
    '83-as körzetszám – Zala megye',
    '84-es körzetszám – Somogy megye',
    '85-ös körzetszám – Somogy megye',
    '87-es körzetszám – Veszprém megye',
    '88-as körzetszám – Veszprém megye',
    '89-es körzetszám – Veszprém megye',
    '92-es körzetszám – Zala megye',
    '93-as körzetszám – Zala megye',
    '94-es körzetszám – Vas megye',
    '95-ös körzetszám – Vas megye',
    '96-os körzetszám – Győr-Moson-Sopron megye',
    '99-es körzetszám – Győr-Moson-Sopron megye'
  ];

  const [regionType, setRegionType] = useState([]);

  // eslint-disable-next-line no-useless-escape
  const nameRegex = /[!$%^&*()_+|~=`{}\[\]:\/;<>?,@#]/;

  const isMountedPhoneType = useRef(false);
  const isMountedPhoneCode = useRef(false);
  const isMountedFirstName = useRef(false);
  const isMountedLastName = useRef(false);
  const isMountedMobile = useRef(false);
  const isMountedEmail = useRef(false);
  const captchaRef = useRef(null);
  const firstNameHasError = useRef(true);
  const lastNameHasError = useRef(true);
  const mobileHasError = useRef(true);
  const mobilePhoneTypeHasError = useRef(true);
  const mobilePhoneCodeHasError = useRef(true);
  const emailHasError = useRef(true);

  const [description, setDescription] = useState("");

  const [mobilePhoneType, setMobilePhoneType] = useState({
    value: "",
    hasError: false,
    errorMessage: "",
    color: "primary",
    variant: "outlined",
  });

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
      firstNameHasError.current = true;

    } else {

      if (!firstName.value.match(nameRegex)) {
        setFirstName((prevState) => ({

          ...prevState,
          hasError: false,
          errorMessage: <CheckCircleSharpIcon />,
          color: "success",
          variant: "outlined",
        }));
        firstNameHasError.current = false;

      } else {

        setFirstName((prevState) => ({
          ...prevState,
          hasError: true,
          errorMessage: "Hibás név formátum!",
        }));
        firstNameHasError.current = true;

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
      lastNameHasError.current = true

    } else {

      if (!lastName.value.match(nameRegex)) {

        setLastName((prevState) => ({
          ...prevState,
          hasError: false,
          errorMessage: <CheckCircleSharpIcon />,
          color: "success",
          variant: "outlined",
        }));
        lastNameHasError.current = false

      } else {

        setLastName((prevState) => ({
          ...prevState,
          hasError: true,
          errorMessage: "Hibás név formátum!",
        }));
        lastNameHasError.current = true

      }
    }
  };

  const mobilePhoneTypeValidation = () => {

    if (!mobilePhoneType.value) {
      setMobilePhoneType((prevState) => ({
        ...prevState,
        hasError: true,
        errorMessage: "Kötelező választani",
      }));
      mobilePhoneTypeHasError.current = true
      setMobilCodeDisabled(true)
    } else {

      setMobilePhoneType((prevState) => ({
        ...prevState,
        hasError: false,
        errorMessage: <CheckCircleSharpIcon />,
        color: "success",
        variant: "outlined",
      }));
      mobilePhoneTypeHasError.current = false
      setMobilCodeDisabled(false);

      if(mobilePhoneType.value === "Mobil"){
        setRegionTypeMobile(true);
        setMaxPhoneInputLenght(7);
        setRegionType(mobileCodes);
        resetPhoneNumber();
        resetMobilePhoneCode();
      }
      else{
        setRegionTypeMobile(false);
      }

      if(mobilePhoneType.value === "Vezetekes"){
        setRegionTypeLandLine(true);
        setMaxPhoneInputLenght(6);
        setRegionType(landLineCodes);
        resetPhoneNumber();
        resetMobilePhoneCode();
      }
      else{
        setRegionTypeLandLine(false);
      }
    }
  };

  const mobilePhoneCodeValidation = () => {

    if (!mobilePhoneCode.value) {
      setMobilePhoneCode((prevState) => ({
        ...prevState,
        hasError: true,
        errorMessage: "Kötelező választani",
      }));
      mobilePhoneCodeHasError.current = true
      setPhoneNumberDisabled(true);

    } else {

      setMobilePhoneCode((prevState) => ({
        ...prevState,
        hasError: false,
        errorMessage: <CheckCircleSharpIcon />,
        color: "success",
        variant: "outlined",
      }));
      mobilePhoneCodeHasError.current = false
      setPhoneNumberDisabled(false);
    }
  };

  const mobileValidation = () => {
    if (!mobile.value) {

      setMobile((prevState) => ({
        ...prevState,
        hasError: true,
        errorMessage: "Kötelező kitölteni!",
      }));
      mobileHasError.current = true

    } else if (mobile.value.length < 7) {

      setMobile((prevState) => ({
        ...prevState,
        hasError: true,
        errorMessage: "7 karakter hosszúnak kell lennie!",
      }));
      mobileHasError.current = true

    } else {

      setMobile((prevState) => ({
        ...prevState,
        hasError: false,
        errorMessage: <CheckCircleSharpIcon />,
        color: "success",
        variant: "outlined",
      }));
      mobileHasError.current = false

    }
  };

  const landLineValidation = () => {
    if (!mobile.value) {

      setMobile((prevState) => ({
        ...prevState,
        hasError: true,
        errorMessage: "Kötelező kitölteni!",
      }));
      mobileHasError.current = true

    } else if (mobile.value.length < 6) {

      setMobile((prevState) => ({
        ...prevState,
        hasError: true,
        errorMessage: "6 karakter hosszúnak kell lennie!",
      }));
      mobileHasError.current = true

    } else {

      setMobile((prevState) => ({
        ...prevState,
        hasError: false,
        errorMessage: <CheckCircleSharpIcon />,
        color: "success",
        variant: "outlined",
      }));
      mobileHasError.current = false

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
      emailHasError.current = true

    } else {

      if (!userName || !domainName || !domain) {
        setEmail((prevState) => ({
          ...prevState,
          hasError: true,
          errorMessage: "Hiányos email cím!",
        }));
        emailHasError.current = true
      } else if (email.value.length > 320) {
        setEmail((prevState) => ({
          ...prevState,
          hasError: true,
          errorMessage: "Maximum 320 karakter husszú lehet!",
        }));
        emailHasError.current = true
      } else if (!email.value.match(email.regEx)) {

        setEmail((prevState) => ({
          ...prevState,
          hasError: true,
          errorMessage: "Hibás email cím formátum!",
        }));
        emailHasError.current = true
      } else {

        setEmail((prevState) => ({
          ...prevState,
          hasError: false,
          errorMessage: <CheckCircleSharpIcon />,
          color: "success",
          variant: "outlined",
        }));
        emailHasError.current = false
      }
    }
  };

  const resetPhoneNumber = () => {
    setMobile((prevState) => ({
      ...prevState,
      value: ""
    }));
  }

  const resetMobilePhoneCode = () => {
    setMobilePhoneCode((prevState) => ({
      ...prevState,
      value: ""
    }))
  }

  useEffect(() => {
    if(isMountedEmail.current){
      emailValidation();
      checkForm(); //EZt miért ide raktuk, Márk?
      console.log("validálok");
    }
    else{
      //isMounted.current = true;
      console.log("nem validálok");
    }
  }, [email.value]);

  useEffect(() => {
    if(isMountedLastName.current){
      lastNameValidation();
    }
    else{
      console.log("nem valiádlok");
    }
    // console.log(`Vezetéknév értéke: ${Boolean(
    // lastName.value
    // )}, ${lastName.value}`);
  }, [lastName.value]);

  useEffect(() => {
    if(isMountedFirstName.current){
      firstNameValidation();
    }
    else{
      console.log("nem valiádlok");
    }
    // console.log(`Keresztnév értéke: ${Boolean(
    //   firstName.value
    // )}, ${firstName.value}`);
  }, [firstName.value]);

  useEffect(() => {
    if(isMountedMobile.current && regionTypeMobile){
       mobileValidation();
    }
    else if(isMountedMobile.current && regionTypeLandLine){
      landLineValidation();
    }
    else{
      console.log("nem validálok");
    }
    // console.log(`Mobil értéke: ${Boolean(mobile.value)}, ${mobile.value}`);
  }, [mobile.value]);

  useEffect(() => {
    if(isMountedPhoneType.current){
      mobilePhoneTypeValidation();
    }
    else{
      console.log("nem valiádlok");
    }
    
  }, [mobilePhoneType.value]);

  useEffect(() => {
    if(isMountedPhoneCode.current){
      mobilePhoneCodeValidation();
    }
    else{
      console.log("nem valiádlok");
    }
    
  }, [mobilePhoneCode.value]);

  const handleSubmit = (event) => {
    event.preventDefault();
    captchaRef.current.reset(); //ez mit is csinál?

    if (
      !lastName.hasError &&
      !firstName.hasError &&
      !mobile.hasError &&
      !email.hasError &&
      !mobilePhoneCode.hasError &&
      !mobilePhoneType.hasError
    ) {
      submitFormData();
      alert("Front-end: Siker!");
    } else {
      alert("Front-end: Hibásan lett átengedve a form!");
    }
  };

  const checkForm = () => {
    if (
      firstNameHasError.current === false &&
      lastNameHasError.current === false &&
      mobileHasError.current === false &&
      mobilePhoneCodeHasError.current === false &&
      mobilePhoneTypeHasError.current === false &&
      emailHasError.current === false
      ) {
      setShowCaptcha(true);
    }
  }

  const verifyCaptcha = async () => {
    const token = captchaRef.current.getValue();

    await Axios.post(process.env.REACT_APP_SERVER_URL + process.env.REACT_APP_CAPTCHA_URL, {token})
    .then(res => {
      
      if (res.status === 200){
        setDisabledSubmitBtn(false);
      }else{
        setDisabledSubmitBtn(true);
      };
    })
    .catch((error) => {
    console.log(error);
    })

  }

  const formData = {
    lastName: lastName.value,
    firstName: firstName.value,
    mobileNum: `06${mobilePhoneCode.value}${mobile.value}`,
    email: email.value,
    description: description,
  };

  const submitFormData = async () => {
    try {
      console.log(formData);
      const response = await Axios.post(
        "http://localhost:3001/api/submitForm",
        formData
      ).then((response) => {
        if(response.status === 200){
          //Sikeres küldés után másik "aloldalra" navigálás
          
          setFormVisible(false);

          setAlertType("success");
          setAlertMessage(response.data.message);
          setAlertTitle("Siker!");
          setAlertVisible(true);

           //alert("Back-end message: " + response.data.message);
        }
      }).catch((error) => { //ezt valszeg nem így kell. PLis HELP MEE
        if(response.status === 403){
          alert(response.data.message);
          //setError(); Tamás svarmüllere react tutorial
        }
      });
    } catch (error) {
     // alert("submitFormData error: " + error.response.data);
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
        {formVisible && (
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
                isMountedLastName.current = true;
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
                isMountedFirstName.current = true;
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

            <FormControl style={{ minWidth: 200 }}>
              <InputLabel id="phone-types-label">Mobil/Vezetékes *</InputLabel>
              <Select
                error={mobilePhoneType.hasError}
                id="phone-types-select"
                labelId="phone-types-label"
                value={mobilePhoneType.value}
                required={true}
                label="Mobil/Vezetékes *"
                color={mobilePhoneType.color}
                onChange={(event) => {
                  isMountedPhoneType.current = true;
                  setMobilePhoneType((prevState) => ({
                    ...prevState,
                    value: event.target.value,
                  }));
                }}
              >
                <MenuItem value={"Mobil"}>Mobil</MenuItem>
                <MenuItem value={"Vezetekes"}>Vezetékes</MenuItem>
              </Select>
              <FormHelperText
                error={mobilePhoneType.hasError}
                variant={mobilePhoneType.variant}
              >
                {mobilePhoneType.errorMessage}
              </FormHelperText>
            </FormControl>

            <FormControl style={{ minWidth: 450 }}>
              <InputLabel id="phone-codes-label">Körzetszám *</InputLabel>
              <Select
                error={mobilePhoneCode.hasError}
                id="phone-codes-select"
                labelId="phone-codes-label"
                value={mobilePhoneCode.value}
                required={true}
                label="Körzetszám *"
                disabled={mobilCodeDisabled}
                color={mobilePhoneCode.color}
                onChange={(event) => {
                  isMountedPhoneCode.current = true;
                  setMobilePhoneCode((prevState) => ({
                    ...prevState,
                    value: event.target.value,
                  }));
                }}
              >
                {regionType.map((val) => (
                    <MenuItem
                        key={val}
                        value={val}
                    >
                    {val}
                    </MenuItem>
                ))}
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
              label="Telefonszám"
              placeholder="Telefonszám"
              value={mobile.value}
              required={true}
              disabled={phoneNumberDisabled}
              onChange={(event) => {
                isMountedMobile.current = true;
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
              inputProps={{maxLength: maxPhoneInputLenght}}
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
                isMountedEmail.current = true;
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
              value={description.value}
              onChange={(event) => setDescription(event.target.value)}
              inputProps={{maxLength: descMaxLength}}
              helperText={`${description.length}/${descMaxLength}`}
            />
          </div>

          {showCaptcha && (
            <ReCAPTCHA
              sitekey={process.env.REACT_APP_SITE_KEY}
              ref={captchaRef}
              onChange={verifyCaptcha}
            />
          )}

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
            disabled={disabledSubmitBtn}
          >
            Küldés
          </Button>
        </form>
        )}
        
        <div>
          {alertVisible && (
            <Alert severity={alertType}>
            <AlertTitle>{alertTitle}</AlertTitle>
               <strong>{alertMessage}</strong>
            </Alert>
          )}
        </div>
      </Box>
    </div>
  );
}

export default Services;
