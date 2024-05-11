import express from "express";
import { addWaterData, deleteWaterData, getWaterDataPerDay, getWaterDataPerMonth, updateWaterData } from "../controllers/waterController.js";
import { checkUpdateWaterData, validateQueryByMonth } from "../middlewars/waterMiddlewrs.js";

const waterRouter = express.Router();

// waterRouter.use(protect)

waterRouter
  .post('/', addWaterData)
  .put('/:id', checkUpdateWaterData, updateWaterData)
  .delete('/:id', deleteWaterData)
  .get('/day', getWaterDataPerDay)
  .get('/month', validateQueryByMonth, getWaterDataPerMonth)


export default waterRouter;