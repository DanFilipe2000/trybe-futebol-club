import { Router } from 'express';
import MatchesMiddleware from '../middlewares/matches.middlewares';
import MatchesController from '../controllers/matches.controller';

const matchesRouter = Router();

const matchesController = new MatchesController();
const matchesMiddleware = new MatchesMiddleware();

matchesRouter.patch('/:id/finish', (req, res) => {
  matchesController.patch(req, res);
});
matchesRouter.post(
  '/',
  matchesMiddleware.validateToken,
  matchesMiddleware.validateIfExists,
  matchesMiddleware.validateTeams,
  (req, res) => { matchesController.post(req, res); },
);
matchesRouter.get('/', (req, res) => {
  matchesController.get(req, res);
});

// matchesRouter.get('/:id', (req, res) => { matchesController.getById(req, res); });

export default matchesRouter;
