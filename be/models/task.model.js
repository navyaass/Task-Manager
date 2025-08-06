import mongoose from 'mongoose'

const taskSchema = new mongoose.Schema({
  title:{
    type:String,
    required:true
  },
  description:{
    type:String,
    required:true
  },
  priority:{
    type:String,
    enum:['Low','High','Medium']
  },
  dueDate:{
    type:Date,
    required:true
  }

})

const Task = new mongoose.model('Task',taskSchema);
export default Task;  