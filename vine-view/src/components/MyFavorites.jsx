import React, { useEffect, useState } from 'react'
import ShowFavorites from './ShowFavorites'

const MyFavorites = () => {
    const [favorites, setFavorites] = useState([])
    const [selectedWine, setSelectedWine] = useState(null)
    
    useEffect(() => {
        fetch("http://localhost:3000/favorite", {
            headers: {
                'Content-Type': "application/json",
                "Authorization": localStorage.getItem('token')
            },
        })
        .then((res) => {
            if (res.ok) {
                return res.json()
            } else {
                throw new Error('Failed to fetch favorites.')
            }
        })
        .then((data) => {
            console.log('Fetched data:', data)
            setFavorites(data)
        })
        .catch((error) => {
            console.error("Error fetching data", error)
        })
    }, [])


    const capitalizeFirstLetter = (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1)
    }


    const handleRemove = (id) => {

        fetch(`http://localhost:3000/favorite/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem("token")
            },
        })
        .then((res) => {
            if (res.ok) {
                console.log('Successfully deleted:', id)
                setSelectedWine(null)
                fetch("http://localhost:3000/favorite", {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: localStorage.getItem('token')
                    }
                })
                .then((res) => {
                    if (res.ok) {
                        return res.json()
                    } else {
                        throw new Error('Failed to re-fetch favorites.')
                    }
                })
                .then((data) => {
                    console.log('Re-fetched data:', data)
                    setFavorites(data)
                })
                .catch((error) => {
                    console.error("Error re-fetching favorites", error)
                });
            }
        })
        .catch((error) => {
            console.error("Error removing favorite", error)
        })
    }

    const handleWineClick = (wine) => {
        setSelectedWine(wine)
      }

    return (
        <div>
        <h1 className='text-4xl text-center mb-2'>My Favorites</h1>
        <div className='flex'>
            <div className='w-1/2 h-screen overflow-y-scroll'>
                {favorites.length > 0 ? (
                    favorites.map((favorite) => {
                        const wine = favorite.wine
                        return (
                            <div 
                                key={favorite._id} 
                                className='mt-2' 
                                style={{ cursor: 'pointer' }}
                                onClick={() => handleWineClick(wine)}
                            >
                                    <p>{capitalizeFirstLetter(wine.type) || 'No type'}</p>
                                    <h1>{wine.winery || 'No winery'}</h1>
                                    <h2>{wine.wine || 'No wine name'}</h2>
                                    <button onClick={() => handleRemove(favorite._id)} className='btn btn-danger p-1'>Remove from Favorites</button>
                            </div>
                        )
                    })
                ) : (
                    <p>No favorites found.</p>
                )}
            </div>
            <div className='w-1/2'>
            {selectedWine && <ShowFavorites wine={selectedWine} />}
            </div>
        </div>
        </div>
    )
}

export default MyFavorites


