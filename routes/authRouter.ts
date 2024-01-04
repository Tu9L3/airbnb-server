import { Router } from "express";
import { getUserByEmail, register } from "../controllers/authCtrl";

const authRoutes = Router();

authRoutes.post('/register',register)
authRoutes.get('/user',getUserByEmail)

export default authRoutes