import React, { useEffect, useState } from 'react'
import ShowFavorites from './ShowFavorites'
import { motion } from 'framer-motion'

const MyFavorites = () => {
    const URL = import.meta.env.VITE_API_URL
    const [favorites, setFavorites] = useState([])
    const [selectedWine, setSelectedWine] = useState(null)
    const [searchQuery, setSearchQuery] = useState('')
    
    useEffect(() => {
        fetch(`${URL}/favorite`, {
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

        fetch(`${URL}/favorite/${id}`, {
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
                fetch(`${URL}/favorite`, {
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

      const filteredWines = Array.isArray(favorites) ? favorites.filter(e => 
        e.wine.wine.toLowerCase().includes(searchQuery.toLowerCase())
    ) : []
    

    return (
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        >
        <h1 className='text-4xl text-center mb-2'>My Favorites</h1>
        <input 
            type="text" 
            placeholder="Search by wine" 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)} 
            className='form-control'
            />
        <div className='flex mt-2'>
            <div className='w-1/2 h-screen overflow-y-scroll border-1 border-black'>
                {filteredWines.length > 0 ? (
                    filteredWines.map((favorite) => {
                        return (
<div 
    key={favorite._id} 
    className={`wine mb-1 text-center border-1 border-black text-black ${
        selectedWine && selectedWine._id === favorite.wine._id ? 'bg-blue-300' : 'bg-white'
    }`}
    style={{ cursor: 'pointer' }}
    onClick={() => handleWineClick(favorite.wine)}
>
    <p>{capitalizeFirstLetter(favorite.wine.type) || 'No type'}</p>
    <h1>{favorite.wine.winery || 'No winery'}</h1>
    <h2>{favorite.wine.wine || 'No wine name'}</h2>
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
        </motion.div>
    )
}

export default MyFavorites


