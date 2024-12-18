import { ProductProps } from "@/types/products";
import { createSlice } from "@reduxjs/toolkit";

interface EnhancedProps extends ProductProps{
  basketId:any;
  quantity:number;
}
export interface BasketProps {
  basket: Array<EnhancedProps>;
}

const initialState: BasketProps = {
  basket: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    setBasket: (state, action) => {
      state.basket = [...state.basket, action.payload];
    },
    removeProduct: (state, action) => {
      state.basket = state.basket.filter((product) => product.basketId !== action.payload);
    },
    addMore: (state, action) => {
      // Find the product to update and create a new basket with increased quantity
      const updatedBasket = state.basket.map((product) => {
        if (product.basketId === action.payload) {
          // Create a new product object with updated quantity
          return { ...product, quantity: product.quantity + 1 };
        } else {
          // Return the original product for non-matching IDs
          return product;
        }
      });

      // Update state with the new basket
      state.basket = updatedBasket;
    },
    substarctQuantity: (state, action) => {
      // Find the product to update and create a new basket with increased quantity
      const updatedBasket = state.basket.map((product) => {
        if (product.basketId === action.payload) {
          // Create a new product object with updated quantity
          return { ...product, quantity: product.quantity - 1 };
        } else {
          // Return the original product for non-matching IDs
          return product;
        }
      });

      // Update state with the new basket
      state.basket = updatedBasket;
    },
  },
});

export const { setBasket, removeProduct, addMore,substarctQuantity } = basketSlice.actions;
export const basketReducer = basketSlice.reducer;