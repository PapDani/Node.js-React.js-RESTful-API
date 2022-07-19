import React, { useState } from 'react';
import { useForm } from "react-hook-form";

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import TextField from '@mui/material/TextField';
import { FormHelperText, InputAdornment} from '@mui/material';


function Services(){

  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm({});

  const onSubmit = () =>{
    clearInputValues();
  }

  const clearInputValues = () => {
    setNevInputValue("");
    setMobileInputValue("");
    alert("Siker!");
  }

  const [nevInputValue, setNevInputValue] = useState();
  const [mobilInputValue, setMobileInputValue] = useState();

  /*
  const [isMobileInputSelected, setIsMobileInputSelected] = useState(false);
  const mobileFocus = () => setIsMobileInputSelected(true);
  const mobileBlur = () => setIsMobileInputSelected(false);


  const mobileAdornment = isMobileInputSelected 
  ? {
      startAdornment: <InputAdornment position='start'>+36</InputAdornment>
    }
  : {};
  */

  return(
    <div>
      <Container>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col md={{ span: 3, offset: 3 }}>
              <TextField type="text" className='form-control'{
                ...register("név", {
                    required: true,
                    minLength: 3,
                    maxLength: 20
                  })
                }
                id="standard-required"
                required
                value={nevInputValue}
                label="Név"
                placeholder='Név'
                defaultValue=""
                variant="standard"
                onChange={(e) => setNevInputValue(e.target.value)}
              />

              {errors?.név?.type === "required" && <FormHelperText>Kötelező kitölteni</FormHelperText>}
              {errors?.név?.type === "minLength" && <FormHelperText>Túl rövid</FormHelperText>}
              {errors?.név?.type === "maxLength" && <FormHelperText>Túl hosszú</FormHelperText>}
            </Col>

            <Col>
              <TextField type='text' className='form-control'{
                  ...register("mobil", {
                    required: true
                  })
                }

                InputProps={{
                  startAdornment: <InputAdornment position="start">+36</InputAdornment>,
                }}

                id="standard-required2"
                required
                value={mobilInputValue}
                label="Mobil"
                placeholder='00-000-0000'
                defaultValue=""
                variant="standard"
                onChange={(e) => setMobileInputValue(e.target.value)}
              />
            </Col>
            <Col>
                asd
            </Col>
          </Row>
          <Row>
            <Col>1 of 1</Col>
          </Row>

          <input type="submit" />

        </form>
      </Container>
    </div>
  );
}

export default Services
