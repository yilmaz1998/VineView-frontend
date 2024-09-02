import React, { useState } from 'react'

const EditReview = ({ review, fetchReviews }) => {
  const URL = import.meta.env.VITE_API_URL
  const [title, setTitle] = useState(review.title)
  const [content, setContent] = useState(review.review)
  const [error, setError] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()

    fetch(`${URL}/review/${review._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, review: content }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        } else {
          throw new Error('You are not the owner of this comment.')
        }
      })
      .then((data) => {
        if(data) {
          fetchReviews()
        } 
      })
      .catch((error) => {
        console.error('Error:', error)
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
        Edit
      </button>

      <div
        className="modal fade"
        id={`id${review._id}`}
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Review
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
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
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="message-text" className="col-form-label">
                    Review:
                  </label>
                  <textarea
                    className="form-control"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  ></textarea>
                </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="submit"
                onClick={(e) => handleSubmit(e)}
                className="btn btn-primary"
                data-bs-dismiss="modal"
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditReview