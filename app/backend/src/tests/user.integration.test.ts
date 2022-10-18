import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/user.model';

import { Response } from 'superagent';
import Jwt from '../services/jwt.service';
import BCrypt from '../services/bcrypt.service';

chai.use(chaiHttp);

const loginMock = {
  email: "admin@admin.com",
  password: "secret_admin"
}

const userMock = {
  username: 'daniel',
  role: 'admin',
  email: 'example@example.com',
  password: "a1b2c3d4"
}

const tokenMock = {
  token: 'any-token'
}

const { expect } = chai;

describe('userTests', () => {
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
    describe('/login', () => {
      beforeEach(() => {
        sinon.stub(User, "findOne").resolves(userMock as User);
        sinon.stub(BCrypt, "compareSync").resolves(true);
        sinon.stub(Jwt, "sign").resolves(tokenMock.token);
      })

      afterEach(() => {
        (User.findOne as sinon.SinonStub).restore();
      })

      it('Deve fazer o login com sucesso e retornar o status 200 com um token', async () => {
        const response: Response = await chai.request(app).post('/login').send(loginMock)
        expect(response.status).to.be.eq(200);
        expect(response.body.token).to.be.eq(tokenMock.token);
      });

      // it('Verifica se o userService retorna um token', async () => {
      //   const response: string = await userService.login(loginMock);
      //   expect(response).to.be.eq(tokenMock.token);
      // });

      // it('Deve fazer o login com sucesso e retornar um token', async () => {
      //   const response: Response = await chai.request(app).post('/login').send(loginMock);
      //   expect(response.body.token).to.be.eq(tokenMock.token);
      // });
    })
});
