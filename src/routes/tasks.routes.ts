import { Router } from 'express';
import { create, deleteTask, getByDateRange, update } from '../controllers/tazk.controller';
import { userAuth } from '../middleware/index';
import { uploadImage, deleteImage } from '../controllers/image.controller';
import multer from '../core/service/image/multer.service';

const router = Router();

const route = '/tazk';
router.post(`${route}`, userAuth, create);
router.get(`${route}/getByDate`, userAuth, getByDateRange);
router.put(`${route}`, userAuth, update);
router.delete(`${route}`, userAuth, deleteTask);
router.post(`${route}/image`, userAuth, multer.single('image'), uploadImage);
router.delete(`${route}/image`, userAuth, deleteImage);

export default router;