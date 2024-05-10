import Joi from "joi";

const dateRegex = /^(\d{2})\.(\d{2})\.(\d{4})$/
const timeRegex = /^\d{1,2}:\d{2}$/;

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
    .message('Time must be h/hh:mm')
})
  .options({ abortEarly: false });