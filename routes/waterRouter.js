import express from "express";
import { addWaterData, deleteWaterData, getWaterDataPerPeriod, updateWaterData } from "../controllers/waterController.js";
import { checkUpdateWaterData, validateQuery } from "../middlewars/waterMiddlewrs.js";
import { authenticate } from "../middlewars/authenticate.js";

const waterRouter = express.Router();

waterRouter.use(authenticate)

waterRouter
  .post('/', addWaterData)
  .put('/:id', checkUpdateWaterData, updateWaterData)
  .delete('/:id', deleteWaterData)
  .get('/', validateQuery, getWaterDataPerPeriod)

export default waterRouter;