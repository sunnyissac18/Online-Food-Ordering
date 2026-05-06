import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, NavLink, Routes, Route } from "react-router-dom";
import { AdminSideBar } from "./AdminSideBar";
import { RestaurantDashboard } from "../Dashboard/Dashboard";
import { Orders } from "../Orders/Orders";
import { Menu } from "../Menu/Menu";
import { FoodCategory } from "../FoodCategory/FoodCategory";
import { Ingredients } from "../Ingredients/Ingredients";
import { RestaurantDetails } from "./RestaurantDetails";
import CreateMenuForm from "../Menu/CreateMenuForm";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import {
  getRestaurantById,
  getRestaurantsCategory,
} from "../../component/State/Restaurant/Action";
import { getMenuItemsByRestaurantId } from "../../component/State/Menu/Action";
import { getUsersOrders } from "../../component/State/Order/Action";
import { fetchRestaurantsOrder } from "../../component/State/Restaurant Order/Action";

const DRAWER_WIDTH = 200;

export const Admin = () => {
  const jwt = localStorage.getItem("jwt");
  const { restaurant } = useSelector((store) => store);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  // const handleClose = () => {};

  useEffect(() => {
    dispatch(
      getRestaurantsCategory({
        jwt,
        restaurantId: restaurant.usersRestaurant?.id,
      }),
    );
    dispatch(
      fetchRestaurantsOrder({
        jwt,
        restaurantId: restaurant.usersRestaurant?.id,
      }),
    );
   
  }, []);

  return (
    <div>
      <div className="lg:hidden flex justify-between items-center px-5 py-3 border-b border-gray-600">
        <span className="text-xl font-bold">Admin Panel</span>
        <IconButton onClick={() => setOpen(true)}>
          <MenuIcon className="text-white" />
        </IconButton>
      </div>
      <div className="lg:flex justify-between">
        <div>
          <AdminSideBar handleClose={handleClose} open={open} />
        </div>
        <div className="lg:w-[80%] ">
          <Routes>
            <Route path="/" element={<RestaurantDashboard />} />
            <Route path="orders" element={<Orders />} />
            <Route path="menu" element={<Menu />} />
            <Route path="category" element={<FoodCategory />} />
            <Route path="ingredients" element={<Ingredients />} />
            <Route path="details" element={<RestaurantDetails />} />
            <Route path="add-menu" element={<CreateMenuForm />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};
