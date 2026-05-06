import React, { useState, useEffect } from 'react'
import { AddressCard } from '../Cart/AddressCard'
import { useSelector } from 'react-redux'
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import { Button, Card, Modal, Box, Grid, TextField } from '@mui/material'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  outline: "none",
  boxShadow: 24,
  p: 4,
  borderRadius: 2
};

const initialValues = {
  streetAddress: '',
  state: '',
  city: '',
  pincode: ''
};

const validationSchema = Yup.object().shape({
  streetAddress: Yup.string().required('Street Address is required'),
  state: Yup.string().required('State is required'),
  city: Yup.string().required('City is required'),
  pincode: Yup.string().required('Pincode is required'),
});

export const Address = () => {
    const { auth } = useSelector(store => store);
    const [open, setOpen] = useState(false);
    const [localAddresses, setLocalAddresses] = useState([]);
    
    useEffect(() => {
        try {
            const saved = JSON.parse(localStorage.getItem('localAddresses') || '[]');
            setLocalAddresses(saved.map(loc => ({ streetAddress: loc, isLocal: true })));
        } catch {
            setLocalAddresses([]);
        }
    }, []);

    const handleOpenAddressModal = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    const handleSubmit = (values) => {
        console.log("New Address Submitted", values);
        // Dispatch action to save address here when API is ready
        handleClose();
    };

    const rawAddresses = auth.user?.addresses || [];
    const validBackendAddresses = rawAddresses.filter(addr => addr.streetAddress || addr.city || addr.state || addr.pincode);
    const combinedAddresses = [...validBackendAddresses, ...localAddresses];

    return (
        <div className='p-4 md:p-8 flex flex-col'>
            <h1 className='text-2xl font-bold py-5 text-center mb-6'>Addresses</h1>
            
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center w-full max-w-6xl mx-auto'>
                {combinedAddresses.map((item, i) => (
                    <AddressCard key={i} item={item} showButton={false} />
                ))}
                
                <Card className="flex flex-col items-center justify-center gap-4 w-full sm:w-64 p-5 py-8 border-2 border-dashed border-gray-600 cursor-pointer hover:border-gray-400 transition-colors shadow-sm rounded-xl">
                    <AddLocationAltIcon sx={{ fontSize: '3rem', color: '#888' }} />
                    <h1 className="font-semibold text-lg text-gray-300">Add New Address</h1>
                    <Button variant="contained" sx={{ backgroundColor: '#FF5200', '&:hover': { backgroundColor: '#cc4200' }, mt: 2 }} onClick={handleOpenAddressModal}>
                        Add
                    </Button>
                </Card>
            </div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <h2 className="text-xl font-bold mb-4">Add Delivery Address</h2>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        <Form>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Field
                                        as={TextField}
                                        name="streetAddress"
                                        label="Street Address"
                                        fullWidth
                                        variant="outlined"
                                    />
                                    <ErrorMessage name="streetAddress" component="div" className="text-red-500 text-xs mt-1" />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        as={TextField}
                                        name="state"
                                        label="State"
                                        fullWidth
                                        variant="outlined"
                                    />
                                    <ErrorMessage name="state" component="div" className="text-red-500 text-xs mt-1" />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        as={TextField}
                                        name="city"
                                        label="City"
                                        fullWidth
                                        variant="outlined"
                                    />
                                    <ErrorMessage name="city" component="div" className="text-red-500 text-xs mt-1" />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        as={TextField}
                                        name="pincode"
                                        label="Pincode"
                                        fullWidth
                                        variant="outlined"
                                    />
                                    <ErrorMessage name="pincode" component="div" className="text-red-500 text-xs mt-1" />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button type="submit" variant="contained" sx={{ backgroundColor: '#FF5200', '&:hover': { backgroundColor: '#cc4200' }, mt: 2 }} fullWidth>
                                        Save Address
                                    </Button>
                                </Grid>
                            </Grid>
                        </Form>
                    </Formik>
                </Box>
            </Modal>
        </div>
    )
}
