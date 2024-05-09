import express from "express"
import { authenticate } from "../middlewars/authenticate.js";
import { validateBody } from "../middlewars/validateBody.js";
import { Schemas } from "../models/userModel.js";
import { errorHandlingWrapper } from "../helpers/errorHandlingWrapper.js";
export * from "../controllers/userController.js";
export const userRouter = express.Router();

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Registering a user
 *     description: Public route to register a user
*/
userRouter.post('/register', 
    validateBody(Schemas.registerLoginSchema), 
    errorHandlingWrapper(register));

/**
 * @swagger
 * /login:
 *   post:
 *     summary: User Login Route
 *     description: Public route for user login
*/
userRouter.post('/login', 
    validateBody(Schemas.registerLoginSchema), 
    errorHandlingWrapper(login));

/**
 * @swagger
 * /logout:
 *   post:
 *     summary: Log Out Current User
 *     description: Private route to logout current user
 */
userRouter.post('/logout', 
    authenticate, 
    errorHandlingWrapper(logout));

/**
 * @swagger
 * /current:
 *   get:
 *     summary: Current User Information
 *     description: Private route which returns current user information
*/
userRouter.get('/current', 
    authenticate, 
    errorHandlingWrapper(current));

/**
 * @swagger
 * /update:
 *   patch:
 *     summary: Update User Settings
 *     description: Private route to update user settings
*/
userRouter.patch('/update', 
    authenticate, 
    errorHandlingWrapper(updateUser));


export default userRouter;