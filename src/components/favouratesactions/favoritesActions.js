// favoritesActions.js
import { ADD_TO_FAVORITES, REMOVE_FROM_FAVORITES } from './actionTypes';

export const addToFavorites = (movie) => ({
  type: ADD_TO_FAVORITES,
  payload: movie,
});

export const removeFromFavorites = (movieId) => ({
  type: REMOVE_FROM_FAVORITES,
  payload: movieId,
});
