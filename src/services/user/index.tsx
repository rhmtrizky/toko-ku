import instance from '@/lib/axios/instance';
import headers from '../headers';

const userService = {
  getAllUsers: (token: string) => instance.get('/api/user', headers(token)),
  updateUser: (id: string, data: any, token: string) => instance.put(`/api/user/${id}`, { data }, headers(token)),
  deleteUser: (id: string, token: string) => instance.delete(`/api/user/${id}`, headers(token)),
  getProfile: (token: string) => instance.get('/api/user/profile', headers(token)),
  updateProfile: (id: string, data: any, token: string) => instance.put(`/api/user/profile/${id}`, { data }, headers(token)),
  getCart: (token: string) => instance.get(`/api/user/cart`, headers(token)),
  addToCart: (data: any, token: string) => instance.put('/api/user/cart', { data }, headers(token)),
};

export default userService;
