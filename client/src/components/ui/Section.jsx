import { motion } from 'framer-motion';

// const Section = ({ children, className = "", background = "default" }) => {
//   const bgStyles = {
//     default: "bg-gray-50",
//     white: "bg-white",
//     transparent: "bg-transparent"
//   };

//   return (
//     <section className={`w-full ${bgStyles[background]} ${className}`}>
//       <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
//         {children}
//       </div>
//     </section>
//   );
// };

// export default Section;


const Section = ({ children, className = "", background = "default" }) => {
  const bgStyles = {
    default: "bg-gray-50",
    white: "bg-white",
    transparent: "bg-transparent"
  };

  return (
    <section className={`w-full ${bgStyles[background]} ${className}`}>
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
};

export default Section;

