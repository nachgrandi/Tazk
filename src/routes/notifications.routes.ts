import { Router } from 'express';
import { sentNotification } from '../controllers/notification.controller';

const router = Router();

const route = '/notifications';
router.post(`${route}`, sentNotification);

export default router;