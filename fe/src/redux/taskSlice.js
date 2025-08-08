import { createSlice } from '@reduxjs/toolkit';

const taskSlice = createSlice({
  name: 'task',
  initialState: {
    tasks: [],
    selectedTask: null,
    isEditMode: false,
    showModal: false,
    filterPriority: '',
  },
  reducers: {
    setTasks:(state,action) =>{
      state.tasks = action.payload;
      },
      
    deleteTask:(state,action)=>{
      state.tasks = state.tasks.filter(task => task._id !== action.payload);
    },
    setShowModal: (state, action) => {
      state.showModal = action.payload;
    },
    setEditMode: (state, action) => {
      state.isEditMode = action.payload;
   },
    setSelectedTask: (state, action) => {
      state.selectedTask = action.payload;
   },
    addTask: (state, action) => {
      state.tasks.push(action.payload);
   },
    editTask: (state, action) => {
      const index = state.tasks.findIndex(task => task._id === action.payload._id);
      if (index !== -1) {
         state.tasks[index] = action.payload;
      }
    },
    setFilterPriority: (state,action) => {
      state.filterPriority = action.payload
    }   
    }
})

export const { setTasks, deleteTask, addTask, editTask, setShowModal, setEditMode, setSelectedTask,setFilterPriority } = taskSlice.actions;
export default taskSlice.reducer;