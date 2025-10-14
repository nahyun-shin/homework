import api from '../api/axiosApi';

export const bookAPI = {
    getList: async ({
    page = 0,
    size = 6,
    categoryId,
    query,
    sort = 'createDate,desc',
    type,         // best, new, 등
    dateRange     // week, month 등
    } = {}) => {
        const params = new URLSearchParams();

        params.set('page', page);
        params.set('size', size);
        params.set('sort', sort);

        if (categoryId) params.set('categoryId', categoryId);
        if (query) params.set('query', query);
        if (type) params.set('type', type);          // 예: best, new
        if (dateRange) params.set('range', dateRange); // 예: week, month

        const response = await api.get(`/api/v1/books?${params.toString()}`);
        return response.data;
    },
    getBestList: async ({
        page = 0,
        size = 6,
        sort = 'salesCount,desc' 
    }) => {
    const params = new URLSearchParams();
    params.set('page', page);
    params.set('size', size);
    params.set('sort', sort);

    const response = await api.get(`/api/v1/best?${params.toString()}`);
    return response.data;
  },


    getBooksByType: async (type) => {
    const response = await api.get('/api/v1/main', { params: { type } });
    return response.data.response;
    },

    getCategoryMenus: async () => {
        const response = await api.get('/api/v1/categories');
        const categories = response.data;

    
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
