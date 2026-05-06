import React, { useState } from 'react'
import { ProfileNavigation } from './ProfileNavigation'
import { Route, Routes } from 'react-router-dom'
import { UserProfile } from './UserProfile'
import { Orders } from './Orders'
import { Address } from './Address'
import { Favorites } from './Favorites'
import { Payment } from './Payment'
import { Notification } from './Notification'

const Profile = () => {
  const [openSideBar, setOpenSideBar] = useState(false);
  return (
    <div className='lg:flex justify-between '>
      <div className='sticky h-[80vh] lg:w-[20%] z-10'>
        <ProfileNavigation open={openSideBar} />
      </div>
      <div className='lg:w-[80%] pt-2'>
        <Routes>
          <Route path="/" element={<UserProfile />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/address" element={<Address />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/payments" element={<Payment />} />
          <Route path="/notification" element={<Notification />} />
        </Routes>
      </div>
    </div>
  )
}

export default Profile
