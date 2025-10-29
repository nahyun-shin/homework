// 환경별 API URL 설정
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:9090';

// 기타 설정
export const IS_DEV = import.meta.env.DEV;
export const IS_PROD = import.meta.env.PROD;
