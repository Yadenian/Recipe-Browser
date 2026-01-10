import { useAppSelector } from '@/store/hooks';
import { RecipeCard } from '@/shared/components/RecipeCard/RecipeCard';
import './Favorites.css';

export function Favorites() {
  const favorites = useAppSelector((state) => state.favorites.recipes);

  return (
    <div className="favorites-container">
      <div className="favorites-header">
        <h1>My Favorite Recipes</h1>
        <p>{favorites.length} {favorites.length === 1 ? 'recipe' : 'recipes'} saved</p>
      </div>

      {favorites.length === 0 ? (
        <div className="empty-favorites">
          <div className="empty-icon">📖</div>
          <h2>No favorites yet</h2>
          <p>Start exploring recipes and add them to your favorites!</p>
        </div>
      ) : (
        <div className="recipes-grid">
          {favorites.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
}

