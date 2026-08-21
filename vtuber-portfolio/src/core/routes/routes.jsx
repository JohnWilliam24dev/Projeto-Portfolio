import { Routes, Route } from 'react-router-dom';
import HomePage from '../../features/home/pages/HomePage';
import CommissionRequestPage from '../../features/commission-request/pages/CommissionRequestPage';
import TermsPage from '../../features/terms/pages/TermsPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/comissao" element={<CommissionRequestPage />} />
      <Route path="/termos" element={<TermsPage />} />
    </Routes>
  );
}
