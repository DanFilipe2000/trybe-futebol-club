import * as jwt from 'jsonwebtoken';

export default class Jwt {
  static sign = (payload: jwt.JwtPayload, secret: jwt.Secret, options: jwt.SignOptions): string => {
    const result = jwt.sign(payload, secret, options);
    return result;
  };
}
