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
    month: Joi.string()
      .pattern(monthlyRegex)
      .message('Date of month must be mm.yyyy')
      .required()
});