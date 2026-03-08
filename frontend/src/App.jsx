import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import AppArchitect from './pages/AppArchitect';
import AuthModal from './components/modals/AuthModal';
import SettingsModal from './components/modals/SettingsModal';
import VoiceHelpModal from './components/modals/VoiceHelpModal';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public facing static pages */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
        </Route>

        {/* Dynamic application wrapper */}
        <Route path="/architect" element={<AppArchitect />} />
      </Routes>

      {/* Global Modals */}
      <AuthModal />
      <SettingsModal />
      <VoiceHelpModal />
    </Router>
  );
}

export default App;
