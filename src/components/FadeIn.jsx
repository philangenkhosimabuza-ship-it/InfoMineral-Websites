import { motion } from 'framer-motion';

const FadeInComponent = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      style={{
        padding: '20px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        borderRadius: '8px',
        textAlign: 'center'
      }}
    >
      ✨ I fade in smoothly
    </motion.div>
  );
};

export default FadeInComponent;
