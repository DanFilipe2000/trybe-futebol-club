import { JwtPayload } from 'jsonwebtoken';

export default interface ICustomPayload extends JwtPayload {
  data: {
    userId: number | string;
    role: string;
  }
}
