import Joi, { valid } from "joi";
import { model, Schema } from "mongoose";

const emailRegexp = /^\S+@\S+\.\S+$/;
const genderEnum = ['woman', 'man']

const userSchema = new Schema(
    {
      password: {
        type: String,
        required: [true, "Password is required"],
      },
      email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        match: emailRegexp
      },
      name: {
        type: String,
        required: true
      },
      gender: {
        type: String,
        enum: genderEnum,
        default: 'woman'
      },
      weight: {
        type: Number,
        default: 0
      },
      dailyActivityTime: {
        type: Number,
        default: 0
      },
      dailyWaterNorm: {
        type: Number,
        default: 0
      },
      avatarURL: {
        type: String,
        required: true,
      },
      token: {
        type: String,
        default: null,
      },

    // Optional task - enable if needed
    //   verify: {
    //     type: Boolean,
    //     default: false,
    //   },
    //   verificationToken: {
    //     type: String,
    //     required: [true, 'Verify token is required'],
    //   },
    },
    {
      versionKey: false,
      timestamps: true
    }
  );

const registerLoginSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(8).max(22).required()
})

const updateUserSchema = Joi.object({
    name:  Joi.string(),
    email: Joi.string().pattern(emailRegexp),
    gender: Joi.string().valid(...genderEnum),
    weight: Joi.number(),
    dailyActivityTime: Joi.number(),
    dailyWaterNorm: Joi.number(),
    avatarURL: Joi.string()

})

export const Schemas = {
    registerLoginSchema,
    updateUserSchema
}
export const User = model('user', userSchema)