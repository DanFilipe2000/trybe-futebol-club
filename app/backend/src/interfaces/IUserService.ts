import ILogin from './ILogin';

export default interface IUserService {
  login({ email, password }: ILogin): Promise<string>;
}
