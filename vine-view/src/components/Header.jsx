import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate()
  const username = localStorage.getItem('username') || 'Guest'
  const token = localStorage.getItem('token')

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    navigate('/login')
    console.log('Logged out')
  }
  return (
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <Link className="navbar-brand ml-2" to={'/'}>VineView</Link>
    <Link className="navbar-brand ml-4" to={'/favorites'}>My Favorites</Link>
    <div class="dropdown mx-auto p-2">
  <a class="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
    Wine Types
  </a>
  <ul class="dropdown-menu">
    <li><Link class="dropdown-item" to={"/red"}>Red Wines</Link></li>
    <li><Link class="dropdown-item" to={"/white"}>White Wines</Link></li>
    <li><Link class="dropdown-item" to={"/rose"}>Rose Wines</Link></li>
    <li><Link class="dropdown-item" to={"/sparkling"}>Sparkling Wines</Link></li>
    <li><Link class="dropdown-item" to={"/dessert"}>Dessert Wines</Link></li>
    <li><Link class="dropdown-item" to={"/port"}>Port Wines</Link></li>
  </ul>
</div>
{token ? (
  <div className='flex'>
  <div className="text-white mr-4 mt-1">Welcome, {username}!</div>
<button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded">Logout</button>
</div>
) : (
  <div className='flex'>
  <div className="text-white mr-4 mt-1">Welcome, {username}!</div>
  <Link to={'/login'} className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded">Login</Link>
  </div>
)}

</nav>
  )
}

export default Header