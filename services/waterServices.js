import { Water } from "../models/waterModel.js"
import HttpError from '../helpers/HttpError.js'

export const localDate = (date) => {
  const formattedDate = new Date(date).toLocaleDateString();
  return formattedDate;
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

     let totalValue = 0;
    addData.forEach(data => {
      totalValue += data.value
    });

    return {addData, totalValue};
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
  let query = { owner: dataOwner.id};
  
  if (day) {
    query.date = {$regex: `${day}.${month}.${year}`};
  } else if (month) {
    query.date = {$regex: `${month}.${year}`}
  };

  const waterData = await Water.find(query).sort({date: -1});

  if (!waterData || waterData.length === 0) {
    throw HttpError(404, 'User or data not found')
  }

  if (day) {
     let totalValue = 0;
    waterData.forEach(data => {
      totalValue += data.value
    });
    
    return {waterData, totalValue}
  }else {
      const values = waterData.map(data => data.value);
      return values;
    }
} catch (error) {
  throw error.message
}
};

export const getWaterDataByDay = async (date) => {
  const currentDate = localDate(date);
  
  const waterDataByDay = await Water.find({ date: currentDate });

  return waterDataByDay;
};



