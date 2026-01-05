import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  recipes: JSON.parse(localStorage.getItem('favorites') || '[]'),
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      if (!state.recipes.find((r) => r.id === action.payload.id)) {
        state.recipes.push(action.payload);
        localStorage.setItem('favorites', JSON.stringify(state.recipes));
      }
    },
    removeFavorite: (state, action) => {
      state.recipes = state.recipes.filter((r) => r.id !== action.payload);
      localStorage.setItem('favorites', JSON.stringify(state.recipes));
    },
    toggleFavorite: (state, action) => {
      const index = state.recipes.findIndex((r) => r.id === action.payload.id);
      if (index >= 0) {
        state.recipes.splice(index, 1);
      } else {
        state.recipes.push(action.payload);
      }
      localStorage.setItem('favorites', JSON.stringify(state.recipes));
    },
  },
});

export const { addFavorite, removeFavorite, toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
