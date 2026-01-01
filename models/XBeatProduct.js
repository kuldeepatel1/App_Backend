const mongoose = require("mongoose");

const xBeatProductSchema = new mongoose.Schema(
  {
    id: { type: Number},

    tag: { type: String },                    // e.g. "hero-product", "featured-product"
    tagline: { type: String },
    heroImage: { type: String },

    images: [{ type: String }],

    brand: { type: String, required: true },
    title: { type: String, required: true },
    info: { type: String },

    category: { type: String, required: true },   // Headphones, Earbuds, etc.
    type: { type: String },
    connectivity: { type: String },

    finalPrice: { type: Number, required: true },
    originalPrice: { type: Number },

    quantity: { type: Number, default: 1 },

    ratings: { type: Number, default: 0 },        // total reviews
    rateCount: { type: Number, default: 0 },      // average stars (1–5)

    path: { type: String }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("xBeatProduct", xBeatProductSchema);
