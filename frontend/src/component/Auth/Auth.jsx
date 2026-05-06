import React from 'react'
import { Modal, Box } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import { LoginForm } from './LoginForm'
import { RegisterForm } from './RegisterForm'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  maxWidth: '90vw',
  bgcolor: '#1a1a1a', 
  color: 'white',
  borderRadius: '8px',
  boxShadow: 24,
  p: 4,
  outline: 'none'
};

export const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleOnClose = () => {
    navigate("/");
  }

  return (
    <React.Fragment>
      <Modal
        open={
          location.pathname === "/account/login" ||
          location.pathname === "/account/register" ||
          location.pathname === "/account-login" ||
          location.pathname === "/account-register"
        }
        onClose={handleOnClose}
      >
        <Box sx={style}>
          {(location.pathname === "/account/register" || location.pathname === "/account-register") ? <RegisterForm /> : <LoginForm />}
        </Box>
      </Modal>
    </React.Fragment>
  )
}
