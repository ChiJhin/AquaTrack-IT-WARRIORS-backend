import express from "express";
import { addWaterData } from "../controllers/waterController.js";

export const waterRouter = express.Router();

waterRouter.post('/', addWaterData)

export default waterRouter;