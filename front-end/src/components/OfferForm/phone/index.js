import { useEffect, useRef, useState } from "react";
import CheckCircleSharpIcon from "@mui/icons-material/CheckCircleSharp";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  } from "@mui/material";

export const TextFieldsForPhoneNumber = (props) => {
  const isMountedPhoneType = useRef(false);
  const isMountedRegionCode = useRef(false);
  const isMountedRegionCodeOther = useRef(false);
  const isMountedPhoneNumber = useRef(false);

  const mobileHasError = useRef(true);
  const mobilePhoneTypeHasError = useRef(true);
  const phoneRegionCodeHasError = useRef(true);
  const phoneRegionCodeOtherHasError = useRef(true);

  const descMaxLength = 1000;
  const [maxPhoneInputLength, setMaxNumberInputLength] = useState("");
  const [maxPhoneLandLineInputLength, setPhoneRegionInputLength] = useState("");


  const [regionType, setRegionType] = useState([]);
  const [phoneRegionCodeOtherShow, setPhoneRegionCodeOtherShow] = useState(false);
  const [mobilCodeDisabled, setMobilCodeDisabled] = useState(true);
  const [phoneNumberDisabled, setPhoneNumberDisabled] = useState(true);
  const [regionTypeMobile, setRegionTypeMobile] = useState(false);
  const [regionTypeLandLine, setRegionTypeLandLine] = useState(false);

  
  const [phoneType, setPhoneType] = useState({
    value: "",
    hasError: false,
    errorMessage: "",
    color: "secondary",
    variant: "outlined",
  });

  const [regionCode, setRegionCode] = useState({
    value: "",
    hasError: false,
    errorMessage: "",
    color: "secondary",
    variant: "outlined",
  });

  const [regionCodeOther, setRegionCodeOther] = useState({
    value: "",
    hasError: false,
    errorMessage: "",
    color: "secondary",
    variant: "outlined",
  });

  const [phoneNumber, setPhoneNumber] = useState({
    value: "",
    hasError: false,
    errorMessage: "",
    color: "secondary",
    variant: "outlined",
    regEx: "(^[0-9]+$|^$)",
  });

  const mobileCodes = [
    { num: '20', label: '20' },
    { num: '30', label: '30' },
    { num: '70', label: '70' },
    { num: '999', label: 'Egyéb' }
  ];

  const phoneTypeValidation = () => {

    if (!phoneType.value) {
      setPhoneType((prevState) => ({
        ...prevState,
        hasError: true,
        errorMessage: "Kötelező választani",
      }));
      mobilePhoneTypeHasError.current = true
      setMobilCodeDisabled(true)
    } else {
      setPhoneType((prevState) => ({
        ...prevState,
        hasError: false,
        errorMessage: <CheckCircleSharpIcon color="success" />,
        color: "success",
        variant: "outlined",
      }));
      mobilePhoneTypeHasError.current = false
      setMobilCodeDisabled(false);

      if (phoneType.value === "Mobil") {
        setRegionTypeMobile(true);
        setMaxNumberInputLength(7);
        setRegionType(mobileCodes);
        resetPhoneNumber();
        resetPhoneRegionCode();
        resetPhoneRegionCodeOther();
        setPhoneRegionInputLength(2);
      }
      else {
        setRegionTypeMobile(false);
      }

      if (phoneType.value === "Vezetekes") {
        setRegionTypeLandLine(true);
        setMaxNumberInputLength(6);
        //setRegionType(landLineCodes);
        resetPhoneNumber();
        resetPhoneRegionCode();
        resetPhoneRegionCodeOther();
        setPhoneRegionCodeOtherShow(false);
        setPhoneRegionInputLength(2);
      }
      else {
        setRegionTypeLandLine(false);
      }
    }
  };

  const regionCodeMobileValidation = () => {

    if (!regionCode.value) {
      setRegionCode((prevState) => ({
        ...prevState,
        hasError: true,
        errorMessage: "Kötelező kitölteni",
      }));
      phoneRegionCodeHasError.current = true
      setPhoneNumberDisabled(true);
      setPhoneRegionCodeOtherShow(false);

    } else {

      if (regionCode.value.match(999)) {
        setRegionCode((prevState) => ({
          ...prevState,
          hasError: false,
          errorMessage: <CheckCircleSharpIcon color="success" />,
          color: "success",
          variant: "outlined",
        }));
        phoneRegionCodeHasError.current = false
        setPhoneNumberDisabled(true);
        setPhoneRegionCodeOtherShow(true);
        resetPhoneRegionCodeOther();
      }
      else {
        setRegionCode((prevState) => ({
          ...prevState,
          hasError: false,
          errorMessage: <CheckCircleSharpIcon color="success" />,
          color: "success",
          variant: "outlined",
        }));
        phoneRegionCodeHasError.current = false
        setPhoneNumberDisabled(false);
        setPhoneRegionCodeOtherShow(false);
      }
    }
  };

  const regionCodeLandLineValidation = () => {
    console.log("phoneRegionCode:" + regionCode.value);

    if (!regionCode.value) {
      setRegionCode((prevState) => ({
        ...prevState,
        hasError: true,
        errorMessage: "Kötelező kitölteni",
      }));
      phoneRegionCodeHasError.current = true
      setPhoneNumberDisabled(true);

    } else if (regionCode.value.length < 2 && !regionCode.value.match(1)) {
      setRegionCode((prevState) => ({
        ...prevState,
        hasError: true,
        errorMessage: "2 karakter hosszúnak kell lennie!",
      }));
      phoneRegionCodeHasError.current = true
      setPhoneNumberDisabled(true);

    } else {

      setRegionCode((prevState) => ({
        ...prevState,
        hasError: false,
        errorMessage: <CheckCircleSharpIcon color="success" />,
        color: "success",
        variant: "outlined",
      }));
      phoneRegionCodeHasError.current = false
      setPhoneNumberDisabled(false);
    }
  };

  const regionCodeOtherValidation = () => {
    console.log("RegionCodeOtherValidation:" + regionCodeOther.value);

    if (!regionCodeOther.value) {
      setRegionCodeOther((prevState) => ({
        ...prevState,
        hasError: true,
        errorMessage: "Kötelező kitölteni",
      }));
      phoneRegionCodeOtherHasError.current = true
      setPhoneNumberDisabled(true);

    } else if (regionCodeOther.value.length < 2) {
      setRegionCodeOther((prevState) => ({
        ...prevState,
        hasError: true,
        errorMessage: "2 karakter hosszúnak kell lennie!",
      }));
      phoneRegionCodeOtherHasError.current = true
      setPhoneNumberDisabled(true);

    } else {

      setRegionCodeOther((prevState) => ({
        ...prevState,
        hasError: false,
        errorMessage: <CheckCircleSharpIcon color="success" />,
        color: "success",
        variant: "outlined",
      }));
      phoneRegionCodeOtherHasError.current = false
      setPhoneNumberDisabled(false);
    }
  };

  const mobileValidation = () => {
    if (!phoneNumber.value) {

      setPhoneNumber((prevState) => ({
        ...prevState,
        hasError: true,
        errorMessage: "Kötelező kitölteni!",
      }));
      mobileHasError.current = true

    } else if (phoneNumber.value.length < 7) {

      setPhoneNumber((prevState) => ({
        ...prevState,
        hasError: true,
        errorMessage: "7 karakter hosszúnak kell lennie!",
      }));
      mobileHasError.current = true

    } else {

      setPhoneNumber((prevState) => ({
        ...prevState,
        hasError: false,
        errorMessage: <CheckCircleSharpIcon color="success" />,
        color: "success",
        variant: "outlined",
      }));
      mobileHasError.current = false

    }
  };

  const landLineValidation = () => {
    if (!phoneNumber.value) {

      setPhoneNumber((prevState) => ({
        ...prevState,
        hasError: true,
        errorMessage: "Kötelező kitölteni!",
      }));
      mobileHasError.current = true

    } else if (phoneNumber.value.length < 6) {

      setPhoneNumber((prevState) => ({
        ...prevState,
        hasError: true,
        errorMessage: "6 karakter hosszúnak kell lennie!",
      }));
      mobileHasError.current = true

    } else {

      setPhoneNumber((prevState) => ({
        ...prevState,
        hasError: false,
        errorMessage: <CheckCircleSharpIcon color="success" />,
        color: "success",
        variant: "outlined",
      }));
      mobileHasError.current = false

    }
  };

  const resetPhoneNumber = () => {
    setPhoneNumber((prevState) => ({
      ...prevState,
      value: ""
    }));
  }

  const resetPhoneRegionCode = () => {
    setRegionCode((prevState) => ({
      ...prevState,
      value: ""
    }))
  }

  const resetPhoneRegionCodeOther = () => {
    setRegionCodeOther((prevState) => ({
      ...prevState,
      value: ""
    }))
  }

  useEffect(() => {

  }, [regionCodeOther.value]);

  useEffect(() => {
    props.value({
      phoneType:{
        value:phoneType.value,
        hasError: phoneType.hasError
      },
      regionCode:{
        value: regionCode.value,
        hasError: regionCode.hasError
      },
      regionCodeOther:{
        value: regionCodeOther.value,
        hasError: regionCodeOther.hasError
      },
      phoneNumber:{
        value: phoneNumber.value,
        hasError: phoneNumber.hasError
      },
    })
  }, [phoneType.value, regionCode.value, regionCodeOther.value, phoneNumber.value]);

  useEffect(() => {
    if (isMountedPhoneType.current) {
      phoneTypeValidation();
      console.log("validálok1");
    }else {
      console.log("nem validálok");
    }
  }, [phoneType.value]);

  useEffect(() => {
    if (isMountedRegionCode.current && regionTypeMobile) {
      console.log("validálok2");regionCodeMobileValidation();
    }
    else if (isMountedRegionCode.current && regionTypeLandLine ) {
      regionCodeLandLineValidation();
      console.log("validálok3");
    }
    else {
      console.log("nem validálok");
    }
  }, [regionCode.value]);

  useEffect(() => {
    if (isMountedRegionCodeOther.current && regionTypeMobile) {
      regionCodeOtherValidation();
      console.log("validálok4");
    }
    else if (isMountedRegionCodeOther.current && regionTypeLandLine) { //erre még nincs
      regionCodeOtherValidation();
      console.log("validálok5");
    }
    else {
      console.log("nem validálok");
    }
  }, [regionCodeOther.value]);

  useEffect(() => {
    if (isMountedPhoneNumber.current && regionTypeMobile) {
      mobileValidation();
      console.log("validálok6");
    }
    else if (isMountedPhoneNumber.current && regionTypeLandLine) {
      landLineValidation();
      console.log("validálok7");
    }
    else {
      console.log("nem validálok");
    }
  }, [phoneNumber.value]);

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
          setPhoneType((prevState) => ({
            ...prevState,
            value: event.target.value,
          }));
        }}
      >
        <MenuItem value={"Mobil"}>Mobil</MenuItem>
        <MenuItem value={"Vezetekes"}>Vezetékes</MenuItem>
      </Select>
      <FormHelperText>
        {phoneType.errorMessage}
      </FormHelperText>
    </FormControl>

    {!regionTypeMobile && (
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
        disabled={mobilCodeDisabled}
        onChange={(event) => {
          isMountedRegionCode.current = true;
          if (event.target.value.match(phoneNumber.regEx)) {
            setRegionCode((prevState) => ({
              ...prevState,
              value: event.target.value,
            }));
          }
        }}
        helperText={regionCode.errorMessage}
        color={regionCode.color}
        variant={regionCode.variant}
        inputProps={{ maxLength: maxPhoneLandLineInputLength }}
      />
    )}

    {regionTypeMobile && (
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
          disabled={mobilCodeDisabled}
          color={regionCode.color}
          variant={regionCode.variant}
          onChange={(event) => {
            isMountedRegionCode.current = true;
            setRegionCode((prevState) => ({
              ...prevState,
              value: event.target.value,
            }));
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
            regionType.map(val => {
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
          {regionCode.errorMessage}
        </FormHelperText>
      </FormControl>
    )}

    {phoneRegionCodeOtherShow && (
      <TextField
        sx={{
          width: {
            mobile: "100%",
          },
          height: 90
        }}
        InputLabelProps={{ className: "textfield_label" }}
        error={regionCodeOther.hasError}
        id="vezetekes2"
        label="Körzetszám2"
        placeholder="Körzetszám"
        value={regionCodeOther.value}
        required={true}
        disabled={mobilCodeDisabled}
        onChange={(event) => {
          isMountedRegionCodeOther.current = true;
          if (event.target.value.match(phoneNumber.regEx)) {
            setRegionCodeOther((prevState) => ({
              ...prevState,
              value: event.target.value,
            }));
          }
        }}
        helperText={regionCodeOther.errorMessage}
        color={regionCodeOther.color}
        variant={regionCodeOther.variant}
        inputProps={{ maxLength: maxPhoneLandLineInputLength }}
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
      id="mobil"
      label="Telefonszám"
      placeholder="Telefonszám"
      value={phoneNumber.value}
      required={true}
      disabled={phoneNumberDisabled}
      onChange={(event) => {
        isMountedPhoneNumber.current = true;
        if (event.target.value.match(phoneNumber.regEx)) {
          setPhoneNumber((prevState) => ({
            ...prevState,
            value: event.target.value,
          }));
        }
      }}
      helperText={phoneNumber.errorMessage}
      color={phoneNumber.color}
      variant={phoneNumber.variant}
      inputProps={{ maxLength: maxPhoneInputLength }}
    />
    </>
    )
}