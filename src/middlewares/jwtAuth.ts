import jwt from 'jsonwebtoken';

const jwtAuth = (req: any, res: any, callback: Function) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (token) {
    jwt.verify(token, process.env.NEXTAUTH_SECRET || '', (err: any, decoded: any) => {
      if (decoded) {
        callback(decoded);
      } else {
        return res.status(401).json({ status: false, code: 403, message: 'Unauthorized' });
      }
    });
  } else {
    return res.status(401).json({ status: false, code: 403, message: 'MANA TOKEN LU BABIII' });
  }
};

export default jwtAuth;
