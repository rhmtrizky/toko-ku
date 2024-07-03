import instance from '@/lib/axios/instance';
import headers from '../headers';

const orderService = {
  getAllOrders: (token: string) => instance.get('/api/order', headers(token)),
  addOrder: (data: any, token: string) => instance.post('/api/order', { data }, headers(token)),
  updateOrder: (id: string, data: any, token: string) => instance.put(`/api/order/${id}`, { data }, headers(token)),
  getDetailOrder: (id: string, token: string) => instance.get(`/api/order/${id}`, headers(token)),
  //   deleteProduct: (id: string, token: string) => instance.delete(`/api/product/${id}`, headers(token)),
  // getProfile: (token: string) => instance.get('/api/user/profile', headers(token)),
  // updateProfile: (id: string, data: any, token: string) => instance.put(`/api/user/profile/${id}`, { data }, headers(token)),
};

export default orderService;
