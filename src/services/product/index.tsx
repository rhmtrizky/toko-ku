import instance from '@/lib/axios/instance';
import headers from '../headers';

const productService = {
  getAllProducts: (token: string) => instance.get('/api/product', headers(token)),
  addProducts: (data: any, token: string) => instance.post('/api/product', { data }, headers(token)),
  updateProduct: (id: string, data: any, token: string) => instance.put(`/api/product/${id}`, { data }, headers(token)),
  deleteProduct: (id: string, token: string) => instance.delete(`/api/product/${id}`, headers(token)),
  // getProfile: (token: string) => instance.get('/api/user/profile', headers(token)),
  // updateProfile: (id: string, data: any, token: string) => instance.put(`/api/user/profile/${id}`, { data }, headers(token)),
};

export default productService;
