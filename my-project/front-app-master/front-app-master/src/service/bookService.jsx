import api from '../api/axiosApi';

export const bookAPI = {
    //메인페이지 북리스트
    getBooksByType: async (type) => {
    const response = await api.get('/api/v1/main', { params: { type } });
    return response.data.response;
    },

    //메뉴카테고리 리스트
    getCategoryMenus: async (includeAll = false) => {
        const response = await api.get('/api/v1/categories');
        const categories = response.data; // response 구조에 따라 수정 (data.response면 그대로)
        
        // includeAll === true면 '전체보기' 메뉴 추가
        if (includeAll) {
            return [
                { name: '전체보기', path: '/books/all', categoryId: 0 },
                ...categories.map(cat => ({
                    name: cat.categoryName,
                    path: `/books/category/${cat.categoryId}`,
                    categoryId: cat.categoryId,
                })),
            ];
        }

        // includeAll === false면 그대로 반환
        return categories.map(cat => ({
            name: cat.categoryName,
            path: `/books/category/${cat.categoryId}`,
            categoryId: cat.categoryId,
        }));
    },

    //카테고리메뉴 북리스트
    getList: async ({
    page = 0,
    size = 8,
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

    //베스트 - 일간
    getBestDayList: async ({
        page = 0,
        size = 8,
        sort = 'salesCount,desc' 
    }) => {
    const params = new URLSearchParams();
    params.set('page', page);
    params.set('size', size);
    params.set('sort', sort);

    const response = await api.get(`/api/v1/best/day?${params.toString()}`);
    return response.data;
  },
  //베스트 주간
    getBestWeekList: async ({
        page = 0,
        size = 8,
        sort = 'salesCount,desc' 
    }) => {
    const params = new URLSearchParams();
    params.set('page', page);
    params.set('size', size);
    params.set('sort', sort);

    const response = await api.get(`/api/v1/best/week?${params.toString()}`);
    return response.data;
  },
  //베스트 월간
    getBestMonthList: async ({
        page = 0,
        size = 8,
        sort = 'salesCount,desc' 
    }) => {
    const params = new URLSearchParams();
    params.set('page', page);
    params.set('size', size);
    params.set('sort', sort);

    const response = await api.get(`/api/v1/best/month?${params.toString()}`);
    return response.data;
  },

    //신상품 리스트
    getNewList:async({
        period = 'daily',
        page = 0,
        size = 8,
        sort = 'createDate,desc'
    }) =>{
        const params = new URLSearchParams();
        params.set('period', period);
        params.set('page', page);
        params.set('size', size);
        params.set('sort', sort);

        const response = await api.get(`/api/v1/new?${params.toString()}`);
        return response.data;
    },

    //디테일 페이지 정보
    getBook: async (bookId) => {
        const response = await api.get(`/api/v1/books/${bookId}`);
        return response.data;
    },







    getAdminBook: async (bookId) => {
        const response = await api.get(`/api/v1/admin/books/${bookId}`);
        return response.data;
    },

    getAdminBookList: async ({
    page = 0,
    size = 8,
    categoryId,
    query,
    sort = 'createDate,desc'
    } = {}) => {
        const params = new URLSearchParams();

        params.set('page', page);
        params.set('size', size);
        params.set('sort', sort);

        if (categoryId) params.set('categoryId', categoryId);
        if (query) params.set('query', query);

        const response = await api.get(`/api/v1/admin/books?${params.toString()}`);
        return response.data;
    },

    createBook: async (formData) => {
        const response = await api.post(`/api/v1/admin/books`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    updateBook: async (formData) => {
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


