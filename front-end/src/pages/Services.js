import React, { useState } from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function Services(){

  const[nevValue, setNevValue] = useState();

  const nevValidate = () => {
    alert(nevValue);
  }

  return(
    <div>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            id="1"
            value={nevValue}
            onChange={(e) => setNevValue(e.target.value)}
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

        <Button variant="contained" onClick={nevValidate()}>Küldés</Button>
      </Box>
    </div>
  );
}

export default Services