import { Router } from 'express';
import UserController from '../controllers/user.controller';
import loginMiddleware from '../middlewares/login.middleware';

// const userController = require('../controllers/userController');
// const userMiddleware = require('../middlewares/userMiddleware');

// const auth = require('../middlewares/auth');

const userRouter = Router();

const userController = new UserController();

userRouter.post('/', loginMiddleware, (req, res) => {
  userController.login(req, res);
});
userRouter.get('/');
userRouter.get('/:id');

export default userRouter;
