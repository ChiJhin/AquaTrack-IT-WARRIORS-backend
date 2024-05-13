import express from "express";
import { authenticate } from "../middleware/authenticate.js";

import {
  addWaterData,
  deleteWaterData,
  getWaterDataPerPeriod,
  updateWaterData,
} from "../controllers/waterController.js";
import {
  checkUpdateWaterData,
  validateQueryByMonth,
} from "../middleware/waterMiddleware.js";

const waterRouter = express.Router();

// waterRouter.use(protect)

waterRouter
  .post("/", authenticate, addWaterData)
  .put("/:id", authenticate, checkUpdateWaterData, updateWaterData)
  .delete("/:id", authenticate, deleteWaterData)
  .get("/", authenticate, validateQueryByMonth, getWaterDataPerPeriod);

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
