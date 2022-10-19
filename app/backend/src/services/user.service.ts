import 'dotenv/config';

import ILogin from '../interfaces/ILogin';
import User from '../database/models/user.model';
import IUser from '../interfaces/IUser';
import Jwt from './jwt.service';
import BCrypt from './bcrypt.service';
import CustomError from '../error/customError';
import ICustomPayload from '../interfaces/ICustomPayload';

export default class UserService {
  static getByEmail = async (userEmail: string): Promise<IUser | null> => {
    const result = await User.findOne({ where: { email: userEmail } });
    return result;
  };

  public login = async ({ email, password }: ILogin): Promise<string> => {
    const user: IUser | null = await UserService.getByEmail(email);

    if (!user) {
      throw new CustomError(401, 'Incorrect email or password');
    }

    const bcrypt = BCrypt.compareSync(password, user.password);

    if (bcrypt === false) {
      throw new CustomError(401, 'Incorrect email or password');
    }

    const { role } = user;
    const secret = process.env.JWT_SECRET || '';
    const token = Jwt.sign({ data: { role } } as ICustomPayload, secret, { expiresIn: '1d' });

    return token;
  };

  public validate = async (authorization: string): Promise<string> => {
    const secret = process.env.JWT_SECRET || '';
    const role = Jwt.validate(authorization, secret);
    return role;
  };
}
