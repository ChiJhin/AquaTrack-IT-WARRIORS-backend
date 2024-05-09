import { Water } from "../models/waterModel.js"
import HttpError from '../helpers/HttpError.js'

export const localDate = () => {
  const milliseconds = Date.now();
  const date = new Date(milliseconds);
  
  return date.toLocaleDateString();
};

export const localTime = () => {
  const milliseconds = Date.now();
  const time = new Date(milliseconds);
  
  const timeString = time.toLocaleTimeString();
  const parts = timeString.split(':');
  parts.pop();

  return parts.join(":");
};

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

export const updateWaterDataService = async (id, newData) => {
  const updatedData = Water.findOneAndUpdate({
    _id: id
  },
    newData,
    { new: true });
  
  if (!updatedData) {
    throw HttpError(404, 'Not found')
  };

  return updatedData;
};

export const deleteWaterDateService = async (id) => {
  try {
    const deletedData = await Water.findOneAndDelete({ _id: id });

    if (!deletedData) {
      throw HttpError(404, "Not found")
    }

    return deletedData;
  } catch (error) {
    
  }
};

export const daylyWaterData = async () => {
  try {
    const daylyWater = Water.find();

    if (!daylyWater) throw HttpError(404, 'Not found');

    return daylyWater;
  } catch (error) {
    throw error.message
  }
}