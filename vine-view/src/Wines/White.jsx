import React, { useState, useEffect } from 'react'
import ShowWines from '../components/ShowWines'
import NewReview from '../components/NewReview'

const White = () => {
  const [wine, setWine] = useState()
  const [selectedWine, setSelectedWine] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')


  useEffect(() => {

    const userToken = localStorage.getItem("token")
    setIsLoggedIn(userToken)

    fetch('http://localhost:3000/wine/white', {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        } else {
          throw new Error('Failed to fetch')
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

    fetch("http://localhost:3000/favorite/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token")
      },
      body: JSON.stringify({ wineId: selectedWine._id })
    })
    .then((res) => {
      if(!res.ok) {
        setError('Drink is already in favorites')
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
    <div>
    <h1 className='text-4xl text-center mb-2'>White Wines</h1>
    <div className='flex'>
    <div className='w-1/2 h-screen overflow-y-scroll'>
    <input 
      type="text" 
      placeholder="Search by wine" 
      value={searchQuery} 
      onChange={(e) => setSearchQuery(e.target.value)} 
      className='form-control'
      />
      {Array.isArray(filteredWines) && filteredWines.length > 0 ? (
        filteredWines.map((wines) => (
          <div className='mt-2 border-1 border-black text-center'>
            <div 
              key={wines._id} 
              className='mt-2' 
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
    <div className='w-1/2'>
    {selectedWine && <ShowWines wines={selectedWine} />}
    {selectedWine && <button onClick={handleFavorite} class="btn btn-success">Add to Favorites</button> }
    {error && <p className='mt-2 font-bold text-red-500'>{error}</p>}
    {selectedWine && <NewReview wineId={selectedWine._id} selectedWine={selectedWine} />}
    </div>
    </div>
    </div>
  )
}

export default White