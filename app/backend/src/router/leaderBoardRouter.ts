import { Router } from 'express';
import LeaderController from '../controllers/leader.controller';

const leaderRouter = Router();

const leaderController = new LeaderController();

leaderRouter.get('/home', (req, res) => {
  leaderController.getHome(req, res);
});
leaderRouter.get('/away', (req, res) => {
  leaderController.getAway(req, res);
});

// matchesRouter.get('/:id', (req, res) => { matchesController.getById(req, res); });

export default leaderRouter;
