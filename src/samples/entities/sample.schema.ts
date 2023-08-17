import * as mongoose from 'mongoose';

export const SamplesSchema = new mongoose.Schema(
  {
    id: { type: String, auto: true },
    deviceId: { type: String },
    temperature: { type: Number },
    humidity: { type: Number },

    createdAt: { type: Date, auto: true },
    updatedAt: { type: Date, auto: true },
  },
  { timestamps: true, collection: 'samples' },
);
