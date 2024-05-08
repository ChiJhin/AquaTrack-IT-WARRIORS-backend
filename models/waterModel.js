import { model, Schema } from "mongoose";

const waterSchema = new Schema({
  value: {
    type: String,
    required: true
  },
}, {
  versionKey: false,
  timestamps: true
});

export const Water = model('water', waterSchema)