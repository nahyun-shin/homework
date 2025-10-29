import { useState } from 'react'
import QuillEditor from './components/QuillEditor'

function App() {
  const [content, setContent] = useState('');
  const token ='aa';

  const showContents = () =>{
    console.log(content);
  }

  return (
    <>
    <div>
       <button onClick={showContents}>보기</button>
    </div>
    <div>
       <QuillEditor
                  value={content}
                  onChange={setContent}
                  authToken={token}
                  uploadUrl="/api/v1/book/ed/img"
                  fileField="img"       // 서버가 요구하는 파일 파트명 (중요)\
                  width={400}
                  height={400}
                  placeholder="도서 내용을 입력하세요..."
                />
      </div>
    </>
  )
}

export default App
