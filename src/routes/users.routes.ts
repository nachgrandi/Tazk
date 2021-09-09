import {Router} from 'express';
import {
  signUp,
  singIn
} from '../controllers/user.controller';

const router = Router();

router.post('/signup', signUp);
router.post('/singin', singIn);

export default router;