import { Router } from 'express';
import { create, deleteTask, getByDateRange, update } from '../controllers/tazk.controller';
import { userAuth } from '../middleware/index';

const router = Router();

const route = '/tazk';
router.post(`${route}`, userAuth, create);
router.get(`${route}/getByDate`, userAuth, getByDateRange);
router.put(`${route}`, userAuth, update);
router.delete(`${route}`, userAuth, deleteTask);

export default router;