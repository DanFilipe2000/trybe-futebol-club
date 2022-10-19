import { Router } from 'express';
import TeamsController from '../controllers/teams.controller';
// import LoginMiddleware from '../middlewares/login.middleware';

const teamsRouter = Router();

const teamsController = new TeamsController();
// const teamsMiddleware = new LoginMiddleware();

teamsRouter.get('/', (req, res) => {
  teamsController.get(req, res);
});
teamsRouter.get('/:id', (req, res) => { teamsController.getById(req, res); });

export default teamsRouter;
