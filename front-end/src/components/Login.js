import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import Center from './Center';
import useForm from '../hooks/useForm';
import { ENDPOINTS, createAPIEndpoint } from '../api';

const getFreshModel = () => ({
  name: '',
  email: '',
});

export default function Login() {
  const { values, setValues, errors, setErrors, handleInputChange } =
    useForm(getFreshModel);

  const login = (e) => {
    e.preventDefault();

    console.log('Clicked?');
    if (validate()) {
      createAPIEndpoint(ENDPOINTS.participant)
        .post(values)
        .then((res) => console.log('RES>>', res))
        .catch((err) => console.log('Err>', err));
    }
  };

  const validate = () => {
    let temp = {};
    temp.email = /\S+@\S+\.\S+/.test(values.email) ? '' : 'Email is not valid.';
    temp.name = values.name != '' ? '' : 'This field is required.';
    setErrors(temp);
    return Object.values(temp).every((x) => x == '');
  };

  return (
    <Center>
      <Card sx={{ width: 400 }}>
        <CardContent sx={{ textAlign: 'center' }}>
          <Typography variant='h3' sx={{ my: 3 }}>
            Quiz App
          </Typography>
          <Box
            sx={{
              '& .MuiTextField-root': {
                margin: 1,
                width: '90%',
              },
            }}
          >
            <form noValidate onSubmit={login}>
              <TextField
                value={values.email}
                onChange={handleInputChange}
                label='Email'
                name='email'
                variant='outlined'
                {...(errors.email && { error: true, helperText: errors.email })}
              />
              <TextField
                value={values.name}
                onChange={handleInputChange}
                label='Name'
                name='name'
                variant='outlined'
                {...(errors.name && { error: true, helperText: errors.name })}
              />
              <Button
                type='submit'
                variant='contained'
                size='large'
                sx={{ width: '90%' }}
              >
                Start
              </Button>
            </form>
          </Box>
        </CardContent>
      </Card>
    </Center>
  );
}
