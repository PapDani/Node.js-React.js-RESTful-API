import React, { useState } from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import CheckCircleSharpIcon from '@mui/icons-material/CheckCircleSharp';

function Services(){

  const [nevValue, setNevValue] = useState('');
  const handleNevChange = (event) => {
    setNevValue(event.target.value);
    nevError();
  }

  const nevValidate = () => {
    alert(nevValue);
  }

  const [nevErrorBoolean, setNevErrorBoolean] = useState(false);
  const [nevErrorMsg, setNevErrorMsg] = useState('');
  const [nevColor, setNevColor] = useState('primary')
  const [nevVariant, setNevVariant] = useState("outlined");
  
  const nevReg = new RegExp("^([A-ZÁÉÍÓÖŐÚÜŰ]([a-záéíóöőúüű.]+\s?)){2,}$");
  const nevReg2 = /^[a-zA-Z]+$/;
  const nevReg3 = /^[a-zA-Z\s]*$/;
  const phoneRegex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;
  const specialChars = /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]+$/g;
  const specialChars2 = /^[A-Za-z0-9\!\@\#\$\%\^\&\*\)\(+\=\._-]+$/g
  const specialChars3 = /[-!$%^&*()_+|~=`{}\[\]:\/;<>?,.@#]/;

  const nevError = () => {
    if(nevValue === undefined || nevValue === null || nevValue === " "){
      setNevErrorBoolean(true);
      setNevErrorMsg("Nem lehet üres ez a mező!")
    }
    else{
      if(nevValue.length < 3){
        setNevErrorBoolean(true);
        setNevErrorMsg("Minimum 3 karakter hosszúságú legyen!")
      }else if(nevValue.length >= 25){
        setNevErrorBoolean(true);
        setNevErrorMsg("Maximum 25 karakter husszú lehet!")
      }else{
        if(!nevValue.match(specialChars3)){
          setNevErrorBoolean(false);
          setNevErrorMsg(<CheckCircleSharpIcon/>);
          setNevColor('success');
          setNevVariant('outlined');
        }else{
          setNevErrorBoolean(true);
          setNevErrorMsg("Hibás név formátum!");
        }
      }
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    nevValidate();
    nevError();
  }

  return(
    <div>
      <Box
        component=""
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <form onSubmit={handleSubmit}>
          <div>
            <TextField
              error={nevErrorBoolean}
              id="1"
              value={nevValue}
              required={true}
              onChange={handleNevChange}
              helperText={nevErrorMsg}
              color={nevColor}
              variant={nevVariant}
              //inputProps={{ pattern: "^([A-ZÁÉÍÓÖŐÚÜŰ]([a-záéíóöőúüű.]+\s?)){2,}$" }}
            />

            <TextField

            />
          </div>
          <div>
            <TextField

            />
            <TextField

            />
          </div>
          <div>
            <TextField

            />
            <TextField

            />
          </div>

          <Button type='submit' variant="contained">Küldés</Button>

        </form>
      </Box>
    </div>
  );
}

export default Services