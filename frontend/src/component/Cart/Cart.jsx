import React, { useState, useEffect } from "react";
import { CartItem } from "./CartItem";
import {
  Divider,
  Button,
  Card,
  Modal,
  Box,
  Grid,
  TextField,
} from "@mui/material";
import { AddressCard } from "./AddressCard";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../State/Order/Action";

export const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  outline: "none",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const initialValues = {
  streetAddress: "",
  state: "",
  city: "",
  pincode: "",
};

const addressValidationSchema = Yup.object().shape({
  streetAddress: Yup.string().required("Street Address is required"),
  state: Yup.string().required("State is required"),
  city: Yup.string().required("City is required"),
  pincode: Yup.string().required("Pincode is required"),
});

const Cart = () => {
  const [openAddressModal, setOpenAddressModal] = useState(false);
  const [savedLocationSummary, setSavedLocationSummary] = useState("");

  const { cart, auth } = useSelector((store) => store);
  const dispatch = useDispatch();

  const createOrderUsingSelectedAddress = (item) => {
    const data = {
      jwt: localStorage.getItem("jwt"),
      order: {
        restaurantId: cart.cartItems[0]?.food?.restaurant?.id,
        deliveryAddress: {
          fullName: auth.user?.fullName || "",
          streetAddress: item.streetAddress || "",
          city: item.city || "",
          state: item.state || "",
          postalCode: item.postalCode || item.pincode || "",
          country: "India",
        },
      },
    };
    dispatch(createOrder(data));
  };
  const handleAddressSubmit = (values) => {
    const locString = `${values.streetAddress}, ${values.city}, ${values.state} - ${values.pincode}`;
    const existing = JSON.parse(localStorage.getItem("localAddresses") || "[]");

    // Avoid duplicates
    if (!existing.includes(locString)) {
      existing.push(locString);
      localStorage.setItem("localAddresses", JSON.stringify(existing));
    }
    setSavedLocationSummary(locString);
    setOpenAddressModal(false);
  };
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const [localAddresses, setLocalAddresses] = useState([]);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("localAddresses") || "[]");
      setLocalAddresses(
        saved.map((loc) => ({ streetAddress: loc, isLocal: true })),
      );
    } catch {
      setLocalAddresses([]);
    }
  }, []);

  const rawAddresses = auth.user?.addresses || [];
  const validBackendAddresses = rawAddresses.filter(
    (addr) => addr.streetAddress || addr.city || addr.state || addr.pincode,
  );
  const combinedAddresses = [...validBackendAddresses, ...localAddresses];

  const handleSubmit = (values) => {
    const data = {
      jwt: localStorage.getItem("jwt"),
      order: {
        restaurantId: cart.cartItems[0].food?.restaurant.id,
        deliveryAddress: {
          fullName: auth.user?.fullName,
          streetAddress: values.streetAddress,
          city: values.city,
          state: values.city,
          postalCode: values.pincode,
          country: "India",
        },
      },
    };
    dispatch(createOrder(data));
    console.log("Form Values", values);
    handleClose();
  };

  return (
    <>
      <main className="lg:flex justify-between">
        <section className="lg:w-[30%] space-y-6 lg:min-h-screen pt-10 ">
          {cart.cartItems.map((item, index) => (
            <CartItem key={index} item={item} />
          ))}
          <Divider />
          <div className="billDetails px-5 text-sm ">
            <p className="font-extralight py-5 ">Bill Details</p>
            <div className="space-y-3 ">
              <div className="flex justify-between text-gray-400 ">
                <p>Item Total</p>
                <p>₹{cart.cart?.total || 0}</p>
              </div>
              <div className="flex justify-between text-gray-400 ">
                <p>Deliver Fee</p>
                <p>₹21</p>
              </div>
              <div className="flex justify-between text-gray-400 ">
                <p>GST and Restaurant Charges</p>
                <p>₹33</p>
              </div>
              <Divider />
            </div>
            <div className="flex justify-between text-gray-400 py-3">
              <p>Total Pay</p>
              <p>₹{(cart.cart?.total || 0) + 21 + 33}</p>
            </div>
          </div>
        </section>
        <Divider orientation="vertical" flexItem />
        <section className="lg:w-[70%] flex justify-center px-5 pb-10 lg:pb-0">
          <div className="w-full">
            <h1 className="text-center font-semibold text-2xl py-10">
              Choose Delivery Address
            </h1>
            <div className="flex gap-5 flex-wrap justify-center w-full max-w-4xl mx-auto">
              {combinedAddresses.map((item, index) => (
                <AddressCard
                  handleSelectAddress={createOrderUsingSelectedAddress}
                  item={item}
                  showButton={true}
                  key={index}
                />
              ))}

              <Card className="flex flex-col items-center justify-center gap-4 w-full sm:w-64 p-5 py-8 border-2 border-dashed border-gray-600 cursor-pointer hover:border-gray-400 transition-colors shadow-sm rounded-xl">
                <AddLocationAltIcon sx={{ fontSize: "3rem", color: "#888" }} />
                <h1 className="font-semibold text-lg text-gray-300">
                  Add New Address
                </h1>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#FF5200",
                    "&:hover": { backgroundColor: "#cc4200" },
                    mt: 2,
                  }}
                  onClick={() => setOpenAddressModal(true)}
                >
                  Add
                </Button>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Modal
        open={openAddressModal}
        onClose={() => setOpenAddressModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2 className="text-xl font-bold mb-4">Set Delivery Location</h2>
          <Formik
            initialValues={{
              streetAddress: "",
              state: "",
              city: "",
              pincode: "",
            }}
            validationSchema={addressValidationSchema}
            onSubmit={handleAddressSubmit}
          >
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="streetAddress"
                    label="Street Address"
                    fullWidth
                    variant="outlined"
                  />
                  <ErrorMessage
                    name="streetAddress"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="state"
                    label="State"
                    fullWidth
                    variant="outlined"
                  />
                  <ErrorMessage
                    name="state"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="city"
                    label="City"
                    fullWidth
                    variant="outlined"
                  />
                  <ErrorMessage
                    name="city"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="pincode"
                    label="Pincode"
                    fullWidth
                    variant="outlined"
                  />
                  <ErrorMessage
                    name="pincode"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      backgroundColor: "#FF5200",
                      "&:hover": { backgroundColor: "#cc4200" },
                      mt: 2,
                    }}
                    fullWidth
                  >
                    Save & Apply
                  </Button>
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </Box>
      </Modal>
    </>
  );
};

export default Cart;
