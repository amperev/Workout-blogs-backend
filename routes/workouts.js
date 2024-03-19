const express= require("express")
const router = express.Router()
const {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout,

}= require("../controllers/workoutControllers")

const requireAuth= require('../middleware/requireAuth')

router.use(requireAuth)

router.get('/',getWorkouts)

router.get("/:id",getWorkout)

router.post("/",createWorkout)

router.delete("/:id",deleteWorkout)

router.patch("/:id",updateWorkout)

module.exports =router

