import { useState, useEffect } from 'react';
import { useGetRecipesQuery, useSearchRecipesQuery } from '@/store/api/recipesApi';
import { RecipeCard } from '@/shared/components/RecipeCard/RecipeCard';
import { Loading } from '@/shared/components/Loading/Loading';
import { Error } from '@/shared/components/Error/Error';
import { useDebounce } from '@/hooks/useDebounce';
import './Home.css';

export function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const debouncedSearch = useDebounce(searchQuery, 500);
  const itemsPerPage = 30;
  const skip = (currentPage - 1) * itemsPerPage;

  const {
    data: recipesData,
    isLoading: isLoadingRecipes,
    isError: isErrorRecipes,
  } = useGetRecipesQuery({ skip, limit: itemsPerPage }, { skip: !!debouncedSearch });

  const {
    data: searchData,
    isLoading: isLoadingSearch,
    isError: isErrorSearch,
  } = useSearchRecipesQuery(debouncedSearch, { skip: !debouncedSearch });

  const isLoading = isLoadingRecipes || isLoadingSearch;
  const isError = isErrorRecipes || isErrorSearch;
  const data = debouncedSearch ? searchData : recipesData;
  const recipes = data?.recipes || [];
  const totalRecipes = data?.total || 0;
  const totalPages = Math.ceil(totalRecipes / itemsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  // Reset to page 1 when search changes or is cleared
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch]);

  return (
    <div className="home-container">
      <div className="home-header">
        <h1>Recipe Browser</h1>
        <p>Discover delicious recipes from around the world</p>
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search recipes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

      {isLoading && <Loading />}
      {isError && <Error />}

      {!isLoading && !isError && (
        <>
          <div className="recipes-grid">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>

          {!debouncedSearch && totalPages > 1 && (
            <div className="pagination">
              <button onClick={prevPage} disabled={currentPage === 1} className="pagination-btn">
                Previous
              </button>
              <span className="pagination-info">
                Page {currentPage} of {totalPages}
              </span>
              <button onClick={nextPage} disabled={currentPage === totalPages} className="pagination-btn">
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
