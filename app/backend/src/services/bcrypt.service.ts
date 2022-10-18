import * as bcrypt from 'bcryptjs';

export default class BCrypt {
  static compareSync = (password: string, hash: string): boolean => {
    const result = bcrypt.compareSync(password, hash);
    return result;
  };
}
