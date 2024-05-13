import express from "express";
import {
  authenticate,
  authenticateRefresh,
} from "../middleware/authenticate.js";
import { validateBody } from "../middleware/validateBody.js";
import { Schemas } from "../models/userModel.js";
import { errorHandling } from "../helpers/errorHandlingWrapper.js";
import * as controllers from "../controllers/userController.js";

const userRouter = express.Router();
userRouter
  .post(
    "/register",
    validateBody(Schemas.registerSchema),
    errorHandling(controllers.register)
  )
  .post(
    "/login",
    validateBody(Schemas.loginSchema),
    errorHandling(controllers.login)
  )
  .get("/logout", authenticate, errorHandling(controllers.logout))
  .get("/current", authenticate, errorHandling(controllers.current))
  .patch("/update", authenticate, errorHandling(controllers.updateUser))
  .patch(
    "/refresh",
    authenticateRefresh,
    validateBody(Schemas.refreshSchema),
    errorHandling(controllers.refreshTokens)
  );

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
 *                   description: Email of the current user
 *                 authToken:
 *                   type: string
 *                   description: Issued Authentication token
 *                 refreshToken:
 *                   type: string
 *                   description: Refresh token, can be used to re-issue the Authentication token if expired
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
 *                 authToken:
 *                   type: string
 *                   description: Issued Authentication token
 *                 refreshToken:
 *                   type: string
 *                   description: Refresh token, can be used to re-issue the Authentication token if expired
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
 * /refresh:
 *   patch:
 *     summary: Regenerate Authentication Tokens
 *     description: Private route to re-generate authentication and refresh tokens
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
 *                 authToken:
 *                   type: string
 *                   description: Issued Authentication token
 *                 refreshToken:
 *                   type: string
 *                   description: Refresh token, can be used to re-issue the Authentication token if expired
 *       '401':
 *         description: Not authorized
 */
