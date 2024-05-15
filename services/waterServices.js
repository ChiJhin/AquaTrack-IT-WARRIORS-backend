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

export const addWaterDataService = async (data, owner) => {
  try {
    const addData = await Water.create( {...data, owner: owner.id});

    if (!addData) {
      throw HttpError(404, 'User or data not found')
    };

    return addData;
  } catch (error) {
    error.message
  };
};

export const updateWaterDataService = async (id, newData, dataOwner) => {
 try {
   const updatedData = await Water.findOneAndUpdate({
    _id: id,
    owner: dataOwner
  },
    newData,
    { new: true });
  console.log(newData)
  if (!updatedData || (updatedData.owner.toString() !== dataOwner.id)) {
    throw HttpError(404, 'User or data not found')
  };

  return updatedData;
 } catch (error) {
  throw error.message
 }
};

export const deleteWaterDateService = async (id, dataOwner ) => {
  try {
    const deletedData = await Water.findOneAndDelete({
      _id: id,
      owner: dataOwner
    });

    if (!deletedData || (deletedData.owner.toString()
      !== dataOwner.id)) {
      
      throw HttpError(404, 'User or data not found')
    }

    return deletedData;
  } catch (error) {
    
  }
};

export const waterDataPerPeriod = async (year, month, day, dataOwner) => {
try {
  let query = { date: { $regex: `${day}.${month}.${year}` } };
  
  if (month) {
    query.date.$regex = `${month}.${year}`;

    if (day) {
      query.date.$regex = `${day}.${month}.${year}`
    }
  };

  query.owner = dataOwner.id;

  const waterData = await Water.find(query).sort({date: -1});

  if (!waterData || waterData.length === 0) {
    throw HttpError(404, 'User or data not found')
  }

  let totalValue = 0;
  waterData.forEach(data => {
    totalValue += data.value
  })

  return {waterData, totalValue};
} catch (error) {
  throw error.message
}
};


