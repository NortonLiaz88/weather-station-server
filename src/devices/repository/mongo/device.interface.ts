import { Document } from 'mongoose';

export interface Device extends Document {
  serialNumber: string;
}
