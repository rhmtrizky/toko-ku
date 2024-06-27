import { addData, deleteData, retrieveData, updateData } from '@/lib/firebase/service';
import { NextApiRequest, NextApiResponse } from 'next';

import jwtAuth from '@/middlewares/jwtAuth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { product }: any = req.query;
  if (req.method === 'GET') {
    const products = await retrieveData('products');
    const data = products.map((product: any) => {
      // delete user.password;
      return product;
    });
    res.status(200).json({ status: true, message: 'Success', data: data });
  } else if (req.method === 'POST') {
    jwtAuth(req, res, async (decoded: any) => {
      let { data } = req.body;
      data.price = parseInt(data.price);
      data.stock = parseInt(data.stock);
      data.created_at = new Date();
      data.updated_at = new Date();
      if (decoded) {
        try {
          await addData('products', data, (status: boolean, result: any) => {
            if (status) {
              return res.status(200).json({ status: true, code: 200, message: 'Success', data: { id: result.id } });
            } else {
              return res.status(400).json({ status: false, code: 400, message: 'Failed to add product' });
            }
          });
        } catch (error) {
          return res.status(500).json({ status: false, message: 'Internal Server Error' });
        }
      } else {
        return res.status(401).json({ status: false, message: 'Unauthorized' });
      }
    });
  } else if (req.method === 'PUT') {
    jwtAuth(req, res, async (decoded: any) => {
      const { data } = req.body;

      if (decoded && decoded.role === 'admin') {
        await updateData('products', product[0], data, (result: boolean) => {
          if (result) {
            res.status(200).json({ status: true, code: 200, message: 'Success', data: data });
          } else {
            res.status(400).json({ status: false, code: 400, message: 'Failed' });
          }
        });
      } else {
        res.status(401).json({ status: false, message: 'Access Denied' });
      }
    });
  } else if (req.method === 'DELETE') {
    jwtAuth(req, res, async (decoded: any) => {
      if (decoded && decoded.role === 'admin') {
        await deleteData('products', product[0], (result: boolean) => {
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
