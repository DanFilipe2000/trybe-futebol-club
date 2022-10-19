import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
// import User from '../database/models/user.model';
import teamsMock from './mock/teams.mock';

// import { Response } from 'superagent';
// import Jwt from '../services/jwt.service';
// import BCrypt from '../services/bcrypt.service';
// import UserService from '../services/user.service';
import Team from '../database/models/team.model';

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
  describe('/teams', () => {
    describe('Na rota com o método GET retorna os times com o status 200', () => {
      beforeEach(() => {
        sinon.stub(Team, 'findAll').resolves(teamsMock as Team[]);
      })
      it('Retorna os times com sucesso', async () => {
        const response = await chai.request(app).get('/teams');
        chai.expect(response.status).to.be.eq(200);
      }) 
    })
  })
})
