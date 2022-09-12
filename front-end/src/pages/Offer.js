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
let strtemp = '';
let numtemp = '';
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
    { num: '20', label: '20'},
    { num: '30', label: '30'},
    { num: '70', label: '70'},
  ];

  //körzetek tömbben -nem használt, lecserélve objektumtömbre
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

//körzetek objektumként, tömbbe téve -jelenleg használt
/*  const landLineCodes = [   
    { num: "1", label: "1-es körzetszám – Budapest" },
    { num: "22", label: "22-es körzetszám – Fejér megye" },
    { num: "23", label: "23-as körzetszám – Pest megye" },
    { num: "24", label: "24-es körzetszám – Pest megye" },
    { num: "25", label: "25-ös körzetszám – Fejér megye" },
    { num: "26", label: "26-os körzetszám – Pest megye" },
    { num: "27", label: "27-es körzetszám – Pest megye" },
    { num: "28", label: "28-as körzetszám – Pest megye" },
    { num: "29", label: "29-es körzetszám – Pest megye" },
    { num: "32", label: "32-es körzetszám – Nógrád megye" },
    { num: "33", label: "33-as körzetszám – Komárom-Esztergom megye" },
    { num: "34", label: "34-es körzetszám – Komárom-Esztergom megye" },
    { num: "35", label: "35-ös körzetszám – Nógrád megye" },
    { num: "36", label: "36-os körzetszám – Heves megye" },
    { num: "37", label: "37-es körzetszám – Heves megye" },
    { num: "42", label: "42-es körzetszám – Szabolcs-Szatmár-Bereg megye" },
    { num: "44", label: "44-es körzetszám – Szabolcs-Szatmár-Bereg megye" },
    { num: "45", label: "45-ös körzetszám – Szabolcs-Szatmár-Bereg megye" },
    { num: "46", label: "46-os körzetszám – Borsod-Abaúj-Zemplén megye" },
    { num: "47", label: "47-es körzetszám – Borsod-Abaúj-Zemplén megye" },
    { num: "48", label: "48-as körzetszám – Borsod-Abaúj-Zemplén megye" },
    { num: "49", label: "49-es körzetszám – Borsod-Abaúj-Zemplén megye" },
    { num: "52", label: "52-es körzetszám – Hajdú-Bihar megye" },
    { num: "53", label: "53-as körzetszám – Pest megye" },
    { num: "54", label: "54-es körzetszám – Hajdú-Bihar megye" },
    { num: "56", label: "56-os körzetszám – Jász-Nagykun-Szolnok megye" },
    { num: "57", label: "57-es körzetszám – Jász-Nagykun-Szolnok megye" },
    { num: "59", label: "59-es körzetszám – Jász-Nagykun-Szolnok megye" },
    { num: "62", label: "62-es körzetszám – Csongrád megye" },
    { num: "63", label: "63-as körzetszám – Csongrád megye" },
    { num: "66", label: "66-os körzetszám – Békés megye" },
    { num: "68", label: "68-as körzetszám – Békés megye" },
    { num: "69", label: "69-es körzetszám – Baranya megye" },
    { num: "72", label: "72-es körzetszám – Baranya megye" },
    { num: "73", label: "73-as körzetszám – Baranya megye" },
    { num: "74", label: "74-es körzetszám – Tolna megye" },
    { num: "75", label: "75-ös körzetszám – Tolna megye" },
    { num: "76", label: "76-os körzetszám – Bács-Kiskun megye" },
    { num: "77", label: "77-es körzetszám – Bács-Kiskun megye" },
    { num: "78", label: "78-as körzetszám – Bács-Kiskun megye" },
    { num: "79", label: "79-es körzetszám – Bács-Kiskun megye" },
    { num: "82", label: "82-es körzetszám – Somogy megye" },
    { num: "83", label: "83-as körzetszám – Zala megye" },
    { num: "84", label: "84-es körzetszám – Somogy megye" },
    { num: "85", label: "85-ös körzetszám – Somogy megye" },
    { num: "87", label: "87-es körzetszám – Veszprém megye" },
    { num: "88", label: "88-as körzetszám – Veszprém megye" },
    { num: "89", label: "89-es körzetszám – Veszprém megye" },
    { num: "92", label: "92-es körzetszám – Zala megye" },
    { num: "93", label: "93-as körzetszám – Zala megye" },
    { num: "94", label: "94-es körzetszám – Vas megye" },
    { num: "95", label: "95-ös körzetszám – Vas megye" },
    { num: "96", label: "96-os körzetszám – Győr-Moson-Sopron megye" },
    { num: "99", label: "99-es körzetszám – Győr-Moson-Sopron megye" },
  ];
*/

  //körzetek osztályként 

  class landLineCode {
    constructor(num, label) {
      this.num = num;
      this.label = label; 
    }
  }

  const landLineCodes = [
    new landLineCode ("1", "1-es körzetszám – Budapest"),
    new landLineCode ("22", "22-es körzetszám – Fejér megye"),
    new landLineCode ("23", "23-as körzetszám – Pest megye"),
    new landLineCode ("24", "24-es körzetszám – Pest megye"),
    new landLineCode ("25", "25-ös körzetszám – Fejér megye"),
    new landLineCode ("26", "26-os körzetszám – Pest megye"),
    new landLineCode ("27", "27-es körzetszám – Pest megye"),
    new landLineCode ("28", "28-as körzetszám – Pest megye"),
    new landLineCode ("29", "29-es körzetszám – Pest megye"),
    new landLineCode ("32", "32-es körzetszám – Nógrád megye"),
    new landLineCode ("33", "33-as körzetszám – Komárom-Esztergom megye"),
    new landLineCode ("34", "34-es körzetszám – Komárom-Esztergom megye"),
    new landLineCode ("35", "35-ös körzetszám – Nógrád megye"),
    new landLineCode ("36", "36-os körzetszám – Heves megye"),
    new landLineCode ("37", "37-es körzetszám – Heves megye"),
    new landLineCode ("42", "42-es körzetszám – Szabolcs-Szatmár-Bereg megye"),
    new landLineCode ("44", "44-es körzetszám – Szabolcs-Szatmár-Bereg megye"),
    new landLineCode ("45", "45-ös körzetszám – Szabolcs-Szatmár-Bereg megye"),
    new landLineCode ("46", "46-os körzetszám – Borsod-Abaúj-Zemplén megye"),
    new landLineCode ("47", "47-es körzetszám – Borsod-Abaúj-Zemplén megye"),
    new landLineCode ("48", "48-as körzetszám – Borsod-Abaúj-Zemplén megye"),
    new landLineCode ("49", "49-es körzetszám – Borsod-Abaúj-Zemplén megye"),
    new landLineCode ("52", "52-es körzetszám – Hajdú-Bihar megye"),
    new landLineCode ("53", "53-as körzetszám – Pest megye"),
    new landLineCode ("54", "54-es körzetszám – Hajdú-Bihar megye"),
    new landLineCode ("56", "56-os körzetszám – Jász-Nagykun-Szolnok megye"),
    new landLineCode ("57", "57-es körzetszám – Jász-Nagykun-Szolnok megye"),
    new landLineCode ("59", "59-es körzetszám – Jász-Nagykun-Szolnok megye"),
    new landLineCode ("62", "62-es körzetszám – Csongrád megye"),
    new landLineCode ("63", "63-as körzetszám – Csongrád megye"),
    new landLineCode ("66", "66-os körzetszám – Békés megye"),
    new landLineCode ("68", "68-as körzetszám – Békés megye"),
    new landLineCode ("69", "69-es körzetszám – Baranya megye"),
    new landLineCode ("72", "72-es körzetszám – Baranya megye"),
    new landLineCode ("73", "73-as körzetszám – Baranya megye"),
    new landLineCode ("74", "74-es körzetszám – Tolna megye"),
    new landLineCode ("75", "75-ös körzetszám – Tolna megye"),
    new landLineCode ("76", "76-os körzetszám – Bács-Kiskun megye"),
    new landLineCode ("77", "77-es körzetszám – Bács-Kiskun megye"),
    new landLineCode ("78", "78-as körzetszám – Bács-Kiskun megye"),
    new landLineCode ("79", "79-es körzetszám – Bács-Kiskun megye"),
    new landLineCode ("82", "82-es körzetszám – Somogy megye"),
    new landLineCode ("83", "83-as körzetszám – Zala megye"),
    new landLineCode ("84", "84-es körzetszám – Somogy megye"),
    new landLineCode ("85", "85-ös körzetszám – Somogy megye"),
    new landLineCode ("87", "87-es körzetszám – Veszprém megye"),
    new landLineCode ("88", "88-as körzetszám – Veszprém megye"),
    new landLineCode ("89", "89-es körzetszám – Veszprém megye"),
    new landLineCode ("92", "92-es körzetszám – Zala megye"),
    new landLineCode ("93", "93-as körzetszám – Zala megye"),
    new landLineCode ("94", "94-es körzetszám – Vas megye"),
    new landLineCode ("95", "95-ös körzetszám – Vas megye"),
    new landLineCode ("96", "96-os körzetszám – Győr-Moson-Sopron megye"),
    new landLineCode ("99", "99-es körzetszám – Győr-Moson-Sopron megye"),
  ]

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
        errorMessage: "Kötelező kitölteni!"
      }));
      firstNameHasError.current = true;

    }else if(firstName.value.length < 2){
      setFirstName((prevState) => ({
        ...prevState,
        hasError: true,
        errorMessage: "Minimum 2 karakter hosszúnak kell lennie!"
      }));
    }else if (!firstName.value.match(nameRegex)) {
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

    }else if(lastName.value.length < 2){
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

  const resetMobilePhoneCode = () => {
    setMobilePhoneCode((prevState) => ({
      ...prevState,
      value: ""
    }))
  }

  useEffect(() => {
    if(isMountedEmail.current){
      emailValidation();
      checkForm();
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
      checkForm();
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
      checkForm(); //EZt miért ide raktuk, Márk?
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
      checkForm();
    }
    else if(isMountedMobile.current && regionTypeLandLine){
      landLineValidation();
      checkForm();
    }
    else{
      console.log("nem validálok");
    }
    // console.log(`Mobil értéke: ${Boolean(mobile.value)}, ${mobile.value}`);
  }, [mobile.value]);

  useEffect(() => {
    if(isMountedPhoneType.current){
      mobilePhoneTypeValidation();
      checkForm();
    }
    else{
      console.log("nem valiádlok");
    }
    
  }, [mobilePhoneType.value]);

  useEffect(() => {
    if(isMountedPhoneCode.current){
      mobilePhoneCodeValidation();
      checkForm();
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
              inputProps={{maxLength: 20, minLength: 2}}
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
              inputProps={{maxLength: 20, minLength: 2}}
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
                return  <MenuItem
                          key={val.num}
                          value={val.num}
                        >
                        {val.label}
                        </MenuItem>
                })
              }
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
              inputProps={{maxLength: 50, minLength: 8}}
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
