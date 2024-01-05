import Router from 'express';
import {
  addListingToFavorite,
  deleteListingToFavorite,
  getFavorite,
} from '../controllers/favoriteCtrl';

const favoritesRoutes = Router();

favoritesRoutes.post('/:userId', addListingToFavorite);
favoritesRoutes.delete('/:userId', deleteListingToFavorite);
favoritesRoutes.get('/:userId', getFavorite);

export default favoritesRoutes;
