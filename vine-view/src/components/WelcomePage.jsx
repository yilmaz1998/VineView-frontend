import React from 'react'
import { motion } from 'framer-motion'

const WelcomePage = () => {
  return (
    <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 0.8 }}
    transition={{ duration: 1.2 }}
    exit={{x: "-100vw", opacity: 0.5 }}
    className='welcome flex items-center justify-center min-h-screen'>
      <div className='text'>
        <h1 className='text-4xl font-bold mb-2'>Welcome to VineView!</h1>
        <p>
          Discover the world of wines with VineView, your ultimate guide to exploring and enjoying the finest wines from around the globe. 
          Whether you're a seasoned wine enthusiast or just beginning your journey, we have something for everyone.
        </p>
      </div>
    </motion.div>
  )
}

export default WelcomePage 