import express from "express";
import {
  addWaterData,
  deleteWaterData,
  getWaterDataPerPeriod,
  updateWaterData,
} from "../controllers/waterController.js";
import {
  checkWaterData,
  validateQuery,
} from "../middleware/waterMiddleware.js";
import { authenticate } from "../middleware/authenticate.js";

const waterRouter = express.Router();

waterRouter.use(authenticate);
waterRouter
  .post("/", checkWaterData, addWaterData)
  .put("/:id", checkWaterData, updateWaterData)
  .delete("/:id", deleteWaterData)
  .get("/", validateQuery, getWaterDataPerPeriod);

export default waterRouter;

/**
 * @swagger
 * /:
 *   post:
 *     summary: Add Water Data
 *     description: More details are coming
 *     tags: ["Water API"]
 *   put:
 *     summary: Update Water Data
 *     description: More details are coming
 *     tags: ["Water API"]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: int
 *         description: Numeric User ID
 *   delete:
 *     summary: Delete Water Data
 *     description: More details are coming
 *     tags: ["Water API"]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: int
 *         description: Numeric User ID
 *   get:
 *     summary: Get Water Data per period
 *     description: More details are coming
 *     tags: ["Water API"]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: int
 *         description: Numeric User ID
 */
