import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Admin } from "../AdminComponent/Admin/Admin";
import { RestaurantDashboard as Dashboard } from "../AdminComponent/Dashboard/Dashboard";
import { Orders } from "../AdminComponent/Orders/Orders";
import { Menu } from "../AdminComponent/Menu/Menu";
import { FoodCategory } from "../AdminComponent/FoodCategory/FoodCategory";
import { Ingredients } from "../AdminComponent/Ingredients/Ingredients";
import { Details } from "../AdminComponent/Details/Details";
import CreateRestaurantForm from "../AdminComponent/CreateRestaurantForm/CreateRestaurantForm";
import { useSelector } from "react-redux";

export const AdminRoute = () => {
  const {restaurant} =useSelector(store=>store)
  return (
    <Routes>
      <Route path="/*" element={!restaurant.usersRestaurant ? <CreateRestaurantForm /> : <Admin />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="orders" element={<Orders />} />
        <Route path="menu" element={<Menu />} />
        <Route path="category" element={<FoodCategory />} />
        <Route path="ingredients" element={<Ingredients />} />
        <Route path="details" element={<Details />} />
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="*" element={<Navigate to="dashboard" replace />} />
      </Route>
    </Routes>
  );
};
