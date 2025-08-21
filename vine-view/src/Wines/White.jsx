import React, { useState, useEffect } from 'react'
import ShowWines from '../components/ShowWines'
import NewReview from '../components/NewReview'
import { motion } from 'framer-motion'
import InfiniteScroll from 'react-infinite-scroll-component'

const White = ({searchQuery}) => {
  const URL = import.meta.env.VITE_API_URL
  const [wine, setWine] = useState([])
  const [selectedWine, setSelectedWine] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const limit = 20


  useEffect(() => {
    const userToken = localStorage.getItem("token")
    setIsLoggedIn(userToken)
  
    fetchWines()
  }, [])
  
  const fetchWines = async () => {
    try {
      const res = await fetch(`${URL}/wine/white?page=${page}&limit=${limit}`, {
        headers: { 'Content-Type': 'application/json' }
      })
      if (!res.ok) throw new Error('Failed to fetch')
      const data = await res.json()
      setWine(prev => [...prev, ...data.wines])
      setTotalPages(data.totalPages)
      setPage(prev => prev + 1)
    } catch (err) {
      console.error('Error fetching data:', err)
      setError('Failed to fetch wines')
    }
  }

  const handleWineClick = (wines) => {
    setSelectedWine(wines)
    setError(null)
  }

  const handleFavorite = (e) => {
    e.preventDefault()
    if (!isLoggedIn) {
      setError('Please log in')
      return
    }

    fetch(`${URL}/favorite/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token")
      },
      body: JSON.stringify({ wineId: selectedWine._id })
    })
    .then((res) => {
      if(!res.ok) {
        setError('Wine is already in favorites')
        throw new Error("Failed to add to favorites")
      }else {
        res.json()
        setError('Added to favorites')
      }
    })
    .catch((error) => console.error('Error adding to favorites:', error))
  }


  const filteredWines = Array.isArray(wine) ? wine.filter(e => 
    e.wine.toLowerCase().includes(searchQuery.toLowerCase())
  ) : []

  return (
    <motion.div
    initial={{ opacity:0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 2 }}
    className="flex">
       <div className='w-1/2'>
          <InfiniteScroll
        dataLength={wine ? wine.length : 0}
        next={fetchWines}
        hasMore={page <= totalPages}
        loader={<h4 className="text-center mt-2">Loading...</h4>}
        height={window.innerHeight - 64}
        className='scroll overflow-y-scroll border border-black'
      >
        <h1 className='text-3xl text-center'>White Wines</h1>
        {filteredWines.length > 0 ? (
          filteredWines.map((wines) => (
            <div key={wines._id} className="mb-1">
              <div 
                className={`wine text-center border-1 border-black text-black ${
                  selectedWine && selectedWine._id === wines._id ? 'bg-blue-300' : 'bg-white'
                }`}
                style={{ cursor: 'pointer' }} 
                onClick={() => handleWineClick(wines)}
              >
                <h1>{wines.winery}</h1>
                <h1>{wines.wine}</h1>
              </div>
            </div>
          ))
        ) : (
          <p className='text-center mt-2'>No wines found.</p>
        )}
      </InfiniteScroll>
      </div>
    <div className='otherside w-1/2 h-[calc(100vh-4rem)] overflow-y-auto'>
    {selectedWine && <ShowWines wines={selectedWine} />}
    {error && <p className='mt-2 bg-white font-bold text-red-500'>{error}</p>}
    {selectedWine && <button onClick={handleFavorite} class="mt-2 btn btn-success">Add to Favorites</button> }
    {selectedWine && <NewReview wineId={selectedWine._id} selectedWine={selectedWine} />}
    </div>
    </motion.div>
  )
}

export default White