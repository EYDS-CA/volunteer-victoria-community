import { UserType } from '../schema/enums';
import { RequestWithUser } from '../util/RequestWithUser';

export const adminCheck = (req: RequestWithUser, res, next) => {
  if (req.user.userType !== UserType.Admin) {
    return res.status(403).json({ error: 'Insufficient Permissions' });
  }
  next();
}