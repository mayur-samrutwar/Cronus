import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import FeaturedCampaignCard from './FeaturedCampaignCard';

const FeaturedCampaigns = ({ campaigns }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === campaigns.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? campaigns.length - 1 : prev - 1));
  };

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <h2 className="text-lg font-medium text-gray-800">Featured Campaigns</h2>
          <AnimatePresence mode="wait">
            <motion.span
              key={currentSlide}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="ml-4 text-sm text-gray-400 font-thin"
            >
              {currentSlide + 1}/{campaigns.length}
            </motion.span>
          </AnimatePresence>
        </div>
        <div className="flex space-x-2">
          <button onClick={prevSlide} className="p-2 rounded-full border border-gray-200 hover:bg-gray-100">
            <ChevronLeft size={20} />
          </button>
          <button onClick={nextSlide} className="p-2 rounded-full border border-gray-200 hover:bg-gray-100">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      <div className="mb-8 bg-white">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ duration: 0.5 }}
          >
            <FeaturedCampaignCard campaign={campaigns[currentSlide]} />
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
};

export default FeaturedCampaigns;