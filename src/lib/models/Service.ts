import mongoose from 'mongoose';

const ServiceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: { 
    type: String, 
    required: true,
    enum: ['mri', 'ct-scan', 'x-ray', 'health-checkup', 'blood-test', 'ultrasound']
  },
  description: { type: String, required: true },
  shortDescription: { type: String },
  originalPrice: { type: Number, required: true },
  discountedPrice: { type: Number },
  features: [{ type: String }],
  preparationInstructions: { type: String },
  reportTime: { type: String }, // e.g., "24 hours", "Same day"
  imageUrl: { type: String },
  isPopular: { type: Boolean, default: false },
  isHomeService: { type: Boolean, default: false },
  labIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lab' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

ServiceSchema.pre('save', function(this: any) {
  this.updatedAt = new Date();
});

export default mongoose.models.Service || mongoose.model('Service', ServiceSchema);
