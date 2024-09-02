import React from 'react'
import { useState, useEffect } from 'react'
import ShowReview from '../components/ShowReview'

const NewReview = ({ wineId, selectedWine }) => {
  const URL = import.meta.env.VITE_API_URL
    const [title, setTitle] = useState('')
    const [review, setReview] = useState('')
    const [error, setError] = useState('')
    const [reviews, setReviews] = useState([])

    const fetchReviews = () => {
      fetch(`${URL}/review/${wineId}`)
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

        fetch(`${URL}/review/new`, {
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
<div>
<button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target={`#id${review._id}`}
      >
        Add a Review
      </button>

      <div
        className="modal fade text-black"
        id={`id${review._id}`}
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Add Review
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  setReview('')
                  setTitle('')
                }}
              ></button>
            </div>
            <div className="modal-body">
              {error && <p className="text-danger">{error}</p>}
                <div className="mb-3">
                  <label htmlFor="recipient-name" className="col-form-label">
                    Title:
                  </label>
                  <input
                    type="text"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="message-text" className="col-form-label">
                    Review:
                  </label>
                  <textarea
                    className="form-control"
                    value={review}          
                    onChange={(e) => setReview(e.target.value)}
                  ></textarea>
                </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => {
                  setReview('')
                  setTitle('')
                }}
              >
                Close
              </button>
              <button
                type="submit"
                onClick={(e) => handleSubmit(e)}
                className="btn btn-primary"
                data-bs-dismiss="modal"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
{selectedWine && <ShowReview reviews={reviews} setReviews={setReviews} fetchReviews={fetchReviews} />}
</div>
  )
}

export default NewReview