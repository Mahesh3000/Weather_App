import React from 'react';
import { motion } from 'framer-motion';
import { CloudOff, RefreshCw } from 'lucide-react';

interface ErrorDisplayProps {
  message: string;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message }) => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-500 to-purple-700 flex items-center justify-center">
      <motion.div 
        className="bg-white bg-opacity-20 backdrop-blur-lg p-8 rounded-3xl max-w-md w-full text-center shadow-lg"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="mx-auto w-24 h-24 rounded-full bg-white bg-opacity-20 flex items-center justify-center mb-6"
          initial={{ rotate: 0 }}
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <CloudOff size={40} className="text-white" />
        </motion.div>
        
        <h2 className="text-2xl font-bold text-white mb-4">Oops!</h2>
        <p className="text-white mb-6">{message}</p>
        
        <button 
          onClick={handleRefresh}
          className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white py-3 px-6 rounded-full flex items-center justify-center gap-2 mx-auto transition-all"
        >
          <RefreshCw size={18} />
          <span>Try Again</span>
        </button>
      </motion.div>
    </div>
  );
};

export default ErrorDisplay;