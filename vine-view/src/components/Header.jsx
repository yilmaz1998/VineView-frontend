import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GiHamburgerMenu } from "react-icons/gi";


const Header = ({searchQuery , setSearchQuery}) => {
  const navigate = useNavigate();
  const username = localStorage.getItem('username') || 'Guest';
  const token = localStorage.getItem('token');

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    navigate('/login')
    setSidebarOpen(false)
    console.log('Logged out')
  }

  const wineTypes = ['red', 'white', 'rose', 'sparkling', 'dessert', 'port']

  return (
    <>
      <nav className="fixed top-0 left-0 w-full bg-gray-900 text-white shadow-md z-50 flex items-center justify-between px-4 h-16">
        <Link to="/" className="text-2xl font-bold">VineView</Link>

        <input 
        type="text" 
        placeholder="Search by wine" 
        value={searchQuery} 
        onChange={(e) => setSearchQuery(e.target.value)} 
        className='form-control w-1/2'
      />

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-white font-bold focus:outline-none"
        >
          <GiHamburgerMenu className='text-2xl'/>
        </button>
      </nav>
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } transition-transform duration-300 z-40`}
      >
        <div className="mt-24 flex flex-col px-4 space-y-2">
          <Link
            to="/favorites"
            onClick={() => setSidebarOpen(false)}
            className="px-4 py-2 hover:bg-gray-700 rounded"
          >
            My Favorites
          </Link>

          <div>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-full text-left px-4 py-2 hover:bg-gray-700 rounded"
            >
              Wine Types
            </button>
            {dropdownOpen && (
              <div className="ml-4 mt-1 space-y-1">
                {wineTypes.map(type => (
                  <Link
                    key={type}
                    to={`/${type}`}
                    onClick={() => setSidebarOpen(false)}
                    className="block px-4 py-2 hover:bg-gray-700 rounded"
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)} Wines
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="mt-4 border-t border-gray-700 pt-2">
            <span className="block px-4 py-2">Welcome, {username}!</span>
            {token ? (
              <button
                onClick={handleLogout}
                className="w-full bg-red-600 hover:bg-red-700 px-4 py-2 rounded mt-1"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setSidebarOpen(false)}
                className="block bg-green-600 hover:bg-green-700 px-4 py-2 rounded mt-1"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>

      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
        ></div>
      )}
    </>
  )
}

export default Header