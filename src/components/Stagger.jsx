import { motion } from 'framer-motion';

const StaggerComponent = () => {
  const items = ['🎨 Design', '⚡ Speed', '🎭 Animation'];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {items.map((item, index) => (
        <motion.div key={index} variants={itemVariants}>
          <p style={{ margin: '8px 0' }}>{item}</p>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default StaggerComponent;
