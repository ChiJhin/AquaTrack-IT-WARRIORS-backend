// import { getWaterDataPerDay, getWaterDataPerMonth } from "../controllers/waterController.js";
import HttpError from "../helpers/HttpError.js";
import { catchAsyncErr } from "../helpers/catchAsyncError.js";
import { querySchema, updateWaterSchema } from "../schemas/waterSchemas.js"


export const checkUpdateWaterData = catchAsyncErr(async (req, _, next) => {
  const { value, error } = updateWaterSchema.validate(req.body);

  if (error) throw HttpError(400, error.message);

  req.body = value;

  next();
});

export const validateQuery = catchAsyncErr(async (req, _, next) => {
  const { value, error } = querySchema.validate(req.query);

  if (error) throw HttpError(400, error.message);

  req.query = value;

  next()
})

// export const waterQueryParameter =  (req, res, next) => {
//   const { day, month } = req.query;

//   if (day) {
//     req.query.day = day;
//     return getWaterDataPerDay(req, res, next)
//   } else if (month) {
//     req.query.month = month;
//     return getWaterDataPerMonth(req, res, next)
//   } else {
//     next(HttpError(400, "Missing query parameter"))
//   }
// }