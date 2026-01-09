import { Link } from 'react-router-dom';
import { useFavorite } from '@/hooks/useFavorite';
import './RecipeCard.css';

export function RecipeCard({ recipe }) {
  const { isFavorite, toggle } = useFavorite(recipe.id);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    toggle(recipe);
  };

  return (
    <Link to={`/recipe/${recipe.id}`} className="recipe-card">
      <div className="recipe-card-image">
        <img src={recipe.image} alt={recipe.name} />
        <button
          className={`favorite-btn ${isFavorite ? 'active' : ''}`}
          onClick={handleFavoriteClick}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>
      </div>
      <div className="recipe-card-content">
        <h3 className="recipe-card-title">{recipe.name}</h3>
        <div className="recipe-card-meta">
          <span className="recipe-card-cuisine">{recipe.cuisine}</span>
          <span className="recipe-card-difficulty">{recipe.difficulty}</span>
        </div>
        <div className="recipe-card-info">
          <span>⏱️ {recipe.prepTimeMinutes + recipe.cookTimeMinutes} min</span>
          <span>👥 {recipe.servings} servings</span>
          <span>⭐ {recipe.rating.toFixed(1)}</span>
        </div>
        <div className="recipe-card-tags">
          {recipe.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

