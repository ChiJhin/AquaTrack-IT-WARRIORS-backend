import Joi from "joi";

const dateRegex = /^(\d{2})\.(\d{2})\.(\d{4})$/
const timeRegex = /^\d{2}:\d{2}$/;
const monthlyRegex = /^(\d{2})\.(\d{4})$/

export const updateWaterSchema = Joi.object({
  value: Joi.number()
    .positive(),
  date: Joi
    .string()
    .pattern(dateRegex)
    .message('Date must be dd.mm.yyyy'),
  time: Joi
    .string()
    .pattern(timeRegex)
    .message('Time must be hh:mm')
})
  .options({ abortEarly: false });

export const querySchema = Joi.object({
  year: Joi.string()
    .pattern(/^\d{4}$/)
    .message("Year must be yyyy"),
  month: Joi.string()
    .pattern(/^\d{2}$/)
    .message('Month must be mm'),
  day: Joi.string()
    .pattern(/^\d{2}$/)
    .message('Day must be dd'),
});