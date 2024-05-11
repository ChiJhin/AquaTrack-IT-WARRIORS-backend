import { isValidObjectId } from "mongoose";

import HttpError from "../helpers/HttpError.js";
import { addWaterDataService, daylyWaterData, deleteWaterDateService, updateWaterDataService, monthlyWaterData } from "../services/waterServices.js"
import { catchAsyncErr } from "../helpers/catchAsyncError.js";

export const addWaterData = catchAsyncErr(async (req, res) => {
   
    const waterData = await addWaterDataService(req.body);

    if (waterData) {
      res.status(201).json(waterData)
    } else {
      res.status(404).json({
        message: 'Not found'
      })
    }
});

export const updateWaterData = catchAsyncErr(async (req, res) => {

    const isVlidId = isValidObjectId(req.params.id);
    console.log(isVlidId)
    
    if (isVlidId) {
      const updated = await updateWaterDataService(req.params.id, req.body);

      if (updated) {
        res.status(200).json(updated)
      } else {
        res.status(404).json({
          message: 'Not found1'
        })
      }
    } else {
      res.status(404).json({
        message: 'Not found2'
      })
    }
});

export const deleteWaterData = catchAsyncErr(async (req, res) => {
  const isValide = isValidObjectId(req.params.id);

  if (!isValide) {
    throw HttpError(404, 'Not found')
  }

  const deletedData = await deleteWaterDateService(req.params.id);

  if (!deletedData) {
    throw HttpError(404, 'Not found')
  }

  res.status(200).json({
    deletedData,
    message: 'Water info was delete'
  })
});

export const getWaterDataPerDay = catchAsyncErr(async (req, res) => {
  
  const day = req.query.day;
  const waterDataPerDay = await daylyWaterData(day);

  if (!waterDataPerDay) throw HttpError(404, 'Not found');
  
  res.status(200).json(waterDataPerDay)
});

export const getWaterDataPerMonth = catchAsyncErr(async (req, res) => {
  const month = req.query.month;

  const waterDataPerMonth = await monthlyWaterData(month);
  
  if (!waterDataPerMonth || waterDataPerMonth.length === 0) {
    throw HttpError(404, 'Not found')
  };

  res.status(200).json(waterDataPerMonth)
});