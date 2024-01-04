import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const addListingToFavorite = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const favorite = await prisma.favorite.findFirst({
      where: {
        userId: userId,
      },
    });

    if (!favorite) {
      const createFavor = await prisma.favorite.create({
        data: {
          userId,
        },
      });
    }

    const addListing = await prisma.listing.update({
      where: {
        id: req.body.id,
      },
      data: {
        favoriteId: req.body.favoriteId,
      },
    });

    return res.status(200).json('Success');
  } catch (error) {
    console.log(error);
  }
};
