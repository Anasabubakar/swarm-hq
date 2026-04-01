import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import OverviewPage from './pages/OverviewPage';
import DepartmentPage from './pages/DepartmentPage';
import LiveFeedPage from './pages/LiveFeedPage';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<OverviewPage />} />
          <Route path="/department/:dept" element={<DepartmentPage />} />
          <Route path="/agent/:id" element={<DepartmentPage />} />
          <Route path="/feed" element={<LiveFeedPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
