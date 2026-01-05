# Recipe Browser SPA

A modern Single Page Application for browsing recipes built with React, Redux Toolkit (RTK Query), and Vite/Webpack.

## Features

-  Browse recipes from DummyJSON API
-  Search recipes by name
-  Add recipes to favorites
-  Responsive design with native CSS
-  Clean architecture with feature-based structure
-  Production builds with Webpack

## Tech Stack

- **React 18** - UI library
- **Redux Toolkit** - State management
- **RTK Query** - Data fetching and caching
- **React Router** - Navigation
- **Vite** - Development server and build tool
- **Webpack** - Alternative build tool
- **Native CSS** - Styling (no UI libraries)

## Project Structure

```
src/
├── store/           # Redux store configuration
│   ├── api/        # RTK Query API endpoints
│   └── slices/     # Redux slices
├── pages/          # Page components
│   ├── Home/
│   ├── RecipeDetail/
│   └── Favorites/
├── shared/          # Shared components
│   └── components/
├── hooks/           # Custom React hooks
└── App.jsx          # Main app component
```

## Getting Started

### Installation

```bash
npm install
```

### Running
```bash
npm run dev
```

### Build (Webpack)

```bash
npm run build
```

### Preview

```bash
npm run preview
```

## Pages

1. **Home** - Browse and search recipes
2. **Recipe Detail** - View detailed recipe information
3. **Favorites** - View saved favorite recipes

## Custom Hooks

- `useDebounce` - Debounce search input
- `useFavorite` - Manage favorite recipes
- `usePagination` - Handle pagination logic

## API

This application uses the [DummyJSON Recipes API](https://dummyjson.com/docs/recipes).

