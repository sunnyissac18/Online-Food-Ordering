import React from 'react';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeIcon from '@mui/icons-material/Home';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import LogoutIcon from '@mui/icons-material/Logout';
import { Divider, Drawer, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../State/Authentication/Action';

const menu = [
  { title: "Orders", icon: <ShoppingBagIcon /> },
  { title: "Favorites", icon: <FavoriteIcon /> },
  { title: "Address", icon: <HomeIcon /> },
  { title: "Payments", icon: <AccountBalanceWalletIcon /> },
  { title: "Notification", icon: <NotificationsActiveIcon /> },
  { title: "Logout", icon: <LogoutIcon /> }
];

export const ProfileNavigation = ({ open, handleClose }) => {
  const isSmallScreen = useMediaQuery('(max-width:900px)');
  const navigate = useNavigate();
  const dispatch=useDispatch();

  const handleNavigate = (item) => {
    if (item.title === "Logout") {
      dispatch(logout());
      navigate("/")
      if (handleClose) handleClose();
    } else {
      navigate(`/my-profile/${item.title.toLowerCase()}`);
      if (handleClose) handleClose();
    }
  };

  return (
    <div>
      <Drawer
        variant={isSmallScreen ? "temporary" : "permanent"}
        onClose={handleClose}
        open={isSmallScreen ? open : true}
        anchor="left"
        sx={{
          zIndex: -1,
          position: "sticky",
          "& .MuiDrawer-paper": {
            width: "50vw",
            [isSmallScreen ? 'maxWidth' : 'width']: isSmallScreen ? '50vw' : '20vw',
            boxSizing: "border-box",
            backgroundColor: "inherit",
            color: "white",
            paddingTop: "6rem",
          }
        }}
      >
        <div className='w-full'>
          {menu.map((item, i) => (
            <React.Fragment key={i}>
              <div onClick={() => handleNavigate(item)} className='px-5 flex items-center space-x-5 cursor-pointer py-5'>
                {item.icon}
                <span>{item.title}</span>
              </div>
              {i !== menu.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </div>
      </Drawer>
    </div>
  )
}
