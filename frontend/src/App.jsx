import LandingPage from './components/landing/LandingPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import About from './pages/About'


function App() {

  return ( <><LandingPage /><BrowserRouter>
    <Routes>
      <Route path='/abput' element={<About/>}/>
    </Routes>
  </BrowserRouter></>
  )
}

export default App
