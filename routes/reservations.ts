import { Router } from 'express';
import { createReservation, deleteReservation, getReservation } from '../controllers/reservationCtrl';

const reservationRoutes = Router();

reservationRoutes.get('/', getReservation);
reservationRoutes.post('/:userId',createReservation)
reservationRoutes.delete('/',deleteReservation)

export default reservationRoutes;
