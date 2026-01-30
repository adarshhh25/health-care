import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Layout from './components/layout/Layout';
import Loader from './components/ui/Loader';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const SymptomChecker = lazy(() => import('./pages/SymptomChecker'));
const HospitalLocator = lazy(() => import('./pages/HospitalLocator'));
const ImageAnalysis = lazy(() => import('./pages/ImageAnalysis'));

// Page loading fallback
const PageLoader = () => {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader message={t('common.loading')} size="large" />
    </div>
  );
};

function App() {
  const { t } = useTranslation();

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
                  <p className="text-xl text-gray-600 mb-6">{t('common.page_not_found')}</p>
                  <a
                    href="/"
                    className="text-[#2B6CB0] font-semibold hover:underline"
                  >
                    ← {t('common.back_home')}
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
