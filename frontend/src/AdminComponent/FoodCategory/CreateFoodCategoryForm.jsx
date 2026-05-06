import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { createCategoryAction } from "../../component/State/Restaurant/Action";
import { useDispatch, useSelector } from "react-redux";

const CreateFoodCategoryForm = () => {
  const { restaurant } = useSelector((store) => store);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    categoryName: "",
    restaurantId: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: formData.categoryName,
      restaurantId: {
        id: 1,
      },
    };
    dispatch(
      createCategoryAction({ reqData: data, jwt: localStorage.getItem("jwt") }),
    );
    console.log(data);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="">
      <div className="p-5">
        <h1 className="text-gray-400 text-center text-xl pb-10">
          Create Food Category
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            id="categoryName"
            name="categoryName"
            label="Category Name"
            variant="outlined"
            onChange={handleInputChange}
            value={formData.categoryName}
          />

          <Button variant="contained" type="submit">
            Create
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateFoodCategoryForm;
