import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        name: { type: String, required: true },
        files: { type: Object, default: {} },
    },
    { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
