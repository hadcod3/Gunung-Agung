// models/Photo.js
import mongoose from 'mongoose';

const PhotoSchema = new mongoose.Schema({
  imgUrl: { type: String, required: true },
  category: { type: String, required: true },
  serverId: { type: String, required: true },
  serverName: { type: String, required: true },
  orientation: { 
    type: String, 
    required: true,
    enum: ['horizontal', 'vertical'],
    default: 'horizontal'
  },
}, {
  timestamps: true,
});

// Prevent model overwrite error
export default mongoose.models.Photo || mongoose.model('Photo', PhotoSchema);