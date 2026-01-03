import mongoose from 'mongoose';

const TimeSlotSchema = new mongoose.Schema({
  labId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Lab', 
    required: true 
  },
  date: { 
    type: Date, 
    required: true 
  },
  slotType: { 
    type: String, 
    enum: ['morning', 'afternoon', 'evening', 'custom'],
    required: true 
  },
  startTime: { 
    type: String, 
    required: true 
  }, // Format: "09:00"
  endTime: { 
    type: String, 
    required: true 
  }, // Format: "10:00"
  maxCapacity: { 
    type: Number, 
    default: 5 
  },
  currentBookings: { 
    type: Number, 
    default: 0 
  },
  isAvailable: { 
    type: Boolean, 
    default: true 
  },
  serviceTypes: [{ 
    type: String 
  }], // ['mri', 'ct-scan', etc.]
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Compound index for efficient queries
TimeSlotSchema.index({ labId: 1, date: 1, startTime: 1 }, { unique: true });

TimeSlotSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  
  // Auto-disable if full
  if (this.currentBookings >= this.maxCapacity) {
    this.isAvailable = false;
  }
  
  next();
});

export default mongoose.models.TimeSlot || mongoose.model('TimeSlot', TimeSlotSchema);