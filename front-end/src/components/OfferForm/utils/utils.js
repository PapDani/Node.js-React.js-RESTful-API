import CheckCircleSharpIcon from "@mui/icons-material/CheckCircleSharp";

const setTextfieldValue = (inputValue, state, stateSetter, validator) => {
    if (inputValue.match((state.allowedCharacters))
        ){
        console.log(inputValue)
        const validationResult = validator(
            inputValue, state.allowedCharacters,
            state.notAllowedCharacters,
            state.matchRegex,
            state.splitRegex);
        stateSetter((prevState) => ({
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