import { addData, retrieveData, retrieveDataById, updateData } from '@/lib/firebase/service';
import jwtAuth from '@/middlewares/jwtAuth';

import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == 'GET') {
    const { order }: any = req.query;
    jwtAuth(req, res, async (decoded: any) => {
      if (decoded) {
        try {
          if (order) {
            const detailProduct = await retrieveDataById('orders', order[0]);
            res.status(200).json({ status: true, message: 'Success', data: detailProduct });
          } else {
            const orders = await retrieveData('orders');
            const data = orders.map((order: any) => {
              return order;
            });
            res.status(200).json({ status: true, message: 'Success Get Orders Data', data: data });
          }
        } catch (err) {
          res.status(500).json({ status: false, message: 'Internal Server Error' });
        }
      }
    });
  } else if (req.method === 'PUT') {
    jwtAuth(req, res, async (decoded: any) => {
      const { order }: any = req.query;
      const { data } = req.body;

      if (decoded && decoded.role === 'admin') {
        await updateData('orders', order[0], data, (result: boolean) => {
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
  } else if (req.method === 'POST') {
    jwtAuth(req, res, async (decoded: any) => {
      let { data } = req.body;
      data.created_at = new Date();
      data.updated_at = new Date();
      if (decoded) {
        try {
          await addData('orders', data, (status: boolean, result: any) => {
            if (status) {
              return res.status(200).json({ status: true, code: 200, message: 'Success', data: { id: result.id } });
            } else {
              return res.status(400).json({ status: false, code: 400, message: 'Failed to add order' });
            }
          });
        } catch (error) {
          return res.status(500).json({ status: false, message: 'Internal Server Error' });
        }
      } else {
        return res.status(401).json({ status: false, message: 'Unauthorized' });
      }
    });
  }
}
