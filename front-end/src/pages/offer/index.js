import React, { useEffect, useState, useRef } from "react";
import Axios from "axios";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
//import ErroModal from "../components/ErrorModal";

import ReCAPTCHA from "react-google-recaptcha"
import "./style.css";

import Button from "@mui/material/Button";

import { Theme } from "../../theme";
import { ThemeProvider } from "@mui/material/styles";

import { TextFieldsForEmail } from "../../components/OfferForm/email";
import { TextFieldsForFullName } from "../../components/OfferForm/name";
import { TextFieldsForPhoneNumber } from "../../components/OfferForm/phone";
import { TextFieldForDescription } from "../../components/OfferForm/description";
import { CustomButton } from "../../components/CustomButton";

function Services(props) {

  const [formVisible, setFormVisible] = useState(true);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [disabledSubmitBtn, setDisabledSubmitBtn] = useState(true);

  //körzetek osztályként 
  class landLineCode {
    constructor(num, label) {
      this.num = num;
      this.label = label;
    }
  }

  /*const landLineCodes = [
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
  ]*/

  // eslint-disable-next-line no-useless-escape
  const captchaRef = useRef(null);

  const [description, setDescription] = useState({
    value: "",
    isValid: false
  });

  const [email, setEmail] = useState({
    domain: '',
    isValid: false
  })

  const [fullName, setFullName] = useState({
    firstName: {
      value: '',
      isValid: false
    },
    lastName: {
      value: '',
      isValid: false
    }
  })

  const [phone, setPhoneNumber] = useState(
      {
        regionCode: "",
        phoneNumber: "",
        isValid: false
      }
  )

  useEffect(() => {
    if (!isFormValid()){
      setShowCaptcha(false);
      if (captchaRef.current !== null) captchaRef.current.reset();
    }else{
      setShowCaptcha(true)
    }
  }, [email, fullName, phone, description]);

  const handleSubmit = (event) => {
    event.preventDefault();
    captchaRef.current.reset(); //ez mit is csinál?

    if (isFormValid()) {
      submitFormData();
      alert("Front-end: Siker!");
    } else {
      alert("Front-end: Hibásan lett átengedve a form!");
    }
  };

  /*
  const checkIfShowCaptcha = () => {

    if (isFormValid()) {
      setShowCaptcha(true);
    }
    else{
      setShowCaptcha(false);
      captchaRef.current.reset(); //ez mit is csinál?
    }
  }
  */

  const isFormValid = () => {
    if (
      (!fullName.firstName.value || !fullName.firstName.isValid) ||
      (!fullName.lastName.value || !fullName.lastName.isValid) ||
      (!email.domain || !email.isValid) ||
      (!phone.phoneNumber || !phone.regionCode || !phone.isValid) ||
        (!description.isValid)
      )
    {
      console.log("hiba van")
      return false;
    }
    console.log("nincs hiba")
    return true;
  }

  const verifyCaptcha = async () => {
    const token = captchaRef.current.getValue();

    await Axios.post(process.env.REACT_APP_SERVER_URL + process.env.REACT_APP_CAPTCHA_URL, { token })
      .then(res => {
        if (res.status === 200) {
          setDisabledSubmitBtn(false);
        } else {
          setDisabledSubmitBtn(true);
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const formData = {
    lastName: fullName.lastName.value,
    firstName: fullName.firstName.value,
    //mobileNum: `06${phoneRegionCode.value}${mobile.value}`,
    regionCode: phone.regionCode,
    phoneNumber: phone.phoneNumber,
    email: email.domain,
    description: description.value,
  };

  const submitFormData = async () => {
    try {
      console.log(formData);
      await Axios.post(
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
      <ThemeProvider theme={Theme}>
        {formVisible && (
          <div id="form1">
            <form onSubmit={handleSubmit}>
              <Stack
                direction={{ mobile: "column", laptop: "row" }}
                spacing={{ mobile: 1, desktop: 6 }}
                mb={1}
                justifyContent="center"
                alignItems="center"
              >
                <TextFieldsForFullName value={setFullName}/>

                <TextFieldsForEmail value={setEmail}/>
              </Stack>

              <Stack
                direction={{ mobile: "column", laptop: "row" }}
                spacing={{ mobile: 1, desktop: 6 }}
                mb={1}
                justifyContent="center"
                alignItems="center"
              >
                <TextFieldsForPhoneNumber value={setPhoneNumber}/>
              </Stack>

              <Stack direction={{ mobile: "column", laptop: "row" }}
                spacing={{ mobile: 1, desktop: 6 }}
                sx={{
                  marginBottom: {
                    mobile: 7
                  }
                }}
                justifyContent="center"
                alignItems="center"
              >
                <TextFieldForDescription value={setDescription}/>
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

                {/* <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: "transparent",
                  border: 1,
                  borderColor: "white",
                  color: "white",
                  maxWidth: 100,
                  ":hover": {
                    backgroundColor: "white",
                    color: "green",
                    borderColor: "green"
                  },
                }}
                disabled={disabledSubmitBtn}
              >
                Küldés
              </Button> */}

                <CustomButton type="submit" disabled={disabledSubmitBtn}>
                  Küldés
                </CustomButton>
              </Stack>

            </form>
          </div>
        )}

        <div>
          {alertVisible && (
            <Alert sx={{ backgroundColor: `${Theme.palette.primary.semiTransparent}` }} variant="outlined" severity={alertType} action={
              <Button color="inherit" size="small" onClick={() => { setAlertVisible(false) }}>
                Ok
              </Button>
            }>
              <AlertTitle>{alertTitle}</AlertTitle>
              {/* Ezen változtatni! */}
              {/* <strong>{alertMessage}</strong>  */}
              <Typography variant="body1" sx={{ color: `${Theme.palette.common.white}` }}>{alertMessage}</Typography>
            </Alert>
          )}
        </div>

      </ThemeProvider>
    </div>
  );
}

export default Services;
