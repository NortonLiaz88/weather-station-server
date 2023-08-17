import * as mongoose from 'mongoose';

export const DeviceSchema = new mongoose.Schema(
  {
    id: { type: String, auto: true },
    serialNumber: { type: String },
  },
  { timestamps: true, collection: 'devices' },
);
