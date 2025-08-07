import express from 'express';
import { addTask, deleteTask, updateTask,getAllTasks,getPriorityOptions } from '../controllers/taskController.js';

const router = express.Router();

router.post('/addTask',addTask);
router.delete(`/deleteTask/:id`,deleteTask);
router.put(`/updateTask/:id`,updateTask);
router.get(`/getTask`,getAllTasks);
router.get(`/getPriorityOptions`,getPriorityOptions);

export default router;