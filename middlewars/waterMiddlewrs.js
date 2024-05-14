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
});