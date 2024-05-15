import HttpError from "../helpers/HttpError.js";
import { catchAsyncErr } from "../helpers/catchAsyncError.js";
import { querySchema, waterSchema } from "../schemas/waterSchemas.js"


export const checkWaterData = catchAsyncErr(async (req, _, next) => {
  const { value, error } = waterSchema.validate(req.body);

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