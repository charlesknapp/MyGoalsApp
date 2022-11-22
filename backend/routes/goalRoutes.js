const express = require("express");
const router = express.Router();
const { getGoal, setGoal, updateGoal, deleteGoal } = require('../controllers/goalController')
const {protect} = require('../middleware/authMiddleware')

// CRUD ROUTES

router.route('/').get(protect, getGoal).post(protect, setGoal);
router.route('/:id').delete(protect, deleteGoal).put(protect, updateGoal);
// router.get("/", getGoal);
// router.post("/", (setGoal));
// router.put("/:id", (updateGoal));
// router.delete("/:id", (deleteGoal));

module.exports = router;