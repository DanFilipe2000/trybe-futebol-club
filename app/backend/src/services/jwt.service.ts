import * as jwt from 'jsonwebtoken';
import ICustomPayload from '../interfaces/ICustomPayload';

export default class Jwt {
  static sign = (payload: jwt.JwtPayload, secret: jwt.Secret, options: jwt.SignOptions): string => {
    const result = jwt.sign(payload, secret, options);
    return result;
  };

  static validate = (token: string, secret: jwt.Secret) => {
    const { data } = jwt.verify(token, secret) as ICustomPayload;
    return data;
  };
}
