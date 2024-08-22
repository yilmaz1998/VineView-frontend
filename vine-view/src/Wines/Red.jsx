import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'

const Red = () => {
  const [wine, setWine] = useState()


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
  return (
    <div>
      {Array.isArray(wine) && wine.length > 0 ? (
        wine.map((wines) => (
          <div key={wines.id} className='mt-2'>
            <Link to={`/red/${wines._id}`} className='text-decoration-none'>
              <h1>{wines.winery}</h1>
              <h1>{wines.wine}</h1>
            </Link>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default Red