import "./App.css";
import { Navbar } from "./component/Navbar/Navbar";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { darkTheme } from "./Theme/DarkTheme";
import { Home } from "./component/Home/Home";
import RestaurantDetails from "./component/Restaurant/RestaurantDetails";
import Cart from "./component/Cart/Cart";
import Profile from "./component/Profile/Profile";
import { Auth } from "./component/Auth/Auth";

import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUser } from "./component/State/Authentication/Action";
import { findCart } from "./component/State/Cart/Action";
import { PaymentSuccess } from "./component/PaymentSuccess/PaymentSuccess";
import { AdminRoute } from "./Routers/AdminRoute";
import { getRestaurantByUserId } from "./component/State/Restaurant/Action";

function AppContent() {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const auth = useSelector((store) => store.auth);
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  useEffect(() => {
    if (auth.jwt || jwt) {
      dispatch(getUser(auth.jwt || jwt));
      dispatch(findCart(jwt));
    }
  }, [auth.jwt, jwt, dispatch]);

  useEffect(() => {
    dispatch(getRestaurantByUserId(auth.jwt || jwt));
  }, [auth.user]);

  return (
    <>
      {!isAdminRoute && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account/:register" element={<Home />} />
        <Route path="/account-login" element={<Home />} />
        <Route path="/account-register" element={<Home />} />
        <Route
          path="/restaurant/:city/:title/:id"
          element={<RestaurantDetails />}
        />
        <Route path="/cart" element={<Cart />} />
        <Route path="/my-profile/*" element={<Profile />} />
        <Route path="/payment/success/:id" element={<PaymentSuccess />} />
        <Route path="/admin/restaurant/*" element={<AdminRoute />} />
      </Routes>
      <Auth />
    </>
  );
}

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
