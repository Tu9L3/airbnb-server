import Router from 'express';
import { PrismaClient } from '@prisma/client';
import { addListingToFavorite } from '../controllers/favoriteCtrl';

const prisma = new PrismaClient();

const favoritesRoutes = Router();

favoritesRoutes.post('/:userId',addListingToFavorite)

export default favoritesRoutes;
