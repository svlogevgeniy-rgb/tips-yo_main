import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { EmployeeSelection } from './pages/EmployeeSelection'
import { EmployeeQRPage } from './pages/EmployeeQRPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/employees" element={<EmployeeSelection />} />
        <Route path="/employee/:id" element={<EmployeeQRPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
