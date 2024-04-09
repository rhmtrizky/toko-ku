import { retrieveDataById, updateData } from '@/lib/firebase/service';
import jwtAuth from '@/middlewares/jwtAuth';
import bcrypt, { compare } from 'bcrypt';

import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == 'GET') {
    jwtAuth(req, res, async (decoded: any) => {
      if (decoded) {
        const profile: any = await retrieveDataById('users', decoded.id);
        profile.id = decoded.id;
        res.status(200).json({
          status: true,
          code: 200,
          message: 'Success',
          data: profile,
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
    const { user }: any = req.query;
    const { data } = req.body;
    jwtAuth(req, res, async (decoded: any) => {
      if (decoded) {
        if (data.password) {
          const passwordConfirm = await compare(data.oldPassword, data.encryptedPassword);
          if (!passwordConfirm) {
            res.status(400).json({ status: false, code: 400, message: 'Wrong Password' });
          }
          delete data.oldPassword;
          delete data.encryptedPassword;
          let salt = await bcrypt.genSalt(10);
          let hashPassword = await bcrypt.hash(data.password, salt);
          data.password = hashPassword;
        }
        await updateData('users', user[0], data, (result: boolean) => {
          if (result) {
            res.status(200).json({ status: true, code: 200, message: 'Success', data: data });
          } else {
            res.status(400).json({ status: false, code: 400, message: 'Failed' });
          }
        });
      }
    });
  }
}
