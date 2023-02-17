import { useEffect, useRef, useState } from "react";
import CheckCircleSharpIcon from "@mui/icons-material/CheckCircleSharp";
import {
    TextField,
  } from "@mui/material";

export const TextFieldsForFullName = (props) => {

    const nameRegex = /[!$%^&*()_+|~=`{}\[\]:\/;<>?,@#]/;

    const isMountedFirstName = useRef(false);
    const isMountedLastName = useRef(false);

    const firstNameHasError = useRef(true);
    const lastNameHasError = useRef(true);

    const [firstName, setFirstName] = useState({
      value: "",
      hasError: false,
      errorMessage: "",
      color: "secondary",
      variant: "outlined",
      regEx: "(^[a-zA-ZöüóőúéáűíÖÜÓŐÚÉÁŰÍ .-]+$|^$)",
    });

    const [lastName, setLastName] = useState({
      value: "",
      hasError: false,
      errorMessage: "",
      color: "secondary",
      variant: "outlined",
      regEx: "(^[a-zA-ZöüóőúéáűíÖÜÓŐÚÉÁŰÍ .-]+$|^$)",
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
          errorMessage: <CheckCircleSharpIcon color="success" />,
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
          errorMessage: <CheckCircleSharpIcon color="success" />,
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

    useEffect(() => {
      props.value({
        firstName: {
          value: firstName.value,
          hasError: firstName.hasError
        },
        lastName: {
          value: lastName.value,
          hasError: lastName.hasError
        }
      })
    }, [lastName.value, firstName.value]);

    useEffect(() => {
      if (isMountedLastName.current) {
        lastNameValidation();
      }
      else {
        console.log("nem valiádlok");
      }
      props.value({
        firstName: {
          value: firstName.value,
          hasError: firstName.hasError
        },
        lastName: {
          value: lastName.value,
          hasError: lastName.hasError
        }
      })
    }, [lastName.value]);

    useEffect(() => {
      if (isMountedFirstName.current) {
        console.log("vaaaaaaaaaa")
        firstNameValidation();
      }
      else {
        console.log("nem valiádlok");
      }
    }, [firstName.value]);

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
    InputLabelProps={{ className: "textfield_label" }}
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
  </>
  )
}