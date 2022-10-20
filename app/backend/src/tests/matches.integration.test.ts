import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
// import User from '../database/models/user.model';

// import { Response } from 'superagent';
// import Jwt from '../services/jwt.service';
// import BCrypt from '../services/bcrypt.service';
// import UserService from '../services/user.service';
import Match from '../database/models/match.model';
import matchesMock from './mock/matches.mock';
import Jwt from '../services/jwt.service';
import UserService from '../services/user.service';

chai.use(chaiHttp);

const { expect } = chai;

const newMatchMock = {
	id: 49,
	homeTeam: 16,
	awayTeam: 8,
	homeTeamGoals: 2,
	awayTeamGoals: 2,
	inProgress: true
}

const tokenMock = {
  token: 'any-token'
}

describe('teamsTest', () => {
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
  describe('/matches', () => {
    describe('Na rota /matches com o método GET retorna as partidas com o status 200', () => {
      beforeEach(() => {
        sinon.stub(Match, 'findAll').resolves(matchesMock as unknown as Match[]);
      })
      it('Retorna os times com sucesso', async () => {
        const response = await chai.request(app).get('/matches');
        chai.expect(response.status).to.be.eq(200);
      }) 
    })
    describe('Na rota /matches com o método POST retorna a partida criada com o status 201', () => {
      beforeEach(() => {
        sinon.restore();
        sinon.stub(Match, 'create').resolves(newMatchMock as Match);
      })
      it('Retorna os times com sucesso', async () => {
        const response = await chai.request(app).post('/matches').send({
          homeTeam: 16,
          awayTeam: 8,
          homeTeamGoals: 2,
          awayTeamGoals: 2,
        }).set("authorization", "any-token");
        console.log(response);
        chai.expect(response.status).to.be.eq(201);
      }) 
    })
    describe('Na rota /matches com o método PATCH retorna status 200 com a messagem Finished', () => {
      beforeEach(() => {
        sinon.restore();
      })
      it('Retorna os times com sucesso', async () => {
        const response = await chai.request(app).patch('/matches/4/finish');
        chai.expect(response.status).to.be.eq(200);
      }) 
    })
  })
})
