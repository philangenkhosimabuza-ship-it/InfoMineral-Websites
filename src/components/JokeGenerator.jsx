import { useState } from 'react';
import { motion } from 'framer-motion';
import './JokeGenerator.css';

const JokeGenerator = () => {
  const [joke, setJoke] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [jokeHistory, setJokeHistory] = useState([]);

  const fetchJoke = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://official-joke-api.appspot.com/random_joke');
      if (!response.ok) throw new Error('Failed to fetch joke');
      
      const data = await response.json();
      const newJoke = {
        id: data.id,
        setup: data.setup,
        punchline: data.punchline,
        type: data.type,
        timestamp: new Date().toLocaleTimeString()
      };
      
      setJoke(newJoke);
      setJokeHistory([newJoke, ...jokeHistory.slice(0, 9)]);
    } catch (err) {
      setError('Failed to load joke. Please try again!');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const jokeVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
  };

  return (
    <motion.div 
      className="joke-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="joke-header">
        <h1>😂 Random Joke Generator 😂</h1>
        <p>Get a laugh with a random joke!</p>
      </div>

      <motion.div className="joke-content">
        {joke && (
          <motion.div 
            className="joke-card"
            variants={jokeVariants}
            initial="initial"
            animate="animate"
            key={joke.id}
          >
            <div className="joke-badge">{joke.type}</div>
            <div className="joke-setup">
              <p><strong>Setup:</strong> {joke.setup}</p>
            </div>
            <motion.div 
              className="joke-punchline"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <p><strong>Punchline:</strong> {joke.punchline}</p>
            </motion.div>
            <div className="joke-timestamp">📅 {joke.timestamp}</div>
          </motion.div>
        )}

        {!joke && !loading && (
          <motion.div className="joke-placeholder">
            <p>👇 Click the button to get a joke!</p>
          </motion.div>
        )}

        {error && (
          <motion.div className="joke-error" layout>
            <p>❌ {error}</p>
          </motion.div>
        )}
      </motion.div>

      <motion.button
        className="get-joke-btn"
        onClick={fetchJoke}
        disabled={loading}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {loading ? '⏳ Loading...' : '🎲 Get Random Joke'}
      </motion.button>

      {jokeHistory.length > 0 && (
        <motion.div className="history-section">
          <h3>📜 Joke History (Last 10)</h3>
          <motion.div className="history-list">
            {jokeHistory.map((item, index) => (
              <motion.div
                key={item.id}
                className="history-item"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="history-badge">{item.type}</div>
                <div className="history-text">
                  <p className="history-setup">{item.setup}</p>
                  <p className="history-punchline">{item.punchline}</p>
                </div>
                <span className="history-time">{item.timestamp}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default JokeGenerator;
