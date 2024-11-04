import React, {useState, useEffect} from 'react'
import ShowWines from '../components/ShowWines'
import NewReview from '../components/NewReview'
import { motion } from 'framer-motion'


const Port = () => {
  const URL = import.meta.env.VITE_API_URL 
  const [wine, setWine] = useState()
  const [selectedWine, setSelectedWine] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {      
    const userToken = localStorage.getItem("token")
    setIsLoggedIn(userToken)

    fetch(`${URL}/wine/port`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((res) => {
      if(res.ok) {
        return res.json()
      } else {
        throw new Error ('Failed to fetch')
      }
    })
    .then((data) => {
      console.log('Fetched data:', data)
      setWine(data)
    })
    .catch((error) => console.error('Error fetching data:', error))
  }, [])

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
    transition={{ duration: 2 }}>
      <div className='text-center mb-3'>
    <h1 className='text-3xl'>Port Wines</h1>
     <input 
      type="text" 
      placeholder="Search by wine" 
      value={searchQuery} 
      onChange={(e) => setSearchQuery(e.target.value)} 
      className='form-control'
      /></div>
    <div className='flex'>
    <div
    className='scroll w-1/2 h-screen overflow-y-scroll border-1 border-black'>
      {Array.isArray(filteredWines) && filteredWines.length > 0 ? (
        filteredWines.map((wines) => (
          <div>
            <div 
              key={wines._id} 
              className={`wine mb-1 text-center border-1 border-black text-black ${
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
        <p>Loading...</p>
      )}
    </div>
    <div className='otherside w-1/2'>
    {selectedWine && <ShowWines wines={selectedWine} />}
    {error && <p className='mt-2 bg-white font-bold text-red-500'>{error}</p>}
    {selectedWine && <button onClick={handleFavorite} class="mt-2 btn btn-success">Add to Favorites</button> }
    {selectedWine && <NewReview wineId={selectedWine._id} selectedWine={selectedWine} />}
    </div>
    </div>
    </motion.div>
  )
}

export default Port