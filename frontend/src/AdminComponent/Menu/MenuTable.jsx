import {
  Avatar,
  Box,
  Card,
  CardHeader,
  Chip,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import React, { useEffect } from "react";
import CreateIcon from "@mui/icons-material/Create";
import { Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMenuItemsByRestaurantId, deleteFoodAction, updateMenuItemsAvailability } from "../../component/State/Menu/Action";

export const MenuTable = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { restaurant, ingredients, menu } = useSelector(store => store);
  const navigate = useNavigate();

  useEffect(() => {
    if (restaurant.usersRestaurant?.id) {
      dispatch(
        getMenuItemsByRestaurantId({
          restaurantId: restaurant.usersRestaurant.id,
          jwt: localStorage.getItem("jwt"),
        })
      );
    }
  }, [dispatch, restaurant.usersRestaurant?.id]);

  const handleDeleteFood = (foodId) => {
    dispatch(deleteFoodAction({ foodId, jwt }));
  };

  return (
    <Box>
      <Card className="mt-1">
        <CardHeader
          action={
            <IconButton
              onClick={() => navigate("/admin/restaurant/add-menu")}
              aria-label="settings"
            >
              <CreateIcon />
            </IconButton>
          }
          title={"Menu"}
          sx={{ pt: 2, alignItems: "center" }}
        />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Image</TableCell>
                <TableCell align="right">Title</TableCell>
                <TableCell align="right">Ingredients</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Availability</TableCell>
                <TableCell align="right">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {menu.menuItems?.map((item) => (
                <TableRow
                  key={item.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Avatar src={item.images[0]} />
                  </TableCell>
                  <TableCell align="right">{item.name}</TableCell>
                  <TableCell align="right">
                    {item.ingredients?.map((ingredient, index) => (
                      <Chip key={index} label={ingredient.name} size="small" sx={{ mr: 1, mb: 1 }} />
                    ))}
                  </TableCell>
                  <TableCell align="right">₹{item.price}</TableCell>
                  <TableCell align="right">
                    <Button 
                      onClick={() => dispatch(updateMenuItemsAvailability({ foodId: item.id, jwt }))}
                      color={item.available ? "success" : "error"}
                      variant="text"
                    >
                      {item.available ? "in stock" : "out of stock"}
                    </Button>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton color="primary" onClick={() => handleDeleteFood(item.id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
};
