import Task from "../models/task.model.js";



 export const addTask = async (req,res) =>{
  const { title, description, priority, dueDate,status } = req.body;
  if(!title || !description || !priority || !dueDate  ) {
    return res.status(400).json({ msg: "Please fill all required fields" });
  }
  const newTask = new Task({
    title:title,
    description:description,
    priority:priority,
    dueDate:dueDate,
    
   
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

//////////////////////deleteTask//////////////////////////////

export const deleteTask = async (req,res) =>{
  const {id} = req.params;
  if(!id){
    return res.status(400).json({msg:"please provide the id in the url"})
  }
  try{
    const task = await Task.findByIdAndDelete(id)
    if(!task){
      return res.status(404).json({msg:"Task not found"})
    }
    return res.status(200).json({msg:"task deletd sucesfully..."})
  }
  catch(error){
    console.error("error occured while deleting task", error);
    return res.status(500).json({msg:"error occured while deleting task"})
  } 
}


//////////////////////////UpdateTak///////////////////////////////////

 export const updateTask = async(req,res) => {
  
  const {id} = req.params;
  if(!id)
    return res.status(400).json({msg:"provide the respected id"})
  const updates = req.body;
  if(!updateTask)
    return res.status(400).json({msg:"provide the updation values"})

  try{
    let updatingVal = await Task.findByIdAndUpdate(id,updates,{new:true})
    if(!updatingVal)
      return res.send("cannot find the task..")
    return res.status(200).json({msg:"updated the task succesfully...",task:updatingVal})
  }catch(error){
    console.error("error occured while updating the value",error)
    return res.status(500).json({msg:"server error..."})
  }
 }

 //////////////////get Tasks/////////////////////

export const getAllTasks = async(req,res) => {
try
  {
  const allTasks = await Task.find()
  return res.status(200).json({msg:"all datas are fetched","task":allTasks})
}
  catch(error){
    console.error("error occured while displaying the tasks",error)
    return res.status(400).json({msg:"error occured.."})
  }
}

///////////////priority/////////////////

export const getPriorityOptions = (req,res) =>{
  const priorityOptions = ["Low","Medium","High"]
  return res.status(200).send(priorityOptions)

}