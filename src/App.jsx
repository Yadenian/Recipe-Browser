import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { Navigation } from './shared/components/Navigation/Navigation';
import { Home } from './pages/Home/Home';
import { RecipeDetail } from './pages/RecipeDetail/RecipeDetail';
import { Favorites } from './pages/Favorites/Favorites';
import './App.css';

function App() {
  const isGitHubPages = window.location.hostname === 'yadenian.github.io';
  const basename = isGitHubPages ? '/Recipe-Browser' : '';
  
  return (
    <Provider store={store}>
      <Router basename={basename}>
        <div className="app">
          <Navigation />
          <main className="app-main">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/recipe/:id" element={<RecipeDetail />} />
              <Route path="/favorites" element={<Favorites />} />
            </Routes>
          </main>
        </div>
      </Router>
    </Provider>
  );
}

export default App;

