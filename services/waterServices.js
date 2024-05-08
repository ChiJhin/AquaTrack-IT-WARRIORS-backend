import { Water } from "../models/waterModel.js"
import HttpError from '../helpers/HttpError.js'

export const addWaterDataService = async (data) => {
  try {
    const addData = await Water.create(data);

    if (!addData) {
      throw HttpError(404, 'Not found')
    };

    return addData;
  } catch (error) {
    error.message
  };
};