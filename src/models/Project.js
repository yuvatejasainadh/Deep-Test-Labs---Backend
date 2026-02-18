import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    baseUrl: { type: String, required: true },

    apiBaseUrl: { type: String, default: "" },


    modules: [
      {
        type: String,
        enum: ["ui", "api", "performance"],
      },
    ],

    criticalEndpoints: [{ type: String }],

    status: {
      type: String,
      enum: ["Draft", "Assigned", "Testing", "Completed"],
      default: "Draft",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    results: {
      ui: { type: Object, default: {} },
      api: { type: Object, default: {} },
      performance: { type: Object, default: {} },
    },

    releaseConfidence: {
      score: { type: Number, default: 0 },
      risk: { type: String, default: "High" },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
