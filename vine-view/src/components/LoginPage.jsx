import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const LoginPage = () => {
  const URL = import.meta.env.VITE_API_URL
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const response = await fetch(`${URL}/auth/login`, {
      method: "POST", 
      headers: {
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify({ username, password })
    })


    if (response.ok) {
      const data = await response.json()
      localStorage.setItem('token', data.token)
      localStorage.setItem('username', data.user.username)
      console.log(data.user.username)
      navigate('/favorites')
    } else {
      alert('Login failed')
    }
  }
  return (
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
    className='signup text-center mt-48 text-black bg-gray-50/75 rounded-full' 
    >
      <h1 className='text-4xl mb-4'>Login Page</h1>
      <form onSubmit={handleSubmit} className="mx-auto max-w-lg">
      <div className="form-floating mb-3">
        <input type="text" className="form-control" id="floatingInput" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <label htmlFor="floatingInput">Username</label>
      </div>
      <div className="form-floating">
        <input type="password" className="form-control" id="floatingPassword" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}  />
        <label htmlFor="floatingPassword">Password</label>
      </div>
      <button type="submit" className="btn btn-primary mt-2">Login</button>
       </form>
      <div>
        <p className='mt-2'>If you don't have an account, go to sign up page from the link below.</p>
        <Link class="btn btn-warning mt-2" to='/signup'>Sign up</Link>
      </div>
      </motion.div>
  )
}

export default LoginPage