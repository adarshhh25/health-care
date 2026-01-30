import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Symptoms from './pages/Symptoms';
import Hospitals from './pages/Hospitals';
import ImageAnalysis from './pages/ImageAnalysis';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/symptoms" element={<Symptoms />} />
          <Route path="/hospitals" element={<Hospitals />} />
          <Route path="/image-analysis" element={<ImageAnalysis />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App
