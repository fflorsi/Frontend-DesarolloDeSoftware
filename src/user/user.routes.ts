import { Router} from "express";
import {loginUser, newUser} from './user.controler.js';

export const userRouter = Router()

userRouter.post('/',newUser)
userRouter.post('/login',loginUser);

