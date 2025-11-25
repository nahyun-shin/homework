import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server :{
    open : true,
    port:4000,
    proxy :{
      '/api':{
        target :'http://222.239.249.197:8080/api',//접속할 백앤드 서버 기본주소
        changeOrigin : true, //front-end, back-end 서버 도메인이 다를 경우 cors문제 발생 해결
        rewrite : (path)=>path.replace(/^\/api/,''),//앞에 api 경로 없애기.
      }
    }
  }
})
