import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { registerUser } from '../State/Authentication/Action'
import { useDispatch } from 'react-redux'

const initialValues = {
  fullName: "",
  email: "",
  password: "",
  role: "ROLE_CUSTOMER"
}

export const RegisterForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSubmit = (values) => {
    console.log("form values", values)
    dispatch(registerUser({userData:values,navigate}))
  };

  return (
    <div>
      <Typography variant="h5" className='text-center pb-5'>
        Register
      </Typography>

      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form>
          <Field
            as={TextField}
            name="fullName"
            label="Full Name"
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

          <FormControl fullWidth margin="normal">
            <InputLabel id="role-select-label">Role</InputLabel>
            <Field
              as={Select}
              labelId="role-select-label"
              id="role-select"
              name="role"
              label="Role"
              sx={{
                "& .MuiOutlinedInput-notchedOutline": { borderColor: "gray" },
                "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "white" }
              }}
            >
              <MenuItem value={"ROLE_CUSTOMER"}>Customer</MenuItem>
              <MenuItem value={"ROLE_RESTAURANT_OWNER"}>Restaurant Owner</MenuItem>
            </Field>
          </FormControl>

          <Button sx={{ mt: 2, padding: "1rem" }} fullWidth type='submit' variant='contained'>
            Register
          </Button>
        </Form>
      </Formik>

      <Typography variant='body2' align='center' sx={{ mt: 3 }}>
        Already have an account?
        <Button size='small' onClick={() => navigate("/account-login")}>
          login
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
