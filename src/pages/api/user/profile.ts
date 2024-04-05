import { retrieveDataById } from '@/lib/firebase/service';
import jwtAuth from '@/middlewares/jwtAuth';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == 'GET') {
    jwtAuth(req, res, async (decoded: any) => {
      if (decoded) {
        const profile = await retrieveDataById('users', decoded.id);
        return res.status(200).json({
          status: true,
          code: 200,
          data: profile,
        });
      }
    });
  }
}
