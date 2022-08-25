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
  
  //const [error, setError] = useState();
  const [alert, setAlert] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [disabledSubmitBtn, setDisabledSubmitBtn] = useState(true);
  const [mobilCodeDisabled, setMobilCodeDisabled] = useState(true);
  const [regionTypeMobile, setRegionTypeMobile] = useState(false);
  const [regionTypeLandLine, setRegionTypeLandLine] = useState(false);

  const mobileCodes = [
    '20',
    '30'
  ];

  const landLineCodes = [
    '1',
    '46'
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
        setRegionType(mobileCodes)
      }
      else{
        setRegionTypeMobile(false);
      }

      if(mobilePhoneType.value === "Vezetekes"){
        setRegionTypeLandLine(true);
        setRegionType(landLineCodes);
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

    } else {

      setMobilePhoneCode((prevState) => ({
        ...prevState,
        hasError: false,
        errorMessage: <CheckCircleSharpIcon />,
        color: "success",
        variant: "outlined",
      }));
      mobilePhoneCodeHasError.current = false
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
    if(isMountedMobile.current){
      mobileValidation();
    }
    else{
      console.log("nem valiádlok");
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
    mobileNum: `06${mobilePhoneCode.value}${mobile.value}`,
    email: email.value,
    description: description,
  };

  //Reset form v2
  const resetForm2 = (event) => {
    setLastName((prevState) => ({
      ...prevState,
      value: event.target.value,
    }));
  }

  //Reset form v1
  const resetForm = () => { //Sikeres küldés után resetelni a mezőket
    setFirstName({value: ""});
    setLastName({value: ""});
    setMobilePhoneCode({value: ""});
    setMobile({value: ""});
    setEmail({value: ""});
    setDescription({value: ""});
    //Működik csak lefut az ellenőrzés
  }

  

  const submitFormData = async () => {
    try {
      console.log(formData);
      const response = await Axios.post(
        "http://localhost:3001/api/submitForm",
        formData
      ).then((response) => {
        if(response.status === 200){
          resetForm();
          //Sikeres küldés után resetelni a mezőket - nem jól működik
           //Hogy lehetne ezeket kipróbálni és ne küldjön közben emailt???
           setAlertType("success");
           setAlertMessage(response.data.message);
           setAlertTitle("Siker!");
           setAlert(true);
          alert("Back-end message: " + response.data.message);
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

            <FormControl style={{ minWidth: 150 }}>
              <InputLabel id="mobile-phone-types-label">Válassz *</InputLabel>
              <Select
                error={mobilePhoneType.hasError}
                id="mobile-phone-types-select"
                labelId="mobile-phone-types-label"
                value={mobilePhoneType.value}
                required={true}
                label="Mobile phone type"
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

            <FormControl style={{ minWidth: 150 }}>
              <InputLabel id="mobile-phone-codes-label">Válassz *</InputLabel>
              <Select
                error={mobilePhoneCode.hasError}
                id="mobile-phone-codes-select"
                labelId="mobile-phone-codes-label"
                value={mobilePhoneCode.value}
                required={true}
                disabled={mobilCodeDisabled}
                label="Mobile phone codes"
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
              value={description}
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
        <div>
          {alert && (
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
