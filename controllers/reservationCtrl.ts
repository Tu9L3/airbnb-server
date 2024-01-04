import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getReservation = async (req: Request, res: Response) => {
  const { listingId, userId, authorId } = req.query;
  const query: any = {};
  if (listingId) {
    query.listingId = listingId;
  }
  if (userId) {
    query.userId = userId;
  }
  if (authorId) {
    query.listingId = { userId: authorId };
  }
  try {
    const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const safeReservations = reservations.map((reservation) => ({
      ...reservation,
      createdAt: reservation.createdAt.toISOString(),
      startDate: reservation.startDate.toISOString(),
      endDate: reservation.endDate.toISOString(),
      listing: {
        ...reservation.listing,
        createdAt: reservation.listing.createdAt.toISOString(),
      },
    }));

    return res.status(200).json(safeReservations);
  } catch (error) {
    console.log(error);
  }
};

export const createReservation = async (req: Request, res: Response) => {
  try {
    const { totalPrice, startDate, endDate, listingId } = req.body;
    const reservation = await prisma.reservation.create({
      data: {
        totalPrice,
        userId: req.params.userId,
        startDate,
        endDate,
        listingId,
      },
    });
    res.status(200).json(reservation);
  } catch (error) {
    console.log(error);
  }
};

export const deleteReservation = async (req: Request, res: Response) => {
  try {
    const { reservationId, userId } = req.body;
    const reservation = await prisma.reservation.deleteMany({
      where: {
        id: reservationId,
        OR: [{ userId: userId }, { listing: { userId: userId } }],
      },
    });
    return res.status(200).json(reservation);
  } catch (error) {
    console.log(error);
  }
};
