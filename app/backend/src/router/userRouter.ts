import { Router } from 'express';
import UserService from '../services/user.service';
import UserController from '../controllers/user.controller';

// const userController = require('../controllers/userController');
// const userMiddleware = require('../middlewares/userMiddleware');

// const auth = require('../middlewares/auth');

const userRouter = Router();

const userService = new UserService();
const userController = new UserController(userService);

userRouter.post('/', (req, res) => {
  userController.login(req, res);
});
userRouter.get('/');
userRouter.get('/:id');

export default userRouter;
