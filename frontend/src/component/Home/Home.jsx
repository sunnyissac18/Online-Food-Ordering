import React, { useEffect, useState, useRef } from 'react'
import './Home.css';
import { MultiItemCarousel } from './MultiItemCarousel';
import RestaurantCard from '../Restaurant/RestaurantCard';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRestaurantsAction } from '../State/Restaurant/Action';
import { useNavigate } from 'react-router-dom';
import { Box, Modal, Button, Grid, TextField } from '@mui/material';
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

const addressValidationSchema = Yup.object().shape({
  streetAddress: Yup.string().required('Street Address is required'),
  state: Yup.string().required('State is required'),
  city: Yup.string().required('City is required'),
  pincode: Yup.string().required('Pincode is required'),
});

export const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const jwt = localStorage.getItem("jwt");
    const { restaurant, auth } = useSelector(store => store)

    const [searchQuery, setSearchQuery] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    
    // Address Modal State
    const [openAddressModal, setOpenAddressModal] = useState(false);
    const [savedLocationSummary, setSavedLocationSummary] = useState('');
    const dropdownRef = useRef(null);

    useEffect(() => {
        dispatch(getAllRestaurantsAction(jwt))
    }, [dispatch])

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Filter restaurants based on search query
    const filteredRestaurants = restaurant.restaurants?.filter(item => 
        item.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.cuisineType?.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setIsDropdownOpen(e.target.value.trim().length > 0);
    }

    const handleAddressSubmit = (values) => {
        const locString = `${values.streetAddress}, ${values.city}, ${values.state} - ${values.pincode}`;
        const existing = JSON.parse(localStorage.getItem('localAddresses') || '[]');
        
        // Avoid duplicates
        if (!existing.includes(locString)) {
            existing.push(locString);
            localStorage.setItem('localAddresses', JSON.stringify(existing));
        }
        setSavedLocationSummary(locString);
        setOpenAddressModal(false);
    };

    const handleNavigateToRestaurant = (item) => {
        if (item.open) {
          let city = 'city';
          if (item.address && item.address.city) {
            city = item.address.city;
          } else if (item.city) {
            city = item.city;
          }
          navigate(`/restaurant/${city}/${item.name}/${item.id}`)
        }
    };

    return (
        <div className='bg-white min-h-screen text-black pb-10 font-sans overflow-x-hidden'>
            
            {/* Orange Hero Section */}
            <div className="w-full bg-[#FF5200] text-white pt-10">

                {/* Hero Title and Search */}
                <div className="flex flex-col items-center mt-6 lg:mt-12 pb-24 px-4 relative">
                    <h1 className="text-[36px] md:text-[50px] font-bold text-center leading-tight tracking-[-1.5px] max-w-3xl mb-10">
                        Order food & groceries. Discover best restaurants. Sunny Food it!
                    </h1>
                    
                    <div className="flex flex-col md:flex-row gap-4 w-full max-w-4xl mx-auto text-[15px] relative">
                        {/* Delivery Location Field */}
                        <div 
                            onClick={() => setOpenAddressModal(true)}
                            className="flex-1 bg-white rounded-2xl flex items-center px-5 py-4 text-black shadow-lg cursor-pointer hover:bg-gray-50 transition"
                        >
                            <svg className="w-5 h-5 text-[#FF5200] mr-3 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/></svg>
                            <div className="w-full outline-none font-medium truncate text-gray-800">
                                {savedLocationSummary ? savedLocationSummary : "Enter your delivery location"}
                            </div>
                            <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/></svg>
                        </div>

                        {/* Search Field */}
                        <div className="flex-[1.8] relative bg-white rounded-2xl flex items-center px-5 py-4 text-black shadow-lg" ref={dropdownRef}>
                            <input 
                                type="text" 
                                placeholder="Search for restaurant, item or more" 
                                className="w-full outline-none font-medium placeholder-gray-400 bg-transparent text-gray-800"
                                value={searchQuery}
                                onChange={handleSearchChange}
                                onFocus={() => setIsDropdownOpen(searchQuery.trim().length > 0)}
                            />
                            <svg className="w-[18px] h-[18px] text-gray-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                            
                            {/* Search Dropdown */}
                            {isDropdownOpen && (
                                <div className="absolute top-[110%] left-0 w-full bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50 max-h-[300px] overflow-y-auto">
                                    {filteredRestaurants.length > 0 ? (
                                        filteredRestaurants.slice(0, 6).map((item, idx) => (
                                            <div 
                                                key={item.id || idx} 
                                                onClick={() => handleNavigateToRestaurant(item)}
                                                className={`px-5 py-3 border-b border-gray-50 flex items-center hover:bg-orange-50 transition cursor-pointer ${!item.open && 'opacity-60'}`}
                                            >
                                                <div className="w-10 h-10 rounded overflow-hidden mr-3 shrink-0 bg-gray-100">
                                                    <img src={item.images?.[0] || "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=100&fit=crop"} alt={item.name} className="w-full h-full object-cover" />
                                                </div>
                                                <div className="flex flex-col overflow-hidden">
                                                    <span className="font-semibold text-gray-800 truncate">{item.name}</span>
                                                    <span className="text-xs text-gray-500 truncate">{item.description || item.cuisineType || 'Restaurant'} {item.open ? '' : '(Closed)'}</span>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="px-5 py-4 text-gray-500 font-medium">No matches found for "{searchQuery}"</div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Food Categories Section */}
            <section className='w-full px-4 pt-16 pb-12' >
                <div className='max-w-6xl mx-auto mb-8'>
                    <h2 className='text-[26px] font-bold tracking-[-0.5px] text-[#02060c]'>Order our best food options</h2>
                </div>
                <div className="w-full">
                    <MultiItemCarousel />
                </div>
            </section>

            {/* Top Restaurants Section */}
            <section className='max-w-6xl mx-auto px-4 pt-10 pb-20'>
                <div className='flex justify-between items-center mb-6'>
                    <h2 className='text-[26px] font-bold tracking-[-0.5px] text-[#02060c]'>
                        {searchQuery ? `Search Results for "${searchQuery}"` : 'Discover best restaurants'}
                    </h2>
                </div>
                
                {/* Dynamically mapped actual restaurant rows */}
                {filteredRestaurants.length === 0 ? (
                    <div className="text-gray-500 text-center py-10 font-medium text-lg">No restaurants found matching your search.</div>
                ) : (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10'>
                        {filteredRestaurants.map((item, index) => (
                            <RestaurantCard key={item.id || index} item={item} />
                        ))}
                    </div>
                )}
            </section>

            {/* Delivery Address Modal */}
            <Modal
                open={openAddressModal}
                onClose={() => setOpenAddressModal(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <h2 className="text-xl font-bold mb-4">Set Delivery Location</h2>
                    <Formik
                        initialValues={{ streetAddress: '', state: '', city: '', pincode: '' }}
                        validationSchema={addressValidationSchema}
                        onSubmit={handleAddressSubmit}
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
                                        Save & Apply
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
