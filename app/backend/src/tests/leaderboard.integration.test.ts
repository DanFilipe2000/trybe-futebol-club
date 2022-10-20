import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import AwayLeaderService from '../services/away.leader.service';
import HomeLeaderService from '../services/home.leader.service';
import leaderboardMock from './mock/leaderboard.mock';
// import User from '../database/models/user.model';

// import { Response } from 'superagent';
// import Jwt from '../services/jwt.service';
// import BCrypt from '../services/bcrypt.service';
// import UserService from '../services/user.service';

chai.use(chaiHttp);

const { expect } = chai;

const awayLeaderService = new AwayLeaderService();
const homeLeaderService = new HomeLeaderService();

describe('leaderboardTest', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  // let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(Example, "findOne")
  //     .resolves({
  //       ...<Seu mock>
  //     } as Example);
  // });

  // after(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });
  describe('/leaderboard/home', () => {
    describe('Na rota /leaderboard/home com o método GET retorna o ranking com o status 200', () => {
      beforeEach(() => {
        sinon.stub(homeLeaderService, 'findAllHome').resolves(leaderboardMock);
      })
      it('Retorna os times com sucesso', async () => {
        const response = await chai.request(app).get('/leaderboard/home');
        chai.expect(response.status).to.be.eq(200);
      }) 
    })

    describe('Na rota /leaderboard/away com o método GET retorna o ranking com o status 200', () => {
      beforeEach(() => {
        sinon.restore();
        sinon.stub(awayLeaderService, 'findAllAway').resolves(leaderboardMock);
      })
      it('Retorna os times com sucesso', async () => {
        const response = await chai.request(app).get('/leaderboard/away');
        chai.expect(response.status).to.be.eq(200);
      }) 
    })
    })
})
