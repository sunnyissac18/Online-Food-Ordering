import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import StorefrontIcon from "@mui/icons-material/Storefront";
import CategoryIcon from "@mui/icons-material/Category";
import KitchenIcon from "@mui/icons-material/Kitchen";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { Divider, Drawer, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../component/State/Authentication/Action";

const menu = [
  { title: "Dashboard", icon: <DashboardIcon />, path: "/" },
  { title: "Orders", icon: <ShoppingBagIcon />, path: "/orders" },
  { title: "Menu", icon: <StorefrontIcon />, path: "/menu" },
  { title: "Food Category", icon: <CategoryIcon />, path: "/category" },
  { title: "Ingredients", icon: <KitchenIcon />, path: "/ingredients" },
  { title: "Details", icon: <SettingsIcon />, path: "/details" },
  { title: "Logout", icon: <LogoutIcon />, path: "/" },
];
export const AdminSideBar = ({ handleClose, open }) => {
  const isSmallScreen = useMediaQuery("(max-width:1080px)");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNavigate = (item) => {
    navigate(`/admin/restaurant${item.path}`);

    if (item.title === "Logout") {
      navigate("/");
      dispatch(logout());
      handleClose();
    }
  };
  return (
    <div>
      <>
        <Drawer
          variant={isSmallScreen ? "temporary" : "permanent"}
          onClose={handleClose}
          open={isSmallScreen ? open : true}
          anchor="left"
          sx={{ zIndex: 1 }}
        >
          <div className="w-[70vw] lg:w-[20vw] h-screen flex flex-col justify-center text-xl space-y-[1.65rem]">
            {menu.map((item, i) => (
              <>
                <div onClick={()=>handleNavigate(item)} className="px-5 flex items-center gap-5 cursor-pointer">
                  {item.icon}
                  <span>{item.title}</span>
                </div>

                {i !== menu.length - 1 && <Divider />}
              </>
            ))}
          </div>
        </Drawer>
      </>
    </div>
  );
};
