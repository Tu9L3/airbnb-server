import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const addListingToFavorite = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const listingId = req.body.listingId;
    const favorite = await prisma.favorite.create({
      data: {
        userId: userId,
        listingId: listingId,
      },
    });

    return res.status(200).json(favorite);

    // return res.json(listingId);
  } catch (error) {
    console.log(error);
  }
};

export const deleteListingToFavorite = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const listingId = req.body.listingId;

    const listing = await prisma.favorite.findFirst({
      where: {
        listingId: listingId,
        userId: userId,
      },
    });

    const favorite = await prisma.favorite.delete({
      where: {
        id: listing?.id,
      },
    });

    return res.status(200).json(favorite);
  } catch (error) {
    console.log(error);
  }
};

export const getFavorite = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const favorites = await prisma.favorite.findMany({
      where: {
        userId: userId,
      },
    });

    return res.status(200).json(favorites);
  } catch (error) {
    console.log(error);
  }
};
