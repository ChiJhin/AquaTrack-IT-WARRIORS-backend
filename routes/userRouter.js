import express from "express"
import { authenticate } from "../middlewars/authenticate.js";
import { validateBody } from "../middlewars/validateBody.js";
import { Schemas } from "../models/userModel.js";
import { errorHandlingWrapper } from "../helpers/errorHandlingWrapper.js";
import * as controllers from "../controllers/userController.js";

const userRouter = express.Router();
userRouter
    .post('/register', validateBody(Schemas.registerSchema), errorHandlingWrapper(controllers.register))
    .post('/login', validateBody(Schemas.loginSchema), errorHandlingWrapper(controllers.login))
    .get('/logout', authenticate,  errorHandlingWrapper(controllers.logout))
    .get('/current', authenticate, errorHandlingWrapper(controllers.current))
    .patch('/update', authenticate, errorHandlingWrapper(controllers.updateUser))
    .patch('/token', authenticate, errorHandlingWrapper(controllers.regenerateToken));

export default userRouter;

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Registering a user
 *     description: Public route to register a user
 *     tags: ["User API"]
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
 * /login:
 *   post:
 *     summary: User Login Route
 *     description: Public route for user login
 *     tags: ["User API"]
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
 *       '401':
 *         description: Not Authorized
 *
 * /logout:
 *   get:
 *     summary: Log Out Current User
 *     description: Private route to logout current user
 *     tags: ["User API"]
 *     security:
 *       - bearerAuth: []
 *     headers: 
 *       schema: 
 *         name: Authorization
 *         type: string
 *         example: Bearer abcde_12345
 *
 * /current:
 *   get:
 *     summary: Current User Information
 *     description: Private route which returns current user information
 *     tags: ["User API"]
 *     security:
 *       - bearerAuth: []
 *     headers: 
 *       schema: 
 *         name: Authorization
 *         type: string
 *         example: Bearer abcde_12345
 *
 * /update:
 *   patch:
 *     summary: Update User Settings
 *     description: Private route to update user settings
 *     tags: ["User API"]
 *     security:
 *       - bearerAuth: []
 *     headers: 
 *       schema: 
 *         name: Authorization
 *         type: string
 *         example: Bearer abcde_12345
 *     requestBody:
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
 *               gender:
 *                 type: string
 *                 enum: [female, male]
 *               weight:
 *                 type: number
 *               dailyActivityTime: 
 *                 type: number
 *               dailyWaterNorm:
 *                 type: dailyWaterNorm
 *               avatarURL:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               minItems: 1
 *               properties:
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                   format: email
 *                   example: Jessica.Smith@gmail.com
 *                 gender:
 *                   type: string
 *                   enum: [female, male]
 *                 weight:
 *                   type: number
 *                 dailyActivityTime: 
 *                   type: number
 *                 dailyWaterNorm:
 *                   type: dailyWaterNorm
 *                 avatarURL:
 *                   type: string
 *       '401':
 *         description: Not Authorized or User not Found
 *
 *
 * /token:
 *   patch:
 *     summary: Generate Authentication Token
 *     description: Private route to re-generate authentivation token for current user
 *     tags: ["User API"]
 *     security:
 *       - bearerAuth: []
 *     headers: 
 *       schema: 
 *         name: Authorization
 *         type: string
 *         example: Bearer abcde_12345
 *     responses:
 *       '200':
 *         description: Token was regenerated successfully 
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
 *       '401':
 *         description: Not authorized
 */
