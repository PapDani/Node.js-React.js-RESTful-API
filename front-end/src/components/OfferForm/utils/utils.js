import CheckCircleSharpIcon from "@mui/icons-material/CheckCircleSharp";

const setTextfieldValue = (inputValue, textFieldProps, textFieldPropsSetter, validator) => {
    if (inputValue.match((textFieldProps.allowedCharacters))
        ){
        const validationResult = validator(
            inputValue, textFieldProps);
        textFieldPropsSetter((prevState) => ({
            ...prevState,
            value: inputValue,
            isValid: validationResult === "",
            helperText: validationResult !== "" ? validationResult : <CheckCircleSharpIcon color="success"/>,
            color: validationResult !== "" ? "error" : "success"
        }));
    }
}

const textfieldPropBuilder = (minCharacters, maxCharacters, allowedCharacters, notAllowedCharacters, matchRegex, splitRegex) => {
    return {
        value: "",
        isValid: true,
        errorMessage: "",
        color: "secondary",
        variant: "outlined",
        minCharacters,
        maxCharacters,
        allowedCharacters,
        notAllowedCharacters,
        matchRegex,
        splitRegex
    }
}

export {setTextfieldValue, textfieldPropBuilder}