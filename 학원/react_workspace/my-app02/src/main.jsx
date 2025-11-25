import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Hello from './pages/Hello.jsx'
import Exam01 from './pages/Exam01.jsx'
import Exam02 from './pages/Exam02.jsx'
import InputExam01 from './pages/InputExam01.jsx'
import Exam02me from './pages/Exam02me.jsx'

createRoot(document.getElementById('root')).render(
     /*자바스크립트주석으로 사용 */
  <>
      <Exam02me/>
  </>
)
