const Workouts = require("../models/workoutModel")
const mongoose =require("mongoose")
const getWorkouts= async (req,res)=>{

    const user_id = req.user._id

    const workouts =await Workouts.find({user_id}).sort({createdAt:-1})

    res.status(200).json(workouts)
}

const getWorkout= async (req,res)=>{
    const {id} =req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "NO Such Workout"});
    }

    const workout= await Workouts.findById(id)

    if(!workout){
        return res.status(404).json({error: "NO Such Workout"});
    }

    res.status(200).json(workout)
}

const createWorkout= async(req,res)=>{
    const {title,load, reps} =req.body

    let emptyFields=[]

    if(!title){
        emptyFields.push('title')
    }
    if(!load){
        emptyFields.push('load')
    }
    if(!reps){
        emptyFields.push('reps')
    }

    if(emptyFields.length>0){
        return res.status(400).json({error: "Please Fill in all the fields",emptyFields})
    }

    try{
        const user_id= req.user._id
        const workout= await Workouts.create({title,load,reps,user_id})
        res.status(200).json(workout)
    }
    catch(err){
        res.status(400).json({error: err.message})
    }

}

const deleteWorkout= async (req,res)=>{
    const {id} =req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "NO Such Workout"});
    }

    const workout= await Workouts.findOneAndDelete({_id:id});

    if(!workout){
        return res.status(404).json({error: "NO Such Workout"});
    }

    res.status(200).json(workout);

}

const updateWorkout = async (req,res)=>{
    const {id} =req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "NO Such Workout"});
    }

    const workout= await Workouts.findOneAndUpdate({_id:id},{
        ...req.body
    }).then((res)=>{console.log(res)})

    if(!workout){
        return res.status(404).json({error: "NO Such Workout"});
    }

    res.status(200).json(workout)
}



module.exports={
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout,
}