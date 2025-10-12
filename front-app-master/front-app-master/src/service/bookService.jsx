import api from '../api/axiosApi';

export const bookAPI = {
    getList: async ({ page = 0, size = 6, categoryId, query, sort = 'createDate,asc' }) => {
    const params = new URLSearchParams();
    params.set('page', page);
    params.set('size', size);
    params.set('sort', sort);
    if (categoryId) params.set('categoryId', categoryId);
    if (query) params.set('query', query);

    const response = await api.get(`/api/v1/books?${params.toString()}`);
    return response.data; // 서버가 {response: {content:[], total:xx}} 형태로 리턴한다고 가정
},


    getBooksByType: async (type) => {
  const response = await api.get('/api/v1/main', { params: { type } });
  return response.data.response;
},


    get: async (bookId) => {
        const response = await api.get(`/api/v1/main/${bookId}`);
        return response.data.response;
    },

    create: async (formData) => {
        const response = await api.post(`/api/v1/main`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data.response;
    },

    update: async (formData) => {
        const response = await api.put(`/api/v1/main`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data.response;
    },

    delete: async (bookId) => {
        const response = await api.delete(`/api/v1/main/${bookId}`);
        return response.data.response;
    },

    deleteFile: async (fileId) => {
        const response = await api.delete(`/api/v1/main/file/${fileId}`);
        return response.data.response;
    }
};
