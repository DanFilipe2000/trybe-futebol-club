import { Router } from 'express';
import MatchesController from '../controllers/matches.controller';

// import LoginMiddleware from '../middlewares/login.middleware';

const matchesRouter = Router();

const matchesController = new MatchesController();
// const teamsMiddleware = new LoginMiddleware();

matchesRouter.get('/', (req, res) => {
  matchesController.get(req, res);
});
// matchesRouter.get('/:id', (req, res) => { matchesController.getById(req, res); });

export default matchesRouter;
