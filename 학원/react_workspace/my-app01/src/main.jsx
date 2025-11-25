import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  /** StrictMode는 문법을 맨 처음 미리 한 번 검사해서
   * 문법오류를 잡아내고 입력되고 나서도 다시한번실행된다.*/
  
    <App />
  
)
