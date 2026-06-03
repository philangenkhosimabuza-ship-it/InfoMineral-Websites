import { motion } from 'framer-motion';

const SlideInComponent = () => {
  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
      style={{
        padding: '20px',
        background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        color: 'white',
        borderRadius: '8px',
        textAlign: 'center'
      }}
    >
      🚀 I slide in from the left
    </motion.div>
  );
};

export default SlideInComponent;
