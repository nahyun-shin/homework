import { Navigate } from 'react-router';
import { authStore } from '../store/authStore';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = authStore();

  // ✅ Vite 환경에서는 import.meta.env.MODE 사용
  const isDev = import.meta.env.MODE === 'development';

  // 개발 환경에서는 인증 없이 통과
  if (isDev) {
    return children;
  }

  // 운영 환경에서는 인증 체크
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
