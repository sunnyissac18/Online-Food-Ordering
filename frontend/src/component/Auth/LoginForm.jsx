import { Button, TextField, Typography } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../State/Authentication/Action'

const initialValues = {
  email: "",
  password: ""
}

export const LoginForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    dispatch(loginUser({userData:values,navigate}))
  }

  return (
    <div>
      <Typography variant="h5" className='text-center pb-5'>
        Login
      </Typography>

      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form>
          <Field
            as={TextField}
            name="email"
            label="Email Address"
            fullWidth
            variant="outlined"
            margin="normal"
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "gray" },
                "&:hover fieldset": { borderColor: "white" },
              }
            }}
          />
          <Field
            as={TextField}
            name="password"
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            margin="normal"
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "gray" },
                "&:hover fieldset": { borderColor: "white" },
              }
            }}
          />
          <Button sx={{ mt: 2, padding: "1rem" }} fullWidth type='submit' variant='contained'>
            Login
          </Button>
        </Form>
      </Formik>

      <Typography variant='body2' align='center' sx={{ mt: 3 }}>
        Don't have an account?
        <Button size='small' onClick={() => navigate("/account-register")}>
          register
        </Button>
      </Typography>
      <Typography variant='body2' align='center' sx={{ mt: 1 }}>
        <Button size='small' color="secondary">
          forgot password
        </Button>
      </Typography>
    </div>
  )
}
