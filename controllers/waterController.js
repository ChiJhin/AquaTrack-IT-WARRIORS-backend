import { isValidObjectId } from "mongoose";

import HttpError from "../helpers/HttpError.js";
import { addWaterDataService, deleteWaterDateService, getWaterDataByDay, localDate, updateWaterDataService, waterDataPerPeriod } from "../services/waterServices.js"
import { catchAsyncErr } from "../helpers/catchAsyncError.js";

export const addWaterData = catchAsyncErr(async (req, res) => {
  let currentDate = new Date(); 
  
  if (req.body.date) {
    const dateString = req.body.date;
    const dateParts = dateString.split('.');
    
    if (dateParts.length === 3) {
      const day = parseInt(dateParts[0], 10);
      const month = parseInt(dateParts[1], 10) - 1;
      const year = parseInt(dateParts[2], 10);
      
      if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
        currentDate = new Date(year, month, day);
      };
    };
  };
  
  const waterData = await addWaterDataService({...req.body, date: localDate(currentDate)}, req.user);
  
  if (waterData) {
    const waterDatdByDate = await getWaterDataByDay(currentDate);
    res.status(201).json(waterDatdByDate);
  } else {
    res.status(404).json({
      message: 'Data not found'
    });
  }
});

export const updateWaterData = catchAsyncErr(async (req, res) => {

    const isVlidId = isValidObjectId(req.params.id);
    
    if (isVlidId) {
      const updated = await updateWaterDataService(req.params.id, req.body, req.user);

      if (updated) {
        res.status(200).json(updated)
      } else {
        res.status(404).json({
          message: 'Data not found'
        })
      }
    } else {
      res.status(404).json({
        message: 'Data not found'
      })
    }
});

export const deleteWaterData = catchAsyncErr(async (req, res) => {
  const isValide = isValidObjectId(req.params.id);

  if (!isValide) {
    throw HttpError(404, 'Data not found')
  }

  const deletedData = await deleteWaterDateService(req.params.id, req.user);

  if (!deletedData) {
    throw HttpError(404, 'Data not found')
  }

  res.status(200).json({
    deletedData,
    message: 'Water info was delete'
  })
});

export const getWaterDataPerPeriod = catchAsyncErr(async (req, res) => {
  const { year, month, day } = req.query;
  const { totalValue } = req.body;

  const periodData = await waterDataPerPeriod(year, month, day, req.user);
  
  if (!periodData || periodData.length === 0) {
    throw HttpError(404, 'Not found')
  };

  res.status(200).json({periodData, totalValue})
});