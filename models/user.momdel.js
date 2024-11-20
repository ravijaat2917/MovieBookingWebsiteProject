const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userid: { type: Number, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  contact: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], required: true },
  isLoggedIn: { type: Boolean, default: false },
  uuid: { type: String },
  accesstoken: { type: String },
  coupens: [
    {
      id: { type: Number, required: true },
      discountValue: { type: Number, required: true },
    },
  ],
  bookingRequests: [
    {
      reference_number: { type: Number, required: true },
      coupon_code: { type: Number, required: true },
      show_id: { type: Number, required: true },
      tickets: [{ type: Number, required: true }],
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
