import React from 'react'

const ShowFavorites = ({ wine }) => {
    return (
        <div>
            {wine ? (
        <div>
            <h1>{wine.winery}</h1>
            <h2>{wine.wine}</h2>
            <img src={wine.image}></img>
            <p>{wine.location}</p>
            </div>
      ) : (
        <div>Wine not found</div>
      )}
    </div>
    )
}

export default ShowFavorites

