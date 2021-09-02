import {Router} from 'express';
import {
  signUp,
  auth
} from '../controllers/user.controller';

const router = Router();

router.post('/signup', signUp);
router.post('/auth', auth);

export default router;