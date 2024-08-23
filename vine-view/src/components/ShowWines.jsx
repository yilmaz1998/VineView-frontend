import React, { useState, useEffect } from 'react'

const ShowWines = ({ wines }) => {
  return (
    <div>
      {wines ? (
        <div>
              <h1>{wines.winery}</h1>
              <h1>{wines.wine}</h1>
              <img src={wines.image} />
              <h1>{wines.location}</h1>
        </div>
      ) : (
        <div>Wine not found</div>
      )}
    </div>
  );
};

export default ShowWines;
