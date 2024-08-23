import React, {useState, useEffect} from 'react'
import ShowWines from '../components/ShowWines'

const Red = () => {
  const [wine, setWine] = useState()
  const [selectedWine, setSelectedWine] = useState(null)


  useEffect(() => {
    fetch('http://localhost:3000/wine/red', {
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
  }

  return (
    <div className='flex'>
    <div className='w-1/2 h-screen overflow-y-scroll'>
      {Array.isArray(wine) && wine.length > 0 ? (
        wine.map((wines) => (
          <div className='mt-2'>
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
    </div>
    </div>
  )
}

export default Red