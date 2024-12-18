import { ProductProps } from "@/types/products";
import { createSlice } from "@reduxjs/toolkit";


export interface FavoritesProps {
  favorites: Array<ProductProps>;
}

const initialState: FavoritesProps = {
  favorites: [],
};

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    setfavorites: (state, action) => {
      state.favorites = [...state.favorites, action.payload];
    },
    removeFavoriteProduct: (state, action) => {
      state.favorites = state.favorites.filter((product) => product.id != action.payload);
    },
  
    
  },
});

export const { setfavorites, removeFavoriteProduct } = favoritesSlice.actions;
export const favoritesReducer = favoritesSlice.reducer;