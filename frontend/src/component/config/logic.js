export const isPresentInFavourites=(favourites,restaurant)=>{
    for(let item of favourites){
        if(restaurant.id === item.id || restaurant.id === item.restaurantId){
            return true;
        }
    }
    return false;
}