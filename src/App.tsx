import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { QRMockup } from './pages/QRMockup'
import { EmployeeSelectionNew } from './pages/EmployeeSelectionNew'
import { EmployeeTipForm } from './pages/EmployeeTipForm'
import { PaymentCardPage } from './pages/PaymentCardPage'
import { ThreeDSPage } from './pages/ThreeDSPage'
import { ThankYouPage } from './pages/ThankYouPage'
import TypographyPage from './pages/TypographyPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/qr-mockup" element={<QRMockup />} />
        <Route path="/employees" element={<EmployeeSelectionNew />} />
        <Route path="/employee/:id" element={<EmployeeTipForm />} />
        <Route path="/payment" element={<PaymentCardPage />} />
        <Route path="/payment/3ds" element={<ThreeDSPage />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
        <Route path="/ui/typography" element={<TypographyPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
