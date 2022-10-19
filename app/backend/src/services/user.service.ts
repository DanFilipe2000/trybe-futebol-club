import 'dotenv/config';

import ILogin from '../interfaces/ILogin';
import User from '../database/models/user.model';
import IUser from '../interfaces/IUser';
import Jwt from './jwt.service';
import BCrypt from './bcrypt.service';

export default class UserService {
  static getByEmail = async (userEmail: string): Promise<IUser | null> => {
    const result = await User.findOne({ where: { email: userEmail } });
    return result;
  };

  public login = async ({ email, password }: ILogin): Promise<string> => {
    const user: IUser | null = await UserService.getByEmail(email);

    if (!user) {
      return 'User not exists';
    }

    const bcrypt = BCrypt.compareSync(password, user.password);

    if (bcrypt === false) {
      return 'Não autorizado';
    }

    const { username } = user;
    const secret = process.env.JWT_SECRET || '';
    const token = Jwt.sign({ data: { username } }, secret, { expiresIn: '1d' });

    return token;
  };
}
