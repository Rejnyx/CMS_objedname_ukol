import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { theme } from './theme.ts';
import GlobalStyle from './GlobalStyle.ts';
import DashboardLayout from './components/layout/DashboardLayout.tsx';
import CategoryManagement from './components/CategoryManagement/CategoryManagement.tsx';
import StaffMenuView from './components/StaffMenuView/StaffMenuView.tsx';
import './App.css';

// Placeholder components for other routes
const Placeholder = ({ title }: { title: string }) => <h1 style={{ color: theme.colors.text.primary }}>{title}</h1>;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <DashboardLayout>
          <Routes>
            <Route path="/" element={<Placeholder title="Nástěnka" />} />
            <Route path="/orders" element={<Placeholder title="Objednávky" />} />
            <Route path="/messages" element={<Placeholder title="Zprávy" />} />
            <Route path="/calendar" element={<Placeholder title="Kalendář" />} />
            <Route path="/menu" element={<CategoryManagement />} />
            <Route path="/menu-prehled" element={<StaffMenuView />} />
            <Route path="/inventory" element={<Placeholder title="Sklad" />} />
            <Route path="/reviews" element={<Placeholder title="Recenze" />} />
          </Routes>
        </DashboardLayout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
