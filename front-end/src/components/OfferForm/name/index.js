import { useEffect, useRef, useState } from "react";
import {
    TextField,
  } from "@mui/material";
import {setTextfieldValue, textfieldPropBuilder} from "../utils/utils";

export const TextFieldsForFullName = (props) => {

    const isMountedFirstName = useRef(false);
    const isMountedLastName = useRef(false);

    const [firstNameProps, setFirstNameProps] = useState(
        textfieldPropBuilder(
            2,20, "(^[a-zA-ZöüóőúéáűíÖÜÓŐÚÉÁŰÍ .-]+$|^$)",
            /[!$%^&*()_+|~=`{}\[\]:\/;<>?,@#]/, null, null)
    );

    const [lastNameProps, setLastNameProps] = useState(
        textfieldPropBuilder(
            2,20, "(^[a-zA-ZöüóőúéáűíÖÜÓŐÚÉÁŰÍ .-]+$|^$)",
            /[!$%^&*()_+|~=`{}\[\]:\/;<>?,@#]/, null, null)
    );

    const firstOrLastNameValidation = (input, allowedCharacters, notAllowedCharacters, splitRegex) => {
      if (!input) return "Kötelező kitölteni!";
      if (input.length < 2) return "Minimum 2 karakter hosszúnak kell lennie!";
      if (input.match(notAllowedCharacters)) return "Hibás név formátum!"; //Kétszer van a regex ellenőrizve, a mobilszámnál meg egyszer???
      return "";
    };

    useEffect(() => {
      props.value({
        firstName: {
          value: firstNameProps.value,
          isValid: firstNameProps.isValid
        },
        lastName: {
          value: lastNameProps.value,
          isValid: lastNameProps.isValid
        }
      })
    }, [lastNameProps.value, firstNameProps.value]);


  return (
    <>
    <TextField
    sx={{
      width: {
        mobile: "100%",
      },
      height: 90
    }}
    InputLabelProps={{ className: "textfield_label" }}
    error={!lastNameProps.isValid}
    id="lastName"
    name="lastName"
    label="Vezetéknév"
    placeholder="pl.: Tóth"
    value={lastNameProps.value}
    required={true}
    onChange={(event) => {
      isMountedLastName.current = true;
      setTextfieldValue(event.target.value, lastNameProps, setLastNameProps, firstOrLastNameValidation);
    }}
    helperText={lastNameProps.helperText}
    color={lastNameProps.color}
    variant={lastNameProps.variant}
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
    InputLabelProps={{ className: "textfield_label" }}
    error={!firstNameProps.isValid}
    id="firstName"
    name="firstName"
    label="Keresztnév"
    placeholder="pl.: János"
    value={firstNameProps.value}
    required={true}
    onChange={(event) => {
      isMountedFirstName.current = true;
      setTextfieldValue(event.target.value, firstNameProps, setFirstNameProps, firstOrLastNameValidation);
    }}
    helperText={firstNameProps.helperText}
    color={firstNameProps.color}
    variant={firstNameProps.variant}
    inputProps={{ maxLength: 20, minLength: 2 }}
  />
  </>
  )
}