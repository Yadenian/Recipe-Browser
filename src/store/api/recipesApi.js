import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const recipesApi = createApi({
  reducerPath: 'recipesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://dummyjson.com/recipes',
  }),
  tagTypes: ['Recipe'],
  endpoints: (builder) => ({
    getRecipes: builder.query({
      query: ({ skip = 0, limit = 30 }) => `?skip=${skip}&limit=${limit}`,
      providesTags: ['Recipe'],
    }),
    getRecipeById: builder.query({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: 'Recipe', id }],
    }),
    searchRecipes: builder.query({
      query: (query) => `/search?q=${encodeURIComponent(query)}`,
      providesTags: ['Recipe'],
    }),
  }),
});

export const {
  useGetRecipesQuery,
  useGetRecipeByIdQuery,
  useSearchRecipesQuery,
} = recipesApi;
