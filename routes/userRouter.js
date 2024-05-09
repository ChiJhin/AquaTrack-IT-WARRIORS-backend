import express from "express"
import { authenticate } from "../middlewars/authenticate.js";
import { validateBody } from "../middlewars/validateBody.js";
import { Schemas } from "../models/userModel.js";
import { errorHandlingWrapper } from "../helpers/errorHandlingWrapper.js";
import * as controllers from "../controllers/userController.js";
export const userRouter = express.Router();

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Registering a user
 *     description: Public route to register a user
*/
userRouter.post('/register', 
    validateBody(Schemas.registerSchema), 
    errorHandlingWrapper(controllers.register));

/**
 * @swagger
 * /login:
 *   post:
 *     summary: User Login Route
 *     description: Public route for user login
*/
userRouter.post('/login', 
    validateBody(Schemas.loginSchema), 
    errorHandlingWrapper(controllers.login));

/**
 * @swagger
 * /logout:
 *   get:
 *     summary: Log Out Current User
 *     description: Private route to logout current user
 */
userRouter.get('/logout', 
    authenticate, 
    errorHandlingWrapper(controllers.logout));

/**
 * @swagger
 * /current:
 *   get:
 *     summary: Current User Information
 *     description: Private route which returns current user information
*/
userRouter.get('/current', 
    authenticate, 
    errorHandlingWrapper(controllers.current));

/**
 * @swagger
 * /update:
 *   patch:
 *     summary: Update User Settings
 *     description: Private route to update user settings
*/
userRouter.patch('/update', 
    authenticate, 
    errorHandlingWrapper(controllers.updateUser));


export default userRouter;