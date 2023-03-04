import {TextField} from "@mui/material";
import {setTextfieldValue, textfieldPropBuilder} from "../utils/utils";
import {useEffect, useState} from "react";


export const TextFieldForDescription = (props) => {

    const [descriptionProps, setDescriptionProps] = useState(
    textfieldPropBuilder(
        0,1000, "(^[a-zA-ZöüóőúéáűíÖÜÓŐÚÉÁŰÍ .-]+$|^$)",
        null, null, null)
    );

    const descriptionValidation = (inputValue, textfieldProps) => {
        if (inputValue.length > 1000) return `Túl sok karakter, maximum ${textfieldProps.maxCharacters} küldhető!`
        return ""
    }

    useEffect(() => {
        props.value({
            value: descriptionProps.value,
            isValid: descriptionProps.isValid
        },)
    }, [descriptionProps.value])

    return (
        <TextField
            sx={{
                width: {
                    mobile: "100%",
                },
                height: 90
            }}
            InputLabelProps={{ className: "textfield_label" }}
            variant="outlined"
            name="description"
            multiline
            rows={3}
            placeholder="Kérjük írja le, hogy miben segíthetünk"
            label="Leírás"
            color={descriptionProps.color}
            value={descriptionProps.value}
            onChange={(event) =>
                setTextfieldValue(event.target.value, descriptionProps, setDescriptionProps, descriptionValidation)
            }
            inputProps={{ maxLength: descriptionProps.maxCharacters }}
            helperText={`${descriptionProps.value.length}/${descriptionProps.maxCharacters}`}
            FormHelperTextProps={{ className: "textfield_label" }}
        />
    )
}