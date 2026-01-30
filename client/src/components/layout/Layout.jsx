// // import { motion } from 'framer-motion';
// // import Header from './Header';
// // import Footer from './Footer';

// // const Layout = ({ children }) => {
// //   return (
// //     <div className="min-h-screen flex flex-col gap-16 bg-[#F7FAFC] w-full overflow-x-hidden">
// //       {/* Skip Link for Accessibility */}
// //       <a
// //         href="#main-content"
// //         className="skip-link sr-only focus:not-sr-only"
// //       >
// //         Skip to main content
// //       </a>

// //       <Header />

// //       <main
// //         id="main-content"
// //         className="flex-grow w-full"
// //       >
// //         <motion.div
// //           initial={{ opacity: 0 }}
// //           animate={{ opacity: 1 }}
// //           transition={{ duration: 0.3 }}
// //           className="w-full h-full"
// //         >
// //           {children}
// //         </motion.div>
// //       </main>

// //       <Footer />
// //     </div>
// //   );
// // };

// // export default Layout;


// import Header from './Header';
// import Footer from './Footer';

// const Layout = ({ children }) => {
//   return (
//     <div className="min-h-screen w-full overflow-x-hidden bg-gray-50">
//       <Header />
//       <main className="pt-20 w-full">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
//           {children}
//         </div>
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default Layout;


import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gray-50">
      <Header />

      {/* Only spacing here — NO centering container */}
      <main className="pt-20 w-full">
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default Layout;

