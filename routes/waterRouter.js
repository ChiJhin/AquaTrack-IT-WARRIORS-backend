import express from "express";
import {
  addWaterData,
  deleteWaterData,
  getWaterDataPerPeriod,
  getWaterPerDay,
  getWaterPerMonth,
  updateWaterData,
} from "../controllers/waterController.js";
import {
  checkWaterData,
  validateDay,
  validateMonth,
  validateQuery,
} from "../middleware/waterMiddleware.js";
import { authenticate } from "../middleware/authenticate.js";

const waterRouter = express.Router();

waterRouter.use(authenticate);
waterRouter
  .post("/", checkWaterData, addWaterData)
  .put("/:id", checkWaterData, updateWaterData)
  .delete("/:id", deleteWaterData)
  .get("/", validateQuery, getWaterDataPerPeriod)
  .get("/day", validateDay, getWaterPerDay)
  .get("/month", validateMonth, getWaterPerMonth);

export default waterRouter;

/**
 * @swagger
 * /:
 *   post:
 *     summary: Add Water Data
 *     description: Private route for add water data
 *     tags: ["Water API"]
 *     security:
 *       - bearerAuth: []
 *     headers:
 *       schema:
 *         name: Authorization
 *         type: string
 *         example: Bearer abcde_12345
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *            schema:
 *             type: object
 *             properties:
 *               value: 
 *                 required: true
 *                 type: number
 *                 format: value 
 *                 example: 1500
 *               date: 
 *                 required: false
 *                 type: string
 *                 format: date
 *                 example: "01.05.2024"
 *               time: 
 *                 required: false
 *                 type: string
 *                 format: time
 *                 example: "12:05"
 *     responses:
 *       '201':
 *         content:
 *            application/json:
 *               schema:
 *                  type: object
 *                  properties:
 *                    waterData:
 *                       $ref: '#/components/schemas/Water'
 *       '401': 
 *          description: User not authorized
 *       '404':
 *          description: User water data cannot be found.
 *       '500':
 *         description: Unexpected Server Error.
 * 
 * /id:
 *   put:
 *     summary: Update Water Data
 *     description: Private route for update water data
 *     tags: ["Water API"]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: int
 *         description: Numeric waterData object ID
 *     security:
 *       - bearerAuth: []
 *     headers:
 *       schema:
 *         name: Authorization
 *         type: string
 *         example: Bearer abcde_12345
 *     requestBody:
 *         content:
 *           application/json:
 *            schema:
 *             type: object
 *             properties:
 *               value: 
 *                 required: false
 *                 type: number
 *                 format: value 
 *                 example: 250
 
 *     responses:
 *       '200':
 *         content:
 *            application/json:
 *               schema:
 *                  type: object
 *                  properties:
 *                    updatedWaterData:
 *                       $ref: '#/components/schemas/WaterDataUpdate'
 *       '401': 
 *          description: User not authorized
 *       '404':
 *          description: User water data cannot be found.
 *       '500':
 *         description: Unexpected Server Error.
 *     
 *   delete:
 *     summary: Delete Water Data
 *     description: Private route for delete water data
 *     tags: ["Water API"]
 *     security:
 *       - bearerAuth: []
 *     headers:
 *       schema:
 *         name: Authorization
 *         type: string
 *         example: Bearer abcde_12345
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: int
 *         description: Numeric User ID
 *     responses:
 *       '200':
 *         content:
 *            application/json:
 *               schema:
 *                  type: object
 *                  properties:
 *                    deletedWaterData:       
 *                       $ref: '#/components/schemas/WaterDataDelete'
 *       '401': 
 *          description: User not authorized
 *       '404':
 *          description: User water data cannot be found.
 *       '500':
 *         description: Unexpected Server Error.
 * 
 * /day:
 *   get:
 *     summary: Get Water Data per day
 *     description: Private route for water data per day
 *     tags: ["Water API"]
 *     security:
 *       - bearerAuth: []
 *     headers:
 *       schema:
 *         name: Authorization
 *         type: string
 *         example: Bearer abcde_12345
 *     parameters:
 *       - name: year
 *         in: path
 *         required: true
 *         type: int
 *         description: Four symbols numeric year
 *       - name: month
 *         in: path
 *         required: true
 *         type: int
 *         description: Two symbols numeric month
 *       - name: day
 *         in: path
 *         required: true
 *         type: int
 *         description: Two symbols numeric day
 *     responses:
 *       '200':
 *         content:
 *            application/json:
 *               schema:
 *                  type: array
 *                  items: 
 *                     $ref: '#/components/schemas/WaterDataPerDay'
 *                  
 * 
 * /month:
 *   get:
 *     summary: Get Water Data per month
 *     description: Private route for water value per month
 *     tags: ["Water API"]
 *     security:
 *       - bearerAuth: []
 *     headers:
 *       schema:
 *         name: Authorization
 *         type: string
 *         example: Bearer abcde_12345
 *     parameters:
 *       - name: year
 *         in: path
 *         required: true
 *         type: int
 *         description: Four symbols numeric year
 *       - name: month
 *         in: path
 *         required: true
 *         type: int
 *         description: Two symbols numeric month
 *  
 *     responses:
 *       '200':
 *         content:
 *            application/json:
 *               schema:
 *                  type: array
 *                  items: 
 *                     $ref: '#/components/schemas/WaterDataPerMonth'
 *                     
 * 
 * 
 * components:
 *   schemas:
 *  
 *     WaterDataPerMonth:
 *       type: number
 *    
 * 
 *     WaterDataPerDay:
 *       type: object
 *       minItems: 2
 *       properties:  
 *         value:
 *           type: number
 *           example: 250
 *         date:
 *           type: string
 *           example: "01.05.2024"
 *         time:
 *           type: string
 *           example: "12:05"
 *         owner:
 *           type: string
 *           description: ID of water data user
 *         message: 
 *           type: string
 * 
 *     
 *  
 * 
 *     WaterDataDelete:
 *       type: object
 *       minItems: 1
 *       properties:  
 *         value:
 *           type: number
 *           example: 250
 *         date:
 *           type: string
 *           example: "01.05.2024"
 *         time:
 *           type: string
 *           example: "12:05"
 *         owner:
 *           type: string
 *           description: ID of water data user
 *         message: 
 *           type: string
 *           example: 'Water info was delete'
 * 
 *     WaterDataUpdate:
 *       type: object
 *       minItems: 1
 *       properties:  
 *         value:
 *           type: number
 *           example: 250
 *         date:
 *           type: string
 *           example: "01.05.2024"
 *         time:
 *           type: string
 *           example: "12:05"
 *         owner:
 *           type: string
 *           description: ID of water data user
 * 
 *     Water:
 *       type: object
 *       minItems: 1
 *       properties:  
 *         value:
 *           type: number
 *           example: 1500
 *         date:
 *           type: string
 *           example: "01.05.2024"
 *         time:
 *           type: string
 *           example: "12:05"
 *         owner:
 *           type: string
 *           description: ID of water data user
 */
