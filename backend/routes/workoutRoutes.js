const { Router } = require("express");
const router = Router();
const workoutControllers = require("../controllers/workoutControllers");
const requireAuth = require("../middleware/requireAuth");

router.use(requireAuth);
router.get("/", workoutControllers.get_workout);
router.get("/:id", workoutControllers.get_single_workout);
router.post("/", workoutControllers.create_workout);
router.patch("/:id", workoutControllers.update_workout);
router.delete("/:id", workoutControllers.delete_workout);

module.exports = router;
