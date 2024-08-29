import React from 'react'
import { useState, useEffect } from 'react'
import ShowReview from '../components/ShowReview'

const NewReview = ({ wineId, selectedWine }) => {
    const [title, setTitle] = useState('')
    const [review, setReview] = useState('')
    const [error, setError] = useState('')
    const [reviews, setReviews] = useState([])

    const fetchReviews = () => {
      fetch(`http://localhost:3000/review/${wineId}`)
        .then((res) => res.json())
        .then((data) => setReviews(data))
        .catch((error) => console.error('Error fetching reviews:', error))
    }

    useEffect(() => {
      fetchReviews()
    }, [wineId])

    const handleSubmit = (e) => {
        e.preventDefault()
        const token = localStorage.getItem("token")

        if (!token) {
          setError("Please log in to submit a review.")
          return
        }

        fetch("http://localhost:3000/review/new", {
            method: "POST", 
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            },
            body: JSON.stringify({ title, review, wineId })
        })
        .then((res) => {
            if(res.ok) {
                return res.json()
            }
        })
        .then((data) => {
          if(data) {
            setTitle('')
            setReview('')
            fetchReviews()
          }
        })
        .catch((error) => {
            console.error("Error:", error)
            setError(error.message)
          })
    }

  return (
    <div className='mr-4'>
    <h1 className='text-2xl mt-4 mb-2'>Add a Review</h1>
    <form onSubmit={(e) => handleSubmit(e)}>
    <div class="mb-3">
  <label class="form-label">Title</label>
  <input class="form-control" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title"/>
</div>
<div class="mb-3">
  <label class="form-label">Review</label>
  <textarea class="form-control" value={review} onChange={(e) => setReview(e.target.value)} placeholder="Review"></textarea>
  <button type="submit" className="btn btn-primary mt-2">Submit</button>
</div>
</form>
{error && <p className='font-bold text-red-500 mt-2'>{error}</p>}
{selectedWine && <ShowReview reviews={reviews} setReviews={setReviews} />}
</div>
  )
}

export default NewReview