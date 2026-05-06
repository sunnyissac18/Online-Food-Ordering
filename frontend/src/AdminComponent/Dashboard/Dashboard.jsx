import React, { useState } from 'react'
import { MenuTable } from '../Menu/MenuTable'
import { OrderTable } from '../Orders/OrderTable'
import { IconButton, Typography } from '@mui/material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

export const RestaurantDashboard = () => {
  const [activeComponent, setActiveComponent] = useState('menu') // 'menu' or 'orders'

  const handleToggle = () => {
    setActiveComponent((prev) => (prev === 'menu' ? 'orders' : 'menu'))
  }

  return (
    <div className="p-5">
      <div className="flex items-center mb-6 space-x-4">
        <IconButton onClick={handleToggle} color="inherit">
          <ArrowBackIosIcon fontSize="small" />
        </IconButton>
        
        <Typography variant="h5" sx={{ fontWeight: 'bold', minWidth: '150px', textAlign: 'center' }}>
          {activeComponent === 'menu' ? 'Menu Overview' : 'Recent Orders'}
        </Typography>

        <IconButton onClick={handleToggle} color="inherit">
          <ArrowForwardIosIcon fontSize="small" />
        </IconButton>
      </div>

      <div className="w-full">
        {activeComponent === 'menu' ? <MenuTable /> : <OrderTable />}
      </div>
    </div>
  )
}
