import mongoose, { Schema, Document } from 'mongoose';

export interface IServer extends Document {
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

const ServerSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Fix for Next.js hot reloading
export default mongoose.models.Server || mongoose.model<IServer>('Server', ServerSchema);