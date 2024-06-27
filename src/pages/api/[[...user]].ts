import { deleteData, retrieveData, updateData } from '@/lib/firebase/service';
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import jwtAuth from '@/middlewares/jwtAuth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user }: any = req.query;
  if (req.method === 'GET') {
    jwtAuth(req, res, async (decoded: any) => {
      if (decoded) {
        const users = await retrieveData('users');
        const data = users.map((user: any) => {
          delete user.password;
          return user;
        });
        res.status(200).json({ status: true, message: 'Success', data: data });
      }
    });
  } else if (req.method === 'PUT') {
    const { data } = req.body;
    let field = {
      fullname: '',
      email: '',
      phoneNumber: '',
      password: '',
      role: '',
    };
    field.fullname = data.fullname;
    field.phoneNumber = data.phoneNumber;
    field.email = data.email;
    field.role = data.role;
    if (data.password) {
      let salt = await bcrypt.genSalt(10);
      let hashPassword = await bcrypt.hash(data.password, salt);
      field.password = hashPassword;
    }
    jwtAuth(req, res, async (decoded: any) => {
      if (decoded && decoded.role === 'admin') {
        await updateData('users', user[1], field, (result: boolean) => {
          if (result) {
            res.status(200).json({ status: true, code: 200, message: 'Success', data: field });
          } else {
            res.status(400).json({ status: false, code: 400, message: 'Failed' });
          }
        });
      }
    });
  } else if (req.method === 'DELETE') {
    jwtAuth(req, res, async (decoded: any) => {
      if (decoded && decoded.role === 'admin') {
        await deleteData('users', user[1], (result: boolean) => {
          if (result) {
            res.status(200).json({ status: true, code: 200, message: 'Success' });
          } else {
            res.status(400).json({ status: false, code: 400, message: 'Failed' });
          }
        });
      }
    });
  }
}
