import express from "express";
import { addWaterData, updateWaterData } from "../controllers/waterController.js";

const waterRouter = express.Router();

waterRouter
  .post('/', addWaterData)
  .put('/:id', updateWaterData);


export default waterRouter;