import React from 'react'

const ShowFavorites = ({ wine }) => {
    return (
        <div className="flex justify-center items-center bg-white text-black">
            {wine ? (
        <div>
            <h1><span className='font-bold'>Winery: </span>{wine.winery}</h1>
            <h2><span className='font-bold'>Wine: </span>{wine.wine}</h2>
            <img src={wine.image}></img>
            <p><span className='font-bold'>Location: </span>{wine.location}</p>
            </div>
      ) : (
        <div>Wine not found</div>
      )}
    </div>
    )
}

export default ShowFavorites

