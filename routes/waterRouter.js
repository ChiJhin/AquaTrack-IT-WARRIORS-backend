import express from "express";
import { addWaterData, deleteWaterData, getWaterDataPerDay, updateWaterData } from "../controllers/waterController.js";
import { checkUpdateWaterData } from "../middlewars/waterMiddlewrs.js";

export const waterRouter = express.Router();

// waterRouter.use(protect)

waterRouter
  .post('/', addWaterData)
  .put('/:id', checkUpdateWaterData, updateWaterData)
  .delete('/:id', deleteWaterData)
  .get('/', getWaterDataPerDay);


export default waterRouter;