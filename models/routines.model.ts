import mongoose from "mongoose";

const routineSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  exercises: [
    {
      exercise: { type: String, required: true },
      sets: { type: Number, required: true },
      reps: { type: Number, required: true },
      weight: { type: Number, required: true },
    },
  ],
});

const Routine = mongoose.models.Routine || mongoose.model("Routine", routineSchema);

export default Routine;
