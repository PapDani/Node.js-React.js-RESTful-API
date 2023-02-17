import { useEffect, useRef, useState } from "react";
import CheckCircleSharpIcon from "@mui/icons-material/CheckCircleSharp";
import {
    TextField,
  } from "@mui/material";

export const TextFieldsForEmail = (props) => {
    const isMountedEmail = useRef(false);

    const emailHasError = useRef(true);

    const [email, setEmail] = useState({
        value: "",
        hasError: false,
        errorMessage: "",
        color: "secondary",
        variant: "outlined",
        // regEx: "(^[a-z0-9.@]+$|^$)",
        regEx:
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        splitRegEx: /[.@]/
      });

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
              errorMessage: <CheckCircleSharpIcon color="success" />,
              color: "success",
              variant: "outlined",
            }));
            emailHasError.current = false
          }
        }
      };

      useEffect(() => {
        if (isMountedEmail.current) {
          emailValidation();
          //checkForm();
          console.log("validálok");
        }
        else {
          //isMounted.current = true;
          console.log("nem validálok");
        }
        props.value({...email.value, ...email.hasError})
      }, [email.value]);
    return(
        <TextField
        sx={{
          width: {
            mobile: "100%",
          },
          height: 90
        }}
        InputLabelProps={{ className: "textfield_label" }}
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
    )
}