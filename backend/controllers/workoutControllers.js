const Workout = require("../models/Workout");
const mongoose = require("mongoose");

const get_workout = async (req, res) => {
  const user_id = req.user._id;
  const workouts = await Workout.find({user_id}).sort({ createdAt: -1 });
  //console.log(req.user._id)
  res.status(201).json(workouts);
};

const get_single_workout = async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "Not Valid ID" });
  }
  try {
    const singleWorkout = await Workout.findById({ _id: id });
    res.status(201).json(singleWorkout);
  } catch (error) {
    res.status(404).json({ error: "No Such Workout!!" });
  }
};

const create_workout = async (req, res) => {
  const { title, reps, load } = req.body;
  const user_id = req.user._id;
  try {
    const workout = await Workout.create({ title, reps, load, user_id });
    res.status(200).json(workout);
  } catch (error) {
    res.status(404).json({ error: "Cant't Save!" });
  }
};

const update_workout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "Not Valid ID" });
  }

  try {
    const workout = await Workout.findByIdAndUpdate(
      { _id: id },
      { ...req.body }
    );
    res.status(201).json(workout);
  } catch (error) {
    res.status(404).json({ error: "Cant't Update!" });
  }
};

const delete_workout = async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "Not Valid ID" });
  }
  try {
    const workout = await Workout.findOneAndDelete({ _id: id });
    res.status(201).json(workout);
  } catch (error) {
    res.status(404).json({ error: "No Such Workout!!" });
  }
};

module.exports = {
  get_workout,
  get_single_workout,
  create_workout,
  update_workout,
  delete_workout,
};

// function insertWorkouts() {
//   Workout.insertMany([
//     { title: "Bench", reps: 10, load: 25 },
//     { title: "Bi Seps", reps: 10, load: 25 },
//     { title: "Tri Seps", reps: 10, load: 25 },
//     { title: "Leg", reps: 10, load: 25 },
//     { title: "Six Packs", reps: 10, load: 25 },
//     { title: "Back", reps: 10, load: 25 },
//   ]);
// }

// insertWorkouts();
