import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRouter';
import listingRoutes from './routes/listingRouter';
import favouriteRoutes from './routes/favorites';
import favoritesRoutes from './routes/favorites';
import reservationRoutes from './routes/reservations';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: 'GET,PUT,PATCH,POST,DELETE',
    credentials: true,
  }),
);

app.use('/api', authRoutes);
app.use('/api/listings', listingRoutes);
app.use('/api/favorites', favoritesRoutes);
app.use('/api/reservations',reservationRoutes)

app.listen(port, () => {
  console.log(`Server is running in port: ${port}`);
});
