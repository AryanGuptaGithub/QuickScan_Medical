import mongoose from 'mongoose';

const LabSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pincode: { type: String, required: true },
  coordinates: {
    lat: { type: Number },
    lng: { type: Number }
  },
  phone: { type: String, required: true },
  email: { type: String },
  services: [{ type: String }], // MRI, CT-Scan, etc.
  facilities: [{ type: String }], // 1.5T MRI, 3T MRI, etc.
  openingHours: {
    monday: { from: String, to: String },
    tuesday: { from: String, to: String },
    wednesday: { from: String, to: String },
    thursday: { from: String, to: String },
    friday: { from: String, to: String },
    saturday: { from: String, to: String },
    sunday: { from: String, to: String }
  },
  rating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
  images: [{ type: String }],
  isHomeServiceAvailable: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Lab || mongoose.model('Lab', LabSchema);