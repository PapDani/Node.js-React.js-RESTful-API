import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';

function Services() {
  return (
    <div>
      <h3>Szolgáltatások</h3>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 2, width: '25ch' },
        }}
        m={3}
        p={0}
        textAlign="center"
        Validate
        autoComplete="off"
    >
      <div>
        <TextField
          required
          id="standard-required"
          label="Név"
          placeholder='Név'
          defaultValue=""
          variant="standard"
        />
        <TextField
          id="standard-multiline-static"
          label="Leírás"
          placeholder="Írja le, hogy miben segíthetünk"
          multiline
          rows={4}
          variant="standard"
        />
      </div>
      <div>
        <TextField
          required
          id="standard-required"
          label="Email"
          placeholder='Email'
          defaultValue=""
          variant="standard"
        />
      </div>
      <div>
        <TextField inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
          required
          id="standard-required"
          label=" "
          placeholder='Telefonszám'
          defaultValue=""
          variant="standard"
          InputProps={{
            startAdornment: <InputAdornment position="start">+36</InputAdornment>
          }}
        />
      </div>
    
        <div>
          <Button variant="contained" endIcon={<SendIcon />}>
            Küldés
          </Button>
        </div>
      </Box>
    </div>
  )
}

export default Services