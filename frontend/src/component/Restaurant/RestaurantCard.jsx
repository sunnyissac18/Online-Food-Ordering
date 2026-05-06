import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavourite } from '../State/Authentication/Action';
import { isPresentInFavourites } from '../config/logic';

const RestaurantCard = ({ item }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { auth } = useSelector(store => store)

  const handleAddToFavourites = (e) => {
    e.stopPropagation();
    if(jwt) {
      dispatch(addToFavourite({ restaurantId: item.restaurantId || item.id, jwt }))
    } else {
      navigate('/my-profile');
    }
  }

  const handleNavigateToRestaurant = () => {
    if (item.open !== false) {
      let city = 'city';
      if (item.address && item.address.city) {
        city = item.address.city;
      } else if (item.city) {
        city = item.city;
      }
      navigate(`/restaurant/${city}/${item.title || item.name}/${item.restaurantId || item.id}`)
    }
  }

  const imageUrl = item.images && item.images.length > 0 ? item.images[0] : (item.images?.[1] || "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&fit=crop");
  
  // Favourites API payload doesn't pass 'open' property, thus it's undefined. Default to true if not explicitly false.
  const isOpen = item.open !== false;

  return (
    <div 
      onClick={handleNavigateToRestaurant}
      className={`w-full flex-shrink-0 group overflow-hidden transition-all duration-200 transform hover:scale-[0.98] cursor-pointer ${!isOpen && 'opacity-80'}`}
    >
       {/* Image container */}
       <div className="relative w-full h-[180px] lg:h-[200px] rounded-[16px] overflow-hidden mb-3 shadow-[0_4px_12px_rgba(0,0,0,0.1)] bg-gray-100">
           <img src={imageUrl} className="w-full h-full object-cover" alt={item.name} />
           
           {/* Gradient overlay for text */}
           <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/25 to-transparent"></div>
           
           {/* Open/Closed Badge (Top Left) */}
           <div className="absolute top-3 left-3">
              <span className={`text-[11px] font-bold px-2 py-0.5 rounded shadow-sm ${isOpen ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {isOpen ? 'OPEN' : 'CLOSED'}
              </span>
           </div>

           {/* Name (Bottom Overlay) */}
           <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
               <h3 className="text-white text-[22px] font-black tracking-tight line-clamp-2 mr-2 drop-shadow-md leading-tight">{item.title || item.name}</h3>
           </div>

           {/* Favorite Icon (Top Right) */}
           <button onClick={handleAddToFavourites} className="absolute top-3 right-3 text-white bg-black/25 p-2 rounded-full backdrop-blur-sm hover:bg-black/50 transition-colors z-10">
               {isPresentInFavourites(auth.favourites, item) ? (
                 <svg className="w-5 h-5 text-red-500 fill-current" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
               ) : (
                 <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
               )}
           </button>
       </div>

       {/* Details - Entirely dynamic */}
       <div className="px-1 text-black">
           <div className="flex justify-between items-center mb-0.5">
               <p className="text-[#02060c] text-[15px] font-semibold truncate tracking-[-0.2px] pr-2">
                 {item.description || item.cuisineType || 'Restaurant'}
               </p>
           </div>
           
           <div className="flex flex-col gap-0.5">
               <p className="text-gray-500 text-[13px] truncate">
                   {item.address?.streetAddress ? `${item.address.streetAddress}, ` : ''}{item.address?.city || item.city || ''}
               </p>
           </div>
       </div>
    </div>
  )
}

export default RestaurantCard

