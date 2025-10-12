import axios from 'axios';
import { authStore } from '../store/authStore';

const api = axios.create({
    headers :{
        'Content-Type': 'application/json'
    }
})

//리퀘스트 전에 인증토큰 있으면 헤더에 추가
api.interceptors.request.use(
    (config)=> {
        
        //zustand 를 호출할 때
        //컴포넌트가 아닌 곳에서는 getState() 함수를 통해서 가져와함 
        const token = authStore.getState().token;

        if(token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }
);

// ✅ 응답 인터셉터: 401 발생 시 refresh 시도
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = authStore.getState().refreshToken;

        // ✅ refresh API 호출 (서버에 맞게 URL 수정)
        const res = await axios.post('/auth/refresh', {
          refreshToken,
        });

        const newAccessToken = res.data.accessToken;

        // ✅ 상태 업데이트
        authStore.getState().setToken(newAccessToken);

        // ✅ 요청 헤더에 새 토큰 설정
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return api(originalRequest); // 재요청
      } catch (refreshError) {
        console.error('🔴 토큰 재발급 실패', refreshError);
        // 로그아웃 처리 등 추가 가능
        authStore.getState().logout?.(); // optional chaining
      }
    }

    return Promise.reject(error);
  }
);


export default api;