import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRestaurantsOrder, updateOrderStatus } from "../../component/State/Restaurant Order/Action";

const orderStatus = [
  { label: "Pending", value: "PENDING" },
  { label: "Completed", value: "COMPLETED" },
  { label: "Out For Delivery", value: "OUT_FOR_DELIVERY" },
  { label: "Delivered", value: "DELIVERED" },
];

export const OrderTable = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedOrderId, setSelectedOrderId] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event, orderId) => {
    setAnchorEl(event.currentTarget);
    setSelectedOrderId(orderId);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedOrderId(null);
  };

  const handleUpdateStatus = (statusValue) => {
    dispatch(updateOrderStatus({ orderId: selectedOrderId, orderStatus: statusValue, jwt }));
    handleClose();
  };

  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { restaurant, restaurantOrder } = useSelector(
    (store) => store,
  );

  useEffect(() => {
    if (restaurant.usersRestaurant?.id) {
      dispatch(
        fetchRestaurantsOrder({
          jwt,
          restaurantId: restaurant.usersRestaurant.id,
        }),
      );
    }
  }, [dispatch, jwt, restaurant.usersRestaurant?.id]);

  return (
    <Box>
      <Card className="mt-1">
        <CardHeader title={"All Orders"} sx={{ pt: 2, alignItems: "center" }} />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>id</TableCell>
                <TableCell align="right">Image</TableCell>
                <TableCell align="right">Customer</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Ingredients</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Update</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {restaurantOrder.orders.map((item) => (
                <TableRow
                  key={item.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {item.id}
                  </TableCell>
                  <TableCell align="right">
                    <AvatarGroup>
                      {item.items.map((orderItem, idx) => (
                        <Avatar key={idx} src={orderItem.food?.images[0]} />
                      ))}
                    </AvatarGroup>
                  </TableCell>
                  <TableCell align="right">
                    {item.customer?.fullName}
                  </TableCell>
                  <TableCell align="right">₹{item.totalPrice}</TableCell>
                  <TableCell align="right">
                    {item.items.map((orderItem, idx) => (
                      <p key={idx}>{orderItem.food?.name}</p>
                    ))}
                  </TableCell>
                  <TableCell align="right">
                    {item.items.map((orderItem, idx) => (
                      <div key={idx}>
                        {orderItem.ingredients.map((ingredient, i) => (
                          <Chip key={i} label={ingredient} />
                        ))}
                      </div>
                    ))}
                  </TableCell>
                  <TableCell align="right">{item.orderStatus}</TableCell>
                  <TableCell align="right">
                    <Button
                      id="basic-button"
                      aria-controls={open ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      onClick={(e) => handleClick(e, item.id)}
                    >
                      Update
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
      
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {orderStatus.map((status) => (
          <MenuItem 
            key={status.value} 
            onClick={() => handleUpdateStatus(status.value)}
          >
            {status.label}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};
