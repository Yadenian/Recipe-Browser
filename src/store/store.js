import { configureStore } from '@reduxjs/toolkit';
import { recipesApi } from './api/recipesApi';
import favoritesReducer from './slices/favoritesSlice';

export const store = configureStore({
  reducer: {
    [recipesApi.reducerPath]: recipesApi.reducer,
    favorites: favoritesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(recipesApi.middleware),
});
