import { useEffect, useRef, useState } from "react";
import {
    TextField,
  } from "@mui/material";
import {setTextfieldValue, textfieldPropBuilder} from "../utils/utils";

export const TextFieldsForEmail = (props) => {
    const isMountedEmail = useRef(false);

    const [emailProps, setEmailProps] = useState(
        textfieldPropBuilder(
            8,
            50,
            "(^[a-zA-ZöüóőúéáűíÖÜÓŐÚÉÁŰÍ .-@]+$|^$)",
            null,
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            /[.@]/
        )
    );

  const emailValidation = (inputValue, allowedCharacrters, notAloowedCharacters, matchRegex, splitRegex) => {
    let [userName = "", domainName = "", domain = ""] = inputValue.split(splitRegex);
    if (!inputValue) return "Kötelező kitölteni!";
    if (!userName || !domainName || !domain) return "Hiányos email cím!";
    if (inputValue.length < 9) return "Minimum 9 karakter hosszúnak kell lennie!";
    if (!inputValue.match(matchRegex)) return "Hibás email cím formátum!";
    return ""
  };

  useEffect(() => {
    props.value({domain: emailProps.value, isValid: emailProps.isValid})
  }, [emailProps.value]);

    return(
        <TextField
        sx={{
          width: {
            mobile: "100%",
          },
          height: 90
        }}
        InputLabelProps={{ className: "textfield_label" }}
        error={!emailProps.isValid}
        id="email"
        name="email"
        label="Email"
        placeholder="minta@email.com"
        value={emailProps.value}
        required={true}
        onChange={(event) => {
          isMountedEmail.current = true;
          setTextfieldValue(event.target.value, emailProps, setEmailProps, emailValidation)
        }}
        helperText={emailProps.helperText}
        color={emailProps.color}
        variant={emailProps.variant}
        type="text"
        inputProps={{ maxLength: 50, minLength: 8 }}
      />
    )
}