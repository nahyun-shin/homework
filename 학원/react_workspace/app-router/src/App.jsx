
import { BrowserRouter, Route, Routes } from 'react-router'
import MainPage from './pages/MainPage'
import AboutPage from './pages/AboutPage'
import DashBoard from './pages/DashBoard'
import BoardList from './pages/BoardList'
import GallaryList from './pages/GallaryList'

function App() {
  

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<MainPage/>}/>
          <Route path='/about' element={<AboutPage/>}/>
          <Route path='/dash' element={<DashBoard/>}>
            <Route path='board' element={<BoardList/>}/>
            <Route path='gall' element={<GallaryList/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
