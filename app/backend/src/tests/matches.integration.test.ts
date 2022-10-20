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
import IMatches from '../interfaces/IMatches';
import MatchesService from '../services/matches.service';

chai.use(chaiHttp);

const { expect } = chai;

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
        const response = await chai.request(app).get('/teams');
        chai.expect(response.status).to.be.eq(200);
      }) 
    })
  })
})
