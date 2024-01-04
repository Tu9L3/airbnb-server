import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const register = async (req: Request, res: Response) => {
  const { email, name, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
      },
    });
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};

export const getUserByEmail = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    return res.status(200).json(user);
    // res.json(email)
  } catch (error) {
    console.log(error);
  }
};
