import { retrieveDataById, updateData } from '@/lib/firebase/service';
import jwtAuth from '@/middlewares/jwtAuth';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == 'GET') {
    jwtAuth(req, res, async (decoded: any) => {
      if (decoded) {
        const user: any = await retrieveDataById('users', decoded.id);
        user.id = decoded.id;
        res.status(200).json({
          status: true,
          code: 200,
          message: 'Success',
          data: user.carts,
        });
      } else {
        res.status(404).json({
          status: false,
          code: 404,
          message: 'Not Found',
        });
      }
    });
  } else if (req.method === 'PUT') {
    const { data } = req.body;
    jwtAuth(req, res, async (decoded: any) => {
      if (decoded) {
        await updateData('users', decoded.id, data, (result: boolean) => {
          if (result) {
            res.status(200).json({ status: true, code: 200, message: 'Success Update Cart', data: data });
          } else {
            res.status(400).json({ status: false, code: 400, message: 'Failed Update Cart' });
          }
        });
      }
    });
  }
}
