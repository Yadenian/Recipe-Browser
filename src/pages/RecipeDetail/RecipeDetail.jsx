import { useParams, useNavigate } from 'react-router-dom';
import { useGetRecipeByIdQuery } from '@/store/api/recipesApi';
import { useFavorite } from '@/hooks/useFavorite';
import { Loading } from '@/shared/components/Loading/Loading';
import { Error } from '@/shared/components/Error/Error';
import './RecipeDetail.css';

export function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: recipe, isLoading, isError, error } = useGetRecipeByIdQuery(Number(id));
  const { isFavorite, toggle } = useFavorite(recipe?.id || 0);

  if (isLoading) return <Loading />;
  if (isError) {
    return <Error message={error?.data?.message || "Recipe not found"} />;
  }
  if (!recipe) {
    return <Error message="Recipe not found" />;
  }

  const handleFavoriteClick = () => {
    toggle(recipe);
  };

  return (
    <div className="recipe-detail-container">
      <button onClick={() => navigate(-1)} className="back-btn">
        ← Back
      </button>

      <div className="recipe-detail-header">
        <div className="recipe-detail-image">
          <img src={recipe.image} alt={recipe.name} />
        </div>
        <div className="recipe-detail-info">
          <h1>{recipe.name}</h1>
          <div className="recipe-detail-meta">
            <span className="cuisine-badge">{recipe.cuisine}</span>
            <span className="difficulty-badge">{recipe.difficulty}</span>
            <button
              className={`favorite-btn-large ${isFavorite ? 'active' : ''}`}
              onClick={handleFavoriteClick}
            >
              {isFavorite ? '❤️ Favorited' : '🤍 Add to Favorites'}
            </button>
          </div>
          <div className="recipe-stats">
            <div className="stat">
              <span className="stat-label">Prep Time</span>
              <span className="stat-value">{recipe.prepTimeMinutes} min</span>
            </div>
            <div className="stat">
              <span className="stat-label">Cook Time</span>
              <span className="stat-value">{recipe.cookTimeMinutes} min</span>
            </div>
            <div className="stat">
              <span className="stat-label">Total Time</span>
              <span className="stat-value">
                {recipe.prepTimeMinutes + recipe.cookTimeMinutes} min
              </span>
            </div>
            <div className="stat">
              <span className="stat-label">Servings</span>
              <span className="stat-value">{recipe.servings}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Calories</span>
              <span className="stat-value">{recipe.caloriesPerServing}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Rating</span>
              <span className="stat-value">⭐ {recipe.rating.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="recipe-detail-content">
        <div className="recipe-section">
          <h2>Ingredients</h2>
          <ul className="ingredients-list">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>

        <div className="recipe-section">
          <h2>Instructions</h2>
          <ol className="instructions-list">
            {recipe.instructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ol>
        </div>

        {recipe.tags.length > 0 && (
          <div className="recipe-section">
            <h2>Tags</h2>
            <div className="tags-container">
              {recipe.tags.map((tag) => (
                <span key={tag} className="tag-large">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {recipe.mealType && recipe.mealType.length > 0 && (
          <div className="recipe-section">
            <h2>Meal Type</h2>
            <div className="tags-container">
              {recipe.mealType.map((type) => (
                <span key={type} className="tag-large meal-type">
                  {type}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
