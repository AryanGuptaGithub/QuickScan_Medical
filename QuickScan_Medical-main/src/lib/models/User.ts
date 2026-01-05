import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  phone: { type: String, required: true },
  dateOfBirth: { type: Date },
  gender: { type: String, enum: ["male", "female", "other"] },
  address: {
    street: String,
    city: String,
    state: String,
    pincode: String,
    country: { type: String, default: "India" },
  },
  profilePicture: { type: String },
  isVerified: { type: Boolean, default: false },
  role: {
    type: String,
    enum: ["user", "admin", "lab-admin"],
    default: "user",
  },
  emailVerified: { type: Date },
  accounts: [],
  sessions: [],
  verificationTokens: [],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
