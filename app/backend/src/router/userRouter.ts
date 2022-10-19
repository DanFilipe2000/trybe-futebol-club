import { Router } from 'express';
import UserController from '../controllers/user.controller';
import LoginMiddleware from '../middlewares/login.middleware';

// const userController = require('../controllers/userController');
// const userMiddleware = require('../middlewares/userMiddleware');

// const auth = require('../middlewares/auth');

const userRouter = Router();

const userController = new UserController();
const loginMiddleware = new LoginMiddleware();

userRouter.post('/', loginMiddleware.validate, (req, res) => {
  userController.login(req, res);
});
userRouter.get('/validate', (req, res) => { userController.role(req, res); });

export default userRouter;
