import React from 'react'

const ShowWines = ({ wines }) => {
  return (
    <div className='bg-white text-black'>
      {wines ? (
        <div>
              <h1><span className='font-bold'>Winery: </span>{wines.winery}</h1>
              <h1><span className='font-bold'>Wine: </span>{wines.wine}</h1>
              <img src={wines.image} className='bg-white' />
              <h1 className='mt-1'><span className='font-bold'>Location: </span>{wines.location}</h1>
        </div>
      ) : (
        <div>Wine not found</div>
      )}
    </div>
  )
}

export default ShowWines
