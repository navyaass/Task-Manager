import Task from "../models/task.model.js";

 export const addTask = async (req,res) =>{
  const { title, description, priority, dueDate } = req.body;
  if(!title || !description || !priority || !dueDate) {
    return res.status(400).json({ msg: "Please fill all required fields" });
  }
  const newTask = new Task({
    title:title,
    description:description,
    priority:priority,
    dueDate:dueDate
  })

  try{
    await newTask.save();
    return res.status(200).json({msg:"Task added successfully..."})
  }
  catch(error){
    console.error("error occured while task adding", error);
    return res.status(400).json({msg:"error occured while adding task"})
  }

}