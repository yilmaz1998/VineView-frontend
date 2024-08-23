import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate()
  const username = localStorage.getItem('username') || 'Guest'

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
<div className="text-white mr-4">Welcome, {username}!</div>
<button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">Logout</button>
</nav>
  )
}

export default Header