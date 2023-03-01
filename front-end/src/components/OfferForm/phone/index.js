import { useEffect, useRef, useState } from "react";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  } from "@mui/material";
import {setTextfieldValue, textfieldPropBuilder} from "../utils/utils";

const MOBILE_NUMBER_NUM_OF_CHARS = 7;
const LANDLINE_NUMBER_NUM_OF_CHARS = 6;

const mobileCodes = [
  { num: '20', label: '20' },
  { num: '30', label: '30' },
  { num: '70', label: '70' },
  { num: '999', label: 'Egyéb' }
];
export const TextFieldsForPhoneNumber = (props) => {
  const isMountedPhoneType = useRef(false);
  const isMountedRegionCode = useRef(false);
  const isMountedRegionCodeOther = useRef(false);
  const isMountedPhoneNumber = useRef(false);

  const [selectableRegionCodes, setSelectableRegionCodes] = useState([]);
  const [isCustomRegionCodeInputShown, setIsCustomRegionCodeInputShown] = useState(false);
  const [regionCodeDisabled, setRegionCodeDisabled] = useState(true);
  const [phoneNumberDisabled, setPhoneNumberDisabled] = useState(true);
  const [regionType, setRegionType] = useState("Mobile");

  const [phoneType, setPhoneType] = useState(
      textfieldPropBuilder(
          5,7,"(^[a-zA-Z]+$|^$)",
          null, null, null)
  );

  const [regionCode, setRegionCode] = useState(
      textfieldPropBuilder(
          2,2,"(^[0-9]+$|^$)",
          null, null, null)
  );

  const [customRegionCode, setCustomRegionCode] = useState(
      textfieldPropBuilder(
          2,2,"(^[0-9]+$|^$)",
          null, "(^[0-9]{2}$|^$)", null)
  );

  const [phoneNumber, setPhoneNumber] = useState(
      textfieldPropBuilder(
          7,7,"(^[0-9]+$|^$)",
          null, null, null)
  );

  const phoneTypeValidation = (inputValue, textFieldProps) => {

    if (!inputValue) {
      setRegionCodeDisabled(true)
      return "Kötelező választani";
    }

      if (inputValue === "Mobil") {
        setRegionType("Mobile");
        setSelectableRegionCodes(mobileCodes);
        resetPhoneNumber();
        resetPhoneRegionCode();
        resetCustomRegionCode();
        setPhoneNumber((prevState) => ({
          ...prevState,
          minCharacters: MOBILE_NUMBER_NUM_OF_CHARS,
          maxCharacters: MOBILE_NUMBER_NUM_OF_CHARS
        }))
      }

      if (inputValue === "Vezetekes") {
        setRegionType("LandLine");
        //setSelectableRegionCodes(landLineCodes);
        resetPhoneNumber();
        resetPhoneRegionCode();
        resetCustomRegionCode();
        setIsCustomRegionCodeInputShown(false);
        setPhoneNumber((prevState) => ({
          ...prevState,
          minCharacters: LANDLINE_NUMBER_NUM_OF_CHARS,
          maxCharacters: LANDLINE_NUMBER_NUM_OF_CHARS
        }))
      }

    setRegionCodeDisabled(false);
    return ""
  };

  const regionCodeMobileValidation = (inputValue, textFieldProps) => {

    if (!inputValue) {
      setPhoneNumberDisabled(true);
      resetCustomRegionCode();
      resetPhoneNumber();
      return "Kötelező kitölteni";
    }

    if (inputValue.match("999")) {
      setPhoneNumberDisabled(true);
      setIsCustomRegionCodeInputShown(true);
      resetCustomRegionCode();
      resetPhoneNumber();
      return "";
    }

    setIsCustomRegionCodeInputShown(false);
    setPhoneNumberDisabled(false);
    return "";
  };

  const regionCodeLandLineValidation = (inputValue, textFieldProps) => {

    if (!inputValue) {
      setPhoneNumberDisabled(true);
      return "Kötelező kitölteni"
    }

    if (inputValue.length < 2 && !inputValue.match(1)) {
      setPhoneNumberDisabled(true);
      return "2 karakter hosszúnak kell lennie! (kivéve ha 1-es a körzetszám)";
    }
    setPhoneNumberDisabled(false);
    return "";
  };

  const customRegionCodeValidation = (inputValue, textFieldProps) => {
    if (!inputValue) {
      resetPhoneNumber();
      setPhoneNumberDisabled(true);
      return "Kötelező kitölteni";
    }

    if (!inputValue.match(textFieldProps.matchRegex)) {
      resetPhoneNumber();
      setPhoneNumberDisabled(true);
      return "2 karakter hosszúnak kell lennie!";
    }

    setPhoneNumberDisabled(false);
    return "";
  };

  const phoneNumberValidation = (inputValue, textFieldProps) => {
    if (!inputValue) return "Kötelező kitölteni!";
    if (inputValue.length < textFieldProps.maxCharacters) return `${textFieldProps.maxCharacters} karakter hosszúnak kell lennie!`
    return "";
  };

  const resetPhoneNumber = () => {
    setTextfieldValue("", phoneNumber, setPhoneNumber, phoneNumberValidation)
  }

  const resetPhoneRegionCode = () => {
    setTextfieldValue("", regionCode, setRegionCode, regionCodeMobileValidation)
  }

  const resetCustomRegionCode = () => {
    setTextfieldValue("", customRegionCode, setCustomRegionCode, customRegionCodeValidation)
  }

  useEffect(() => {
    props.value({
      regionCode: regionCode.value ? regionCode.value : customRegionCode.value,
      phoneNumber: phoneNumber.value,
      isValid:
          (((isCustomRegionCodeInputShown && customRegionCode.isValid) ||
           (!isCustomRegionCodeInputShown && regionCode.isValid)) &&
           (phoneNumber.isValid))
    })
    /*
    props.value({
      phoneType:{
        value:phoneType.value,
        isValid: !phoneType.hasError
      },
      regionCode:{
        value: regionCode.value,
        isValid: !regionCode.hasError
      },
      regionCodeOther:{
        value: customRegionCode.value,
        isValid: !customRegionCode.hasError
      },
      phoneNumber:{
        value: phoneNumber.value,
        isValid: !phoneNumber.hasError
      },
    })*/
  }, [phoneType.value, regionCode.value, customRegionCode.value, phoneNumber.value]);

    return(
      <>
      <FormControl
      sx={{
        minWidth: 200,
        width: {
          mobile: "100%",
        },
        height: 90
      }}
    >
      <InputLabel id="phone-types-label" className="textfield_label">Mobil/Vezetékes *</InputLabel>
      <Select
        inputProps={{
          MenuProps: {
            MenuListProps: {
              sx: {
                backgroundColor: 'black'
              }
            },
            PaperProps: {
              sx: {
                "& .MuiMenuItem-root.Mui-selected": {
                  fontWeight: 900
                },
                "& .MuiMenuItem-root:hover": {
                  fontWeight: 900
                },
                "& .MuiMenuItem-root.Mui-selected:hover": {
                  fontWeight: 900
                }
              }
            }
          }
        }}
        error={phoneType.hasError}
        id="phone-types-select"
        labelId="phone-types-label"
        value={phoneType.value}
        required={true}
        label="Mobil/Vezetékes *"
        color={phoneType.color}
        variant="outlined"
        onChange={(event) => {
          isMountedPhoneType.current = true;
          setTextfieldValue(event.target.value, phoneType, setPhoneType, phoneTypeValidation)
        }}
      >
        <MenuItem value={"Mobil"}>Mobil</MenuItem>
        <MenuItem value={"Vezetekes"}>Vezetékes</MenuItem>
      </Select>
      <FormHelperText>
        {phoneType.helperText}
      </FormHelperText>
    </FormControl>

    {regionType === "LandLine" && (
      <TextField
        sx={{
          width: {
            mobile: "100%",
          },
          height: 90
        }}
        InputLabelProps={{ className: "textfield_label" }}
        error={regionCode.hasError}
        id="vezetekes"
        label="Körzetszám"
        placeholder="Körzetszám"
        value={regionCode.value}
        required={true}
        disabled={regionCodeDisabled}
        onChange={(event) => {
          isMountedRegionCode.current = true;
          setTextfieldValue(event.target.value, regionCode, setRegionCode, regionCodeLandLineValidation)
        }}
        helperText={regionCode.helperText}
        color={regionCode.color}
        variant={regionCode.variant}
        inputProps={{ maxLength: regionCode.maxCharacters }}
      />
    )}

    {regionType === "Mobile" && (
      <FormControl
        sx={{
          minWidth: 300,
          width: {
            mobile: "100%",
          },
          height: 90
        }}
      >
        <InputLabel id="phone-codes-label" className="textfield_label">Körzetszám mobil</InputLabel>
        <Select
          inputProps={{
            MenuProps: {
              MenuListProps: {
                sx: {
                  backgroundColor: 'black'
                }
              },
              PaperProps: {
                sx: {
                  "& .MuiMenuItem-root.Mui-selected": {
                    fontWeight: 900
                  },
                  "& .MuiMenuItem-root:hover": {
                    fontWeight: 900
                  },
                  "& .MuiMenuItem-root.Mui-selected:hover": {
                    fontWeight: 900
                  }
                }
              }
            }
          }}
          error={regionCode.hasError}
          id="phone-codes-select"
          labelId="phone-codes-label"
          value={regionCode.value}
          required={true}
          label="Körzetszám *"
          disabled={regionCodeDisabled}
          color={regionCode.color}
          variant={regionCode.variant}
          onChange={(event) => {
            isMountedRegionCode.current = true;
            setTextfieldValue(event.target.value, regionCode, setRegionCode, regionCodeMobileValidation)
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
            selectableRegionCodes.map(val => {
              //változók és console.log használata, stringtömbből to objektumtömbbé, deklarálva 21. sornál
              /* numtemp = val.slice(0,2);
               strtemp = `${strtemp}\n{ num: "${numtemp}", label: "${val}" },`;
               console.log(strtemp);*/

              //változók és console.log használata, stringtömbből to osztály objektumtömbbé, deklarálva 21. sornál
              /*numtemp = val.slice(0,2);
              strtemp = `${strtemp}\n new landLineCode ("${numtemp}", "${val}"),`;
              console.log(strtemp);*/
              return <MenuItem
                key={val.num}
                value={val.num}
              >
                {val.label}
              </MenuItem>
            })
          }
        </Select>
        <FormHelperText
          error={regionCode.hasError}
          variant={regionCode.variant}
        >
          {regionCode.helperText}
        </FormHelperText>
      </FormControl>
    )}

    {isCustomRegionCodeInputShown && (
      <TextField
        sx={{
          width: {
            mobile: "100%",
          },
          height: 90
        }}
        InputLabelProps={{ className: "textfield_label" }}
        error={customRegionCode.hasError}
        id="vezetekes2"
        label="Körzetszám2"
        placeholder="Körzetszám"
        value={customRegionCode.value}
        required={true}
        disabled={regionCodeDisabled}
        onChange={(event) => {
          isMountedRegionCodeOther.current = true;
          setTextfieldValue(event.target.value, customRegionCode, setCustomRegionCode, customRegionCodeValidation)
        }}
        helperText={customRegionCode.helperText}
        color={customRegionCode.color}
        variant={customRegionCode.variant}
        inputProps={{ maxLength: regionCode.maxCharacters }}
      />
    )}

    <TextField
      sx={{
        width: {
          mobile: "100%",
        },
        height: 90
      }}
      InputLabelProps={{ className: "textfield_label" }}
      error={phoneNumber.hasError}
      id="phone"
      label="Telefonszám"
      placeholder="Telefonszám"
      value={phoneNumber.value}
      required={true}
      disabled={phoneNumberDisabled}
      onChange={(event) => {
        isMountedPhoneNumber.current = true;
        setTextfieldValue(event.target.value, phoneNumber, setPhoneNumber, phoneNumberValidation)
      }}
      helperText={phoneNumber.helperText}
      color={phoneNumber.color}
      variant={phoneNumber.variant}
      inputProps={{maxLength: phoneNumber.maxCharacters }}
    />
    </>
    )
}