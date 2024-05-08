import HttpError from "../helpers/HttpError.js";
import { addWaterDataService } from "../services/waterServices.js"


export const addWaterData = async (req, res) => {
  try {
    const { value } = req.body;
    console.log(value)
    const newWaterData = await addWaterDataService(req.body);

    if (newWaterData) {
      res.status(201).json(newWaterData)
    } else {
      res.status(404).json({
        message: 'Not found'
      })
    }
  } catch (error) {
    throw HttpError(400, error.message)
  }
}