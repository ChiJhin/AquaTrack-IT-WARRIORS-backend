import express from "express";
import { addWaterData, deleteWaterData, getWaterDataPerPeriod, updateWaterData } from "../controllers/waterController.js";
import { checkUpdateWaterData, validateQueryByMonth } from "../middlewars/waterMiddlewrs.js";

const waterRouter = express.Router();

// waterRouter.use(protect)

waterRouter
  .post('/', addWaterData)
  .put('/:id', checkUpdateWaterData, updateWaterData)
  .delete('/:id', deleteWaterData)
  .get('/', validateQueryByMonth, getWaterDataPerPeriod)

export default waterRouter;