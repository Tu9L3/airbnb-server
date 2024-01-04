import { Router } from 'express';
import { createList, deleteListing, getListingById, getListings } from '../controllers/listingCtrl';

const listingRoutes = Router();
listingRoutes.post('/:userId', createList);
listingRoutes.get('/:listingId',getListingById)
listingRoutes.get('/', getListings);
listingRoutes.delete('/:listingId',deleteListing)

export default listingRoutes;
