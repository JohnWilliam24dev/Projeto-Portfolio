import { Routes, Route } from 'react-router-dom';
import HomePage from './components/home/HomePage';
import FormWizardPage from './components/form/FormWizardPage';
import TermsPage from './components/terms/TermsPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/comissao" element={<FormWizardPage />} />
      <Route path="/termos" element={<TermsPage />} />
    </Routes>
  );
}
