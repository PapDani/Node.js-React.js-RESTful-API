import '../Services.css';
import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import FormControl from '@mui/material/FormControl';

function Services() {
  return (
    <div>

      <h3>Szolgáltatások</h3>

      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 2, width: '25ch' },
          maxWidth: '100%',
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
            required
            id="standard-required"
            label="Email"
            placeholder='Email'
            defaultValue=""
            variant="standard"
          />

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

      <FormControl fullWidth sx={{m: 1}} variant="standard">
        <InputLabel htmlFor="description">Leírás</InputLabel>
        <Input
          id="description"
          placeholder='Írja le, hogy miben segíthetünk'
          multiline
          rows={4}
        />
      </FormControl>
    
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