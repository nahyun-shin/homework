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
    return response.data;
    },


    getBooksByType: async (type) => {
    const response = await api.get('/api/v1/main', { params: { type } });
    return response.data.response;
    },

   getCategoryMenus: async () => {
    const response = await api.get('/api/v1/categories');
    const categories = response.data;

    // 전체보기는 카테고리 메뉴에서만 포함 (중복 방지)
    return [
      { name: '전체보기', path: '/books/all', categoryId: 0 },
      ...categories.map((cat) => ({
        name: cat.categoryName,
        path: `/books/category/${cat.categoryId}`,
        categoryId: cat.categoryId,
      })),
    ];
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
