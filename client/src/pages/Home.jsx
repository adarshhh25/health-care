import Hero from '../components/home/Hero';
import Features from '../components/home/Features';
import HowItWorks from '../components/home/HowItWorks';

// const Home = () => {
//   return (
//     <div className="flex flex-col pb-16 sm:pb-24 gap-16 sm:gap-20">
//       <Hero />
//       <Features />
//       <HowItWorks />
//     </div>
//   );
// };


const Home = () => {
  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      <Hero />
      <Features />
      <HowItWorks />
    </div>
  );
};

// export default Home;


export default Home;
