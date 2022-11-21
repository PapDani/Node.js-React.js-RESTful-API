import React, { useEffect, useState, useRef } from "react";
import Axios from "axios";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from "@mui/material/Stack";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
//import ErroModal from "../components/ErrorModal";

import ReCAPTCHA from "react-google-recaptcha"
import "./Offer.css";

import { createTheme, ThemeProvider } from "@mui/material/styles";

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

const theme = createTheme({
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 768,
      laptop: 1024,
      desktop: 1440,
    },
  }
},
);

function Services(props) {

  const descMaxLength = 1000;
  const [maxPhoneInputLenght, setMaxPhoneInputLenght] = useState("");
  const [maxPhoneLandLineInputLenght, setPhoneLandLineInputLength] = useState("");

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
    { num: '20', label: '20' },
    { num: '30', label: '30' },
    { num: '70', label: '70' },
    { num: '999', label: 'Egyéb'}
  ];

  //körzetek osztályként 

  class landLineCode {
    constructor(num, label) {
      this.num = num;
      this.label = label;
    }
  }

  const landLineCodes = [
    new landLineCode("1", "1-es - Budapest"),
    new landLineCode("22", "22-es - Fejér megye"),
    new landLineCode("23", "23-as - Pest megye"),
    new landLineCode("24", "24-es - Pest megye"),
    new landLineCode("25", "25-ös - Fejér megye"),
    new landLineCode("26", "26-os - Pest megye"),
    new landLineCode("27", "27-es - Pest megye"),
    new landLineCode("28", "28-as - Pest megye"),
    new landLineCode("29", "29-es - Pest megye"),
    new landLineCode("32", "32-es - Nógrád megye"),
    new landLineCode("33", "33-as - Komárom-Esztergom megye"),
    new landLineCode("34", "34-es - Komárom-Esztergom megye"),
    new landLineCode("35", "35-ös - Nógrád megye"),
    new landLineCode("36", "36-os - Heves megye"),
    new landLineCode("37", "37-es - Heves megye"),
    new landLineCode("42", "42-es - Szabolcs-Szatmár-Bereg megye"),
    new landLineCode("44", "44-es - Szabolcs-Szatmár-Bereg megye"),
    new landLineCode("45", "45-ös - Szabolcs-Szatmár-Bereg megye"),
    new landLineCode("46", "46-os - Borsod-Abaúj-Zemplén megye"),
    new landLineCode("47", "47-es - Borsod-Abaúj-Zemplén megye"),
    new landLineCode("48", "48-as - Borsod-Abaúj-Zemplén megye"),
    new landLineCode("49", "49-es - Borsod-Abaúj-Zemplén megye"),
    new landLineCode("52", "52-es - Hajdú-Bihar megye"),
    new landLineCode("53", "53-as - Pest megye"),
    new landLineCode("54", "54-es - Hajdú-Bihar megye"),
    new landLineCode("56", "56-os - Jász-Nagykun-Szolnok megye"),
    new landLineCode("57", "57-es - Jász-Nagykun-Szolnok megye"),
    new landLineCode("59", "59-es - Jász-Nagykun-Szolnok megye"),
    new landLineCode("62", "62-es - Csongrád megye"),
    new landLineCode("63", "63-as - Csongrád megye"),
    new landLineCode("66", "66-os - Békés megye"),
    new landLineCode("68", "68-as - Békés megye"),
    new landLineCode("69", "69-es - Baranya megye"),
    new landLineCode("72", "72-es - Baranya megye"),
    new landLineCode("73", "73-as - Baranya megye"),
    new landLineCode("74", "74-es - Tolna megye"),
    new landLineCode("75", "75-ös - Tolna megye"),
    new landLineCode("76", "76-os - Bács-Kiskun megye"),
    new landLineCode("77", "77-es - Bács-Kiskun megye"),
    new landLineCode("78", "78-as - Bács-Kiskun megye"),
    new landLineCode("79", "79-es - Bács-Kiskun megye"),
    new landLineCode("82", "82-es - Somogy megye"),
    new landLineCode("83", "83-as - Zala megye"),
    new landLineCode("84", "84-es - Somogy megye"),
    new landLineCode("85", "85-ös - Somogy megye"),
    new landLineCode("87", "87-es - Veszprém megye"),
    new landLineCode("88", "88-as - Veszprém megye"),
    new landLineCode("89", "89-es - Veszprém megye"),
    new landLineCode("92", "92-es - Zala megye"),
    new landLineCode("93", "93-as - Zala megye"),
    new landLineCode("94", "94-es - Vas megye"),
    new landLineCode("95", "95-ös - Vas megye"),
    new landLineCode("96", "96-os - Győr-Moson-Sopron megye"),
    new landLineCode("99", "99-es - Győr-Moson-Sopron megye"),
  ]

  const [regionType, setRegionType] = useState([]);
  const [phoneRegionCodeOtherShow, setPhoneRegionCodeOtherShow] = useState(false);

  // eslint-disable-next-line no-useless-escape
  const nameRegex = /[!$%^&*()_+|~=`{}\[\]:\/;<>?,@#]/;

  const isMountedPhoneType = useRef(false);
  const isMountedPhoneRegionCode = useRef(false);
  const isMountedPhoneRegionCodeOther = useRef(false);
  const isMountedFirstName = useRef(false);
  const isMountedLastName = useRef(false);
  const isMountedMobile = useRef(false);
  const isMountedEmail = useRef(false);
  const captchaRef = useRef(null);
  const firstNameHasError = useRef(true);
  const lastNameHasError = useRef(true);
  const mobileHasError = useRef(true);
  const mobilePhoneTypeHasError = useRef(true);
  const phoneRegionCodeHasError = useRef(true);
  const phoneRegionCodeOtherHasError = useRef(true);
  const emailHasError = useRef(true);

  const [description, setDescription] = useState("");

  const [mobilePhoneType, setMobilePhoneType] = useState({
    value: "",
    hasError: false,
    errorMessage: "",
    color: "primary",
    variant: "outlined",
  });

  const [phoneRegionCode, setPhoneRegionCode] = useState({
    value: "",
    hasError: false,
    errorMessage: "",
    color: "primary",
    variant: "outlined",
  });

  const [phoneRegionCodeOther, setPhoneRegionCodeOther] = useState({
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
        errorMessage: "Kötelező kitölteni!"
      }));
      firstNameHasError.current = true;

    } else if (firstName.value.length < 2) {
      setFirstName((prevState) => ({
        ...prevState,
        hasError: true,
        errorMessage: "Minimum 2 karakter hosszúnak kell lennie!"
      }));
    } else if (!firstName.value.match(nameRegex)) { //Kétszer van a regex ellenőrizve, a mobilszámnál meg egyszer???
      setFirstName((prevState) => ({

        ...prevState,
        hasError: false,
        errorMessage: <CheckCircleSharpIcon />,
        color: "success",
        variant: "outlined"
      }));
      firstNameHasError.current = false;

    } else {

      setFirstName((prevState) => ({
        ...prevState,
        hasError: true,
        errorMessage: "Hibás név formátum!"
      }));
      firstNameHasError.current = true;
    }

  };

  const lastNameValidation = () => {

    if (!lastName.value) {

      setLastName((prevState) => ({
        ...prevState,
        hasError: true,
        errorMessage: "Kötelező kitölteni!"
      }));
      lastNameHasError.current = true

    } else if (lastName.value.length < 2) {
      setLastName((prevState) => ({
        ...prevState,
        hasError: true,
        errorMessage: "Minimum 2 karakter hosszúnak kell lennie!"
      }))
    } else if (!lastName.value.match(nameRegex)) {

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

      if (mobilePhoneType.value === "Mobil") {
        setRegionTypeMobile(true);
        setMaxPhoneInputLenght(7);
        setRegionType(mobileCodes);
        resetPhoneNumber();
        resetPhoneRegionCode();
        resetPhoneRegionCodeOther();
        setPhoneLandLineInputLength(2);
      }
      else {
        setRegionTypeMobile(false);
      }

      if (mobilePhoneType.value === "Vezetekes") {
        setRegionTypeLandLine(true);
        setMaxPhoneInputLenght(6);
        //setRegionType(landLineCodes);
        resetPhoneNumber();
        resetPhoneRegionCode();
        resetPhoneRegionCodeOther();
        setPhoneRegionCodeOtherShow(false);
        setPhoneLandLineInputLength(2);
      }
      else {
        setRegionTypeLandLine(false);
      }
    }
  };

  const phoneRegionCodeMobileValidation = () => {

    if (!phoneRegionCode.value) {
      setPhoneRegionCode((prevState) => ({
        ...prevState,
        hasError: true,
        errorMessage: "Kötelező kitölteni",
      }));
      phoneRegionCodeHasError.current = true
      setPhoneNumberDisabled(true);
      setPhoneRegionCodeOtherShow(false);

    } else {

      if(phoneRegionCode.value.match(999)){
        setPhoneRegionCode((prevState) => ({
          ...prevState,
          hasError: false,
          errorMessage: <CheckCircleSharpIcon />,
          color: "success",
          variant: "outlined",
        }));
        phoneRegionCodeHasError.current = false
        setPhoneNumberDisabled(true);
        setPhoneRegionCodeOtherShow(true);
        resetPhoneRegionCodeOther();
      }
      else{
        setPhoneRegionCode((prevState) => ({
          ...prevState,
          hasError: false,
          errorMessage: <CheckCircleSharpIcon />,
          color: "success",
          variant: "outlined",
        }));
        phoneRegionCodeHasError.current = false
        setPhoneNumberDisabled(false);
        setPhoneRegionCodeOtherShow(false);
      }

    }
  };

  const phoneRegionCodeLandLineValidation = () => {
    console.log("1:" + phoneRegionCode.value);

    if (!phoneRegionCode.value) {
      setPhoneRegionCode((prevState) => ({
        ...prevState,
        hasError: true,
        errorMessage: "Kötelező kitölteni",
      }));
      phoneRegionCodeHasError.current = true
      setPhoneNumberDisabled(true);

    } else if (phoneRegionCode.value.length < 2 && !phoneRegionCode.value.match(1)) {
      setPhoneRegionCode((prevState) => ({
        ...prevState,
        hasError: true,
        errorMessage: "2 karakter hosszúnak kell lennie!",
      }));
      phoneRegionCodeHasError.current = true
      setPhoneNumberDisabled(true);

    } else {

      setPhoneRegionCode((prevState) => ({
        ...prevState,
        hasError: false,
        errorMessage: <CheckCircleSharpIcon />,
        color: "success",
        variant: "outlined",
      }));
      phoneRegionCodeHasError.current = false
      setPhoneNumberDisabled(false);
    }
  };

  const phoneRegionCodeOtherValidation = () => {
    console.log("RegionCodeOtherValidation:" + phoneRegionCodeOther.value);

    if (!phoneRegionCodeOther.value) {
      setPhoneRegionCodeOther((prevState) => ({
        ...prevState,
        hasError: true,
        errorMessage: "Kötelező kitölteni",
      }));
      phoneRegionCodeOtherHasError.current = true
      setPhoneNumberDisabled(true);

    } else if (phoneRegionCodeOther.value.length < 2) {
      setPhoneRegionCodeOther((prevState) => ({
        ...prevState,
        hasError: true,
        errorMessage: "2 karakter hosszúnak kell lennie!",
      }));
      phoneRegionCodeOtherHasError.current = true
      setPhoneNumberDisabled(true);

    } else {

      setPhoneRegionCodeOther((prevState) => ({
        ...prevState,
        hasError: false,
        errorMessage: <CheckCircleSharpIcon />,
        color: "success",
        variant: "outlined",
      }));
      phoneRegionCodeOtherHasError.current = false
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
      } else if (email.value.length < 9) {
        setEmail((prevState) => ({
          ...prevState,
          hasError: true,
          errorMessage: "Minimum 9 karakter hosszúnak kell lennie!",
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

  const resetPhoneRegionCode = () => {
    setPhoneRegionCode((prevState) => ({
      ...prevState,
      value: ""
    }))
  }

  const resetPhoneRegionCodeOther = () => {
    setPhoneRegionCodeOther((prevState) => ({
      ...prevState,
      value: ""
    }))
  }

  useEffect(() => {
    if (isMountedPhoneRegionCodeOther.current) {
      phoneRegionCodeOtherValidation();
      checkForm();
      console.log("validálok");
    }
    else {
      //isMounted.current = true;
      console.log("nem validálok");
    }
  }, [phoneRegionCodeOther.value]);

  useEffect(() => {
    if (isMountedEmail.current) {
      emailValidation();
      checkForm();
      console.log("validálok");
    }
    else {
      //isMounted.current = true;
      console.log("nem validálok");
    }
  }, [email.value]);

  useEffect(() => {
    if (isMountedLastName.current) {
      lastNameValidation();
      checkForm();
    }
    else {
      console.log("nem valiádlok");
    }
    // console.log(`Vezetéknév értéke: ${Boolean(
    // lastName.value
    // )}, ${lastName.value}`);
  }, [lastName.value]);

  useEffect(() => {
    if (isMountedFirstName.current) {
      firstNameValidation();
      checkForm(); //EZt miért ide raktuk, Márk?
    }
    else {
      console.log("nem valiádlok");
    }
    // console.log(`Keresztnév értéke: ${Boolean(
    //   firstName.value
    // )}, ${firstName.value}`);
  }, [firstName.value]);

  useEffect(() => {
    if (isMountedMobile.current && regionTypeMobile) {
      mobileValidation();
      checkForm();
    }
    else if (isMountedMobile.current && regionTypeLandLine) {
      landLineValidation();
      checkForm();
    }
    else {
      console.log("nem validálok");
    }
    // console.log(`Mobil értéke: ${Boolean(mobile.value)}, ${mobile.value}`);
  }, [mobile.value]);

  useEffect(() => {
    if (isMountedPhoneRegionCode.current && regionTypeMobile) {
      phoneRegionCodeMobileValidation();
      checkForm();
    }
    else if (isMountedPhoneRegionCode.current && regionTypeLandLine) {
      phoneRegionCodeLandLineValidation();
      checkForm();
    }
    else {
      console.log("nem validálok");
    }
    // console.log(`Mobil értéke: ${Boolean(mobile.value)}, ${mobile.value}`);
  }, [phoneRegionCode.value]);

  useEffect(() => {
    if (isMountedPhoneType.current) {
      mobilePhoneTypeValidation();
      checkForm();
    }
    else {
      console.log("nem valiádlok");
    }

  }, [mobilePhoneType.value]);

  const handleSubmit = (event) => {
    event.preventDefault();
    captchaRef.current.reset(); //ez mit is csinál?

    if (
      /* !lastName.hasError &&
      !firstName.hasError &&
      !mobile.hasError &&
      !email.hasError &&
      !phoneRegionCode.hasError &&
      !phoneRegionCodeOther.hasError &&
      !mobilePhoneType.hasError */
      true
    ) {
      submitFormData();
      alert("Front-end: Siker!");
    } else {
      alert("Front-end: Hibásan lett átengedve a form!");
    }
  };

/* (isMountedFirstName === true && firstNameHasError.current === false) &&
  (isMountedLastName === true && lastNameHasError.current === false) &&
  (isMountedMobile === true && mobileHasError.current === false) &&
  (isMountedPhoneRegionCode === true && phoneRegionCodeHasError.current === false) &&
  (isMountedPhoneRegionCodeOther === true && phoneRegionCodeOtherHasError.current === false) &&
  (isMountedPhoneType === true && mobilePhoneTypeHasError.current === false) &&
  (isMountedEmail === true && emailHasError.current === false) */

  var errors = 0;

  const checkFormErrors = () => {
    if(isMountedFirstName) {
      if(firstNameHasError.current === true){
        errors++;
      }
    }

    if(isMountedLastName){
      if(lastNameHasError.current === true){
        errors++;
      }
    }

    if(isMountedEmail){
      if(emailHasError.current === true){
        errors++;
      }
    }

    if(isMountedPhoneType){
      if(mobilePhoneTypeHasError.current === true){
        errors++;
      }
    }

    if(isMountedPhoneRegionCode){
      if(phoneRegionCodeHasError.current === true){
        errors++;
      }
    }

    if(isMountedPhoneRegionCodeOther){
      if(phoneRegionCodeOtherHasError.current === true){
        errors++;
      }
    }

    if(isMountedMobile){
      if(mobileHasError.current === true){
        errors++;
      }
    }
  }

  const checkForm = () => {
    if (true) {
      setShowCaptcha(true);
    }
  }

  const verifyCaptcha = async () => {
    const token = captchaRef.current.getValue();

    await Axios.post(process.env.REACT_APP_SERVER_URL + process.env.REACT_APP_CAPTCHA_URL, { token })
      .then(res => {

        if (res.status === 200) {
          setDisabledSubmitBtn(false);
        } else {
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
    //mobileNum: `06${phoneRegionCode.value}${mobile.value}`,
    regionCode: (phoneRegionCode.value.match(999)) ? phoneRegionCodeOther.value : phoneRegionCode.value,
    phoneNumber: mobile.value,
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
        if (response.status === 200) {
          //Sikeres küldés után másik "aloldalra" navigálás

          setFormVisible(false);

          setAlertType("success");
          setAlertMessage(response.data.message);
          setAlertTitle("Siker!");
          setAlertVisible(true);

          //alert("Back-end message: " + response.data.message);
        }
      }).catch((error) => {
        setFormVisible(true);

        setAlertType(error.response.data.alertType);
        setAlertMessage(error.response.data.message);
        setAlertTitle(error.response.data.alertTitle);
        setAlertVisible(true);
      })
    } catch (error) {
      // alert("submitFormData error: " + error.response.data);
    }
  };


  return (
    <div>
      <ThemeProvider theme={theme}>
        {formVisible && (
          <form onSubmit={handleSubmit}>
            <Stack
              direction={{ mobile: "column", laptop: "row" }}
              spacing={{ mobile: 1, desktop: 6 }}
              mb={1}
              justifyContent="center"
              alignItems="center"
            >
              <TextField
                sx={{
                  width: {
                    mobile: "100%",
                  },
                  height: 90
                }}
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
                inputProps={{ maxLength: 20, minLength: 2 }}
              />

              <TextField
                sx={{
                  width: {
                    mobile: "100%",
                  },
                  height: 90
                }}
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
                inputProps={{ maxLength: 20, minLength: 2 }}
              />

              <TextField
                sx={{
                  width: {
                    mobile: "100%",
                  },
                  height: 90
                }}
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
                inputProps={{ maxLength: 50, minLength: 8 }}
              />
            </Stack>

            <Stack
              direction={{ mobile: "column", laptop: "row" }}
              spacing={{ mobile: 1, desktop: 6 }}
              mb={1}
              justifyContent="center"
              alignItems="center"
            >
              <FormControl
                sx={{
                  minWidth: 200,
                  width: {
                    mobile: "100%",
                  },
                  height: 90
                }}
              >
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

              {!regionTypeMobile && (
                <TextField
                sx={{
                  width: {
                    mobile: "100%",
                  },
                  height: 90
                }}
                error={phoneRegionCode.hasError}
                id="vezetekes"
                label="Körzetszám"
                placeholder="Körzetszám"
                value={phoneRegionCode.value}
                required={true}
                disabled={mobilCodeDisabled}
                onChange={(event) => {
                  isMountedPhoneRegionCode.current = true;
                  if (event.target.value.match(mobile.regEx)) {
                    setPhoneRegionCode((prevState) => ({
                      ...prevState,
                      value: event.target.value,
                    }));
                  }
                }}
                helperText={phoneRegionCode.errorMessage}
                color={phoneRegionCode.color}
                variant={phoneRegionCode.variant}
                inputProps={{ maxLength: maxPhoneLandLineInputLenght }}
              />
              )}

              {regionTypeMobile && (
                <FormControl
                sx={{
                  minWidth: 300,
                  width: {
                    mobile: "100%",
                  },
                  height: 90
                }}
              >
                <InputLabel id="phone-codes-label">Körzetszám *</InputLabel>
                <Select
                  error={phoneRegionCode.hasError}
                  id="phone-codes-select"
                  labelId="phone-codes-label"
                  value={phoneRegionCode.value}
                  required={true}
                  label="Körzetszám *"
                  disabled={mobilCodeDisabled}
                  color={phoneRegionCode.color}
                  onChange={(event) => {
                    isMountedPhoneRegionCode.current = true;
                    setPhoneRegionCode((prevState) => ({
                      ...prevState,
                      value: event.target.value,
                    }));
                  }}
                >

                  {/* mappolás stringtömbhöz */}
                  {/*   {regionType.map((val) => (
                    <MenuItem
                        key={val.num}
                        value={val.num}
                    >
                    {val.label}
                    </MenuItem>
                ))} */}

                  {/* mappolás objektumtömbhöz */}
                  {
                    regionType.map(val => {
                      //változók és console.log használata, stringtömbből to objektumtömbbé, deklarálva 21. sornál
                      /* numtemp = val.slice(0,2);
                       strtemp = `${strtemp}\n{ num: "${numtemp}", label: "${val}" },`;
                       console.log(strtemp);*/

                      //változók és console.log használata, stringtömbből to osztály objektumtömbbé, deklarálva 21. sornál
                      /*numtemp = val.slice(0,2);
                      strtemp = `${strtemp}\n new landLineCode ("${numtemp}", "${val}"),`;
                      console.log(strtemp);*/
                      return <MenuItem
                        key={val.num}
                        value={val.num}
                      >
                        {val.label}
                      </MenuItem>
                    })
                  }
                </Select>
                <FormHelperText
                  error={phoneRegionCode.hasError}
                  variant={phoneRegionCode.variant}
                >
                  {phoneRegionCode.errorMessage}
                </FormHelperText>
              </FormControl>
              )}

              {phoneRegionCodeOtherShow && (
                <TextField
                sx={{
                  width: {
                    mobile: "100%",
                  },
                  height: 90
                }}
                error={phoneRegionCodeOther.hasError}
                id="vezetekes2"
                label="Körzetszám2"
                placeholder="Körzetszám"
                value={phoneRegionCodeOther.value}
                required={true}
                disabled={mobilCodeDisabled}
                onChange={(event) => {
                  isMountedPhoneRegionCodeOther.current = true;
                  if (event.target.value.match(mobile.regEx)) {
                    setPhoneRegionCodeOther((prevState) => ({
                      ...prevState,
                      value: event.target.value,
                    }));
                  }
                }}
                helperText={phoneRegionCodeOther.errorMessage}
                color={phoneRegionCodeOther.color}
                variant={phoneRegionCodeOther.variant}
                inputProps={{ maxLength: maxPhoneLandLineInputLenght }}
              />
              )}

              <TextField
                sx={{
                  width: {
                    mobile: "100%",
                  },
                  height: 90
                }}
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
                inputProps={{ maxLength: maxPhoneInputLenght }}
              />
            </Stack>

            <Stack direction={{ mobile: "column", laptop: "row" }}
              spacing={{ mobile: 1, desktop: 6 }}
              sx={{
                marginBottom: {
                  mobile: 7
                }
              }}
              justifyContent="center"
              alignItems="center">
              <TextField
                sx={{
                  width: {
                    mobile: "100%",
                  },
                  height: 90
                }}
                multiline
                rows={3}
                placeholder="Kérjük írja le, hogy miben segíthetünk"
                label="Leírás"
                value={description.value}
                onChange={(event) => setDescription(event.target.value)}
                inputProps={{ maxLength: descMaxLength }}
                helperText={`${description.length}/${descMaxLength}`}
              />
            </Stack>

            <Stack direction={{ mobile: "column", laptop: "row" }}
              spacing={{ mobile: 1, desktop: 6 }}
              mb={1}
              justifyContent="center"
              alignItems="center">

              {showCaptcha && (
                <ReCAPTCHA
                  id="recaptcha"
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
            </Stack>


          </form>
        )}

        <div>
          {alertVisible && (
            <Alert severity={alertType} action={
              <Button color="inherit" size="small" onClick={() => { setAlertVisible(false) }}>
                Ok
              </Button>
            }>
              <AlertTitle>{alertTitle}</AlertTitle>
              <strong>{alertMessage}</strong>
            </Alert>
          )}
        </div>

      </ThemeProvider>
    </div>
  );
}

export default Services;
