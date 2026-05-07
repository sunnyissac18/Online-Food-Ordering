import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { Avatar, Badge, IconButton } from '@mui/material';
import { pink } from '@mui/material/colors';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PersonIcon from '@mui/icons-material/Person';
import { Person } from '@mui/icons-material';

export const Navbar = () => {
    const { auth, cart } = useSelector((store) => store)
    const navigate = useNavigate();
    return (
        <div className='px-5 sticky top-0 z-50 py-[.8rem] bg-[#FF5200] lg:px-20 
   flex justify-between items-center shadow-md'>

            <div className='lg:mr-10 cursor-pointer flex items-center space-x-4'>

                <li onClick={() => navigate("/")} className='logo font-bold text-white text-3xl list-none'>
                    CraveKart
                </li>

            </div>

            <div className='flex items-center space-x-2 lg:space-x-10 text-white'>

                <div>
                    {/* <IconButton sx={{ color: 'white' }}>
                        <SearchIcon sx={{ fontSize: "1.5rem" }} />
                    </IconButton> */}
                </div>
                <div className=''>
                    {auth.user ? (
                        <Avatar onClick={() => navigate(auth.user?.role === "ROLE_CUSTOMER" ? "/my-profile" : "/admin/restaurant")} sx={{ bgcolor: "white", color: "#FF5200", cursor: "pointer", fontWeight: "bold" }}>
                            {auth.user?.fullName[0].toUpperCase()}
                        </Avatar>
                    ) : (

                        <IconButton sx={{ color: 'white' }} onClick={() => navigate("/account-login")} >
                            <Person />
                        </IconButton>
                    )}
                </div>
                <div className=''>
                    <IconButton sx={{ color: 'white' }} onClick={() => navigate("/cart")} >
                        <Badge badgeContent={cart.cartItems?.length || 0} color="primary" sx={{ '& .MuiBadge-badge': { backgroundColor: 'white', color: '#FF5200', fontWeight: 'bold' } }}>
                            <ShoppingCartIcon sx={{ fontSize: "1.5rem" }} />
                        </Badge>
                    </IconButton>
                </div>

            </div>

        </div>
    )
}
