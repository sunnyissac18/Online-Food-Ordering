import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Button, Checkbox, FormControlLabel, FormGroup } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../State/Cart/Action';


const MenuCard = ({ item }) => {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const dispatch = useDispatch();
  const handleCheckBoxChange = (itemName) => {
    console.log("itemName", itemName);
    if (selectedIngredients.includes(itemName)) {
      setSelectedIngredients(selectedIngredients.filter((item) => item !== itemName));
    }
    else {
      setSelectedIngredients([...selectedIngredients, itemName]);
    }
  };
  const handleAddItemToCart = (e) => {
    e.preventDefault()
    const reqData = {
      token: localStorage.getItem("jwt"),
      cartItem: {
        foodId: item.id,
        quantity: 1,
        ingredients: selectedIngredients,
      },
    };
    console.log("req Data", reqData);
    dispatch(addItemToCart(reqData));

  };


  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <div className='lg:flex items-center justify-between '>
          <div className='lg:flex items-center lg:gap-5 '>
            <img className='w-[7rem] h-[7rem] object-cover '
              src={item.images[0]}
              alt="" />
            <div className='space-y-1 lg:space-y-5 lg:max-w-2xl '>
              <p className='font-semibold text-xl'>
                {item.name}
              </p>
              <p>₹{item.price}</p>
              <p className='text-gray-500'>{item.description}</p>
            </div>
          </div>

        </div>
      </AccordionSummary>
      <AccordionDetails>

        <form onSubmit={handleAddItemToCart}>
          <div className='flex gap-5 flex-wrap'>
            {item?.ingredients?.map((ingredientList, index) => (
              <div key={ingredientList.id || index}>
                <p className='font-semibold'>{ingredientList.category.name}</p>
                <FormGroup>
                  <FormControlLabel
                    key={ingredientList.id || index}
                    control={<Checkbox onChange={() => handleCheckBoxChange(ingredientList.name)} />}
                    label={ingredientList.name}
                  />
                </FormGroup>
              </div>
            ))}
          </div>

          <div className='pt-5'>
            <Button variant='contained' disabled={false} type='submit'>
              {true ? 'Add to Cart' : 'Out of Stock'}
            </Button>
          </div>
        </form>
      </AccordionDetails>
    </Accordion>
  )
}

export default MenuCard