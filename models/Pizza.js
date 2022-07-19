import mongoose from "mongoose";

const PizzaSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            maxlength: 60,
          },
          description: {
            type: String,
            required: true,
            maxlength: 200,
          },
          img: {
            type: String,
            required: true,
          },
          prices: {
            type: [Number],
            required: true,
          },
          extraOptions: {
            type: [
              {
                text: { type: String, required: true },
                price: { type: Number, required: true },
              },
            ],
          },
        },
        { timestamps: true }
);

export default mongoose.models.Pizza || mongoose.model("Pizza",PizzaSchema);