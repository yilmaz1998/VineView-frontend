import React, {useState, useEffect} from 'react'
import ShowWines from '../components/ShowWines'
import NewReview from '../components/NewReview'

const Sparkling = () => {
  const URL = import.meta.env.VITE_API_URL
  const [wine, setWine] = useState()
  const [selectedWine, setSelectedWine] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')


  useEffect(() => {

    const userToken = localStorage.getItem("token")
    setIsLoggedIn(userToken)

    fetch(`${URL}/wine/sparkling`, {
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
    <div>
      <div className='text-center mb-3'>
    <h1 className='text-3xl'>Sparkling Wines</h1>
     <input 
      type="text" 
      placeholder="Search by wine" 
      value={searchQuery} 
      onChange={(e) => setSearchQuery(e.target.value)} 
      className='form-control'
      /></div>
    <div className='flex'>
    <div className='w-1/2 h-screen overflow-y-scroll'>
      {Array.isArray(filteredWines) && filteredWines.length > 0 ? (
        filteredWines.map((wines) => (
          <div>
            <div 
              key={wines._id} 
              className='mb-2 text-center border-1 border-black bg-white bg-opacity-75 text-black' 
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
    {selectedWine && <button onClick={handleFavorite} class="mt-2 btn btn-success">Add to Favorites</button> }
    {error && <p className='mt-2 font-bold text-red-500'>{error}</p>}
    {selectedWine && <NewReview wineId={selectedWine._id} selectedWine={selectedWine} />}
    </div>
    </div>
    </div>
  )
}

export default Sparkling