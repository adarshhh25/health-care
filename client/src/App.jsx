import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Loader from './components/ui/Loader';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const SymptomChecker = lazy(() => import('./pages/SymptomChecker'));
const HospitalLocator = lazy(() => import('./pages/HospitalLocator'));
const ImageAnalysis = lazy(() => import('./pages/ImageAnalysis'));

// Page loading fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <Loader message="Loading..." size="large" />
  </div>
);

function App() {
  return (
    <Router>
      <Layout>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/symptoms" element={<SymptomChecker />} />
            <Route path="/hospitals" element={<HospitalLocator />} />
            <Route path="/image-analysis" element={<ImageAnalysis />} />
            
            {/* 404 Fallback */}
            <Route 
              path="*" 
              element={
                <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
                  <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
                  <p className="text-xl text-gray-600 mb-6">Page not found</p>
                  <a 
                    href="/" 
                    className="text-[#2B6CB0] font-semibold hover:underline"
                  >
                    ← Back to Home
                  </a>
                </div>
              } 
            />
          </Routes>
        </Suspense>
      </Layout>
    </Router>
  );
}

export default App;
