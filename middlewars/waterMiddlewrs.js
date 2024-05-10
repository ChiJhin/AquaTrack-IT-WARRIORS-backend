import HttpError from "../helpers/HttpError.js";
import { catchAsyncErr } from "../helpers/catchAsyncError.js";
import { updateWaterSchema } from "../schemas/waterSchemas.js"


export const checkUpdateWaterData = catchAsyncErr(async (req, _, next) => {
  const { value, error } = updateWaterSchema.validate(req.body);

  if (error) throw HttpError(400, error.message);

  req.body = value;

  next();
});