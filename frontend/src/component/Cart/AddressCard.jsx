import React from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Button, Card } from '@mui/material';

export const AddressCard = ({ item, showButton, handleSelectAddress }) => {
    return (
        <Card className="flex gap-5 w-full sm:w-64 p-5 shadow-sm rounded-xl">
            <LocationOnIcon className="text-gray-400 mt-1" />
            <div className="space-y-3 text-gray-400">
                <h1 className="font-semibold text-lg text-white">{item?.city || item?.state || 'Delivery Address'}</h1>
                <p className="text-sm leading-relaxed">
                    {item ? [item.streetAddress, item.city, item.state, item.postalCode || item.pincode, item.country].filter(Boolean).join(', ') : 'No address provided'}
                </p>
                {showButton && (
                    <Button variant="outlined" sx={{ color: '#FF5200', borderColor: '#FF5200' }} fullWidth onClick={() => handleSelectAddress(item)}>
                        Deliver Here
                    </Button>
                )}
            </div>
        </Card>
    );
};
