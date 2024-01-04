import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createList = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;

    const {
      title,
      description,
      imageSrc,
      category,
      roomCount,
      bathroomCount,
      guestCount,
      location,
      price,
    } = req.body;

    const listing = await prisma.listing.create({
      data: {
        title,
        description,
        imageSrc,
        category,
        roomCount,
        bathroomCount,
        guestCount,
        locationValue: location.value,
        price: parseInt(price, 10),
        userId,
      },
    });
    return res.status(200).json(listing);
  } catch (error) {
    console.log(error);
  }
};

export const getListings = async (req: Request, res: Response) => {
  const {
    userId,
    roomCount,
    guestCount,
    bathroomCount,
    locationValue,
    startDate,
    endDate,
    category,
  } = req.body;

  try {
    const query: any = {};

    if (userId) query.userId = userId;
    if (category) query.category = category;
    
    if (typeof roomCount === 'number') query.roomCount = { gte: roomCount };
    if (typeof guestCount === 'number') query.guestCount = { gte: guestCount };
    if (typeof bathroomCount === 'number') query.bathroomCount = { gte: bathroomCount };
    
    if (locationValue) query.locationValue = locationValue;


    if (startDate && endDate) {
      query.NOT = {
        reservations: {
          some: {
            OR: [
              { endDate: { gte: startDate }, startDate: { lte: startDate } },
              { startDate: { lte: endDate }, endDate: { gte: endDate } },
            ],
          },
        },
      };
    }

    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: { createdAt: 'desc' },
    });

    const safeListings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));

    return res.status(200).json(safeListings);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getListingById = async (req: Request, res: Response) => {
  try {
    const listingId = req.params.listingId;
    const listing = await prisma.listing.findFirst({
      where: {
        id: listingId,
      },
      include: {
        user: true,
      },
    });

    if (!listing) {
      return null;
    }

    return res.status(200).json(listing);
  } catch (error) {
    console.log(error);
  }
};

export const deleteListing = async (req: Request, res: Response) => {
  try {
    const { listingId } = req.params;
    await prisma.listing.delete({
      where: {
        id: listingId,
      },
    });
    return res.status(200).json('Success');
  } catch (error) {
    console.log(error);
  }
};
