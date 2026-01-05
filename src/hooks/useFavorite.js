import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { toggleFavorite } from '@/store/slices/favoritesSlice';

export function useFavorite(recipeId) {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorites.recipes);
  const isFavorite = favorites.some((r) => r.id === recipeId);

  const toggle = (recipe) => {
    dispatch(toggleFavorite(recipe));
  };

  return { isFavorite, toggle };
}
