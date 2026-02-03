// server/models/MenuItem.js
import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      index: true,
      trim: true,
    },
    description: String,
    category: {
      type: String,
      required: true,
      enum: ["Appetizer", "Main Course", "Dessert", "Beverage"],
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    ingredients: [String],
    isAvailable: {
      type: Boolean,
      default: true,
    },
    preparationTime: Number,
    imageUrl: String,
  },
  { timestamps: true }
);

// text index for search
menuItemSchema.index({ name: "text", ingredients: "text" });

export default mongoose.model("MenuItem", menuItemSchema);
