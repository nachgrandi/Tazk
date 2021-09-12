import { Router } from 'express';
import { create, deleteTask, getByDateRange, update } from '../controllers/tazk.controller';

const router = Router();

const route = '/tazk';
router.post(`${route}/create`, create);
router.get(`${route}/getByDate`, getByDateRange);
router.put(`${route}/update`, update);
router.delete(`${route}`, deleteTask);

export default router;