import React from 'react'
import { useSelector } from 'react-redux'
import RestaurantCard from '../Restaurant/RestaurantCard';

export const Favorites = () => {
    const { auth } = useSelector(store => store);
    return (
        <div className="p-4 md:p-8">
            <h1 className='py-5 text-2xl font-bold text-center mb-6'>My Favorites</h1>
            
            {auth.favourites?.length === 0 ? (
                <div className="text-center text-gray-500 mt-10">You have no favorite restaurants yet.</div>
            ) : (
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10'>
                    {auth.favourites?.map((item, index) => (
                        <RestaurantCard key={item.id || index} item={item} />
                    ))}
                </div>
            )}
        </div>
    )
}
