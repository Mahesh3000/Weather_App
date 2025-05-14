import React from 'react';
import { motion } from 'framer-motion';
import { CloudRain } from 'lucide-react';

const Loader: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
      <motion.div 
        className="flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 2 
          }}
        >
          <CloudRain size={80} className="text-white" />
        </motion.div>
        <motion.h1 
          className="text-white text-2xl mt-6 font-semibold"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ 
            repeat: Infinity, 
            duration: 1.5 
          }}
        >
          Loading Weather Data...
        </motion.h1>
      </motion.div>
    </div>
  );
};

export default Loader;