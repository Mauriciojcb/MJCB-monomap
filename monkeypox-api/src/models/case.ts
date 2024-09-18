import mongoose, { Schema, Document } from 'mongoose';

interface ICase extends Document {
  lat: number;
  lng: number;
  isSent: boolean;
  genre: string;
  age: number;
  creationDate: Date;
}

const caseSchema: Schema = new Schema({
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  isSent: { type: Boolean, default: false },
  genre: { type: String, required: true },
  age: { type: Number, required: true },
  creationDate: { type: Date, default: Date.now },
});

export const Case = mongoose.model<ICase>('Case', caseSchema);
