import React, { useState } from 'react';
import {useForm } from "react-hook-form";
import InputMask from "react-input-mask";

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import TextField from '@mui/material/TextField';
import { FormHelperText} from '@mui/material';
import Input from '@mui/material/Input';


function Services(){

  const leirasCharacterLimit = 100;

  const [leirasValues, setLeirasValues] = useState({
    leirasInitialValue: ""
  });

  const handleLeirasChange = leirasInitialValue => event => {
    setLeirasValues({...leirasValues, [leirasInitialValue]: event.target.value});
  };

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
    setMobilInputValue("");
    setEmailInputValue("");
    leirasValues.leirasInitialValue = "";
    alert("Siker!");
  }

  const [nevInputValue, setNevInputValue] = useState();
  const [mobilInputValue, setMobilInputValue] = useState();
  const [emailInputValue, setEmailInputValue] = useState();

  return(
    <div>
      <Container>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col>
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
              <InputMask
                mask="+36-99-999-9999"
                value={mobilInputValue}
                disabled={false}
                maskChar=" "
                onChange={(e) => setMobilInputValue(e.target.value)}
              >
                {() => 
                    <TextField className='form-control'
                  /*
                    InputProps={{
                      startAdornment: <InputAdornment position="start">+36</InputAdornment>,
                    }}
                  */
                    type="tel"
                    pattern='[0-9]{3}-[0-9]{2}-[0-9]{3}'
                    id="standard-required2"
                    required
                    label="Mobil"
                    //placeholder='00-000-0000'
                    defaultValue=""
                    variant="standard"
                  />
                }
              </InputMask>
            </Col>
            {errors?.mobil?.type === "minLength" && <FormHelperText>Túl rövid telefonszám</FormHelperText>}

            <Col>
              <TextField type="email" className='form-control'{
                ...register("email", {
                  required: true
                })
              }

                required
                value={emailInputValue}
                id="standard-required"
                label="Email"
                placeholder='minta1@email.com'
                defaultValue=""
                variant="standard"

                onChange={(e) => setEmailInputValue(e.target.value)}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <TextField
                id="standard-textarea"
                label="Leírás"
                placeholder="Kérjük írja le, hogy miben segíthetünk"
                multiline
                variant="standard"
                rows={2}
                value={leirasValues.leirasInitialValue}
                helperText={`${leirasValues.leirasInitialValue.length}/${leirasCharacterLimit}`}
                onChange={handleLeirasChange("leirasInitialValue")}
              />
            </Col>
          </Row>

          <input type="submit" />

          <label for="phone">Enter your phone number:</label>
          <input type="tel" id="phone" name="phone" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"></input>

          <Input type='tel' id="phone2" name="phone2" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"></Input>

        </form>
      </Container>
    </div>
  );
}

export default Services