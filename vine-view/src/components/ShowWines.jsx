import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const ShowWines = () => {
  const { type, id } = useParams()
  const [wine, setWine] = useState(null)

  useEffect(() => {
    fetch(`http://localhost:3000/wine/${type}/${id}`, {
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
      setWine(data)
    })
    .catch((error) => console.error('Error fetching data:', error))
  }, [type, id])

  return (
    <div>
      {wine ? (
        <div>
              <h1>{wine.winery}</h1>
              <h1>{wine.wine}</h1>
              <img src={wine.image} />
              <h1>{wine.location}</h1>
        </div>
      ) : (
        <div>Wine not found</div>
      )}
    </div>
  );
};

export default ShowWines;
