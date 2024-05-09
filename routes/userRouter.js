import express from "express"
import { authenticate } from "../middlewars/authenticate.js";
import { validateBody } from "../middlewars/validateBody.js";
import { Schemas } from "../models/userModel.js";
import { errorHandlingWrapper } from "../helpers/errorHandlingWrapper.js";
import * as controllers from "../controllers/userController.js";

const userRouter = express.Router();

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Registering a user
 *     description: Public route to register a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *                 example: Jessica.Smith@gmail.com
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       '201':
 *         description: Created 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                   format: email
 *                   example: Jessica.Smith@gmail.com
 *       '409':
 *         description: The email provided is already in use. 
 *       '500':
 *         description: Unexpected Server Error. 
 *  
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: Jessica.Smith@gmail.com
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Logged In Successfully 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: ABCD_EFGH_123456
 *                 user:
 *                   type: object
 *                   properties:
 *                     email: 
 *                       type: string
 *                       format: email
 *                       example: Jessica.Smith@gmail.com           
 *       '500':
 *         description: Unexpected Server Error. 

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
 *     security:
 *       - bearerAuth: []
 *     headers: 
 *       schema: 
 *         name: Authorization
 *         type: string
           example: Bearer abcde_12345
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