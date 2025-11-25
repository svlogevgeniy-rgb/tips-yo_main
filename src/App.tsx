import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { EmployeeSelection } from './pages/EmployeeSelection'
import { PaymentPage } from './pages/PaymentPage'
import TypographyPage from './pages/TypographyPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/employees" element={<EmployeeSelection />} />
        <Route path="/employee/:id" element={<PaymentPage />} />
        <Route path="/ui/typography" element={<TypographyPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
