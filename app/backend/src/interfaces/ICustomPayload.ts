import { JwtPayload } from 'jsonwebtoken';

export default interface ICustomPayload extends JwtPayload {
  data: {
    role: string;
  }
}
