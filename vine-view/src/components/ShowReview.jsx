import React,{ useState } from 'react';
import EditReview from '../components/EditReview';

const ShowReview = ({ reviews, setReviews }) => {
  const [error, setError] = useState(null)
  const token = localStorage.getItem("token")

  const handleRemove = (id) => {
    fetch(`http://localhost:3000/review/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
    })
      .then((res) => {
        if (res.ok) {
          setReviews(reviews.filter((review) => review._id !== id))
        } else {
          throw new Error('Failed to delete review')
        }
      })
      .catch((error) => {
        setError(error.message)
      })
  }

  return (
    <div>
    <h2 className='text-3xl'>Reviews</h2>
    {error && <p className='text-red-500'>{error}</p>}
    {reviews.length === 0 ? (
      <p className='text-gray-500'>No reviews for this wine.</p>
    ) : (
      reviews.map((review, index) => (
        <div key={index}>
          <p>Title: {review.title}</p>
          <p>Review: {review.review}</p>
          <p>Created By: {review.user.username}</p>
          {token ? (
            <div>
          <button onClick={() => handleRemove(review._id)} className='btn btn-danger'>
            Delete
          </button>
          <EditReview />
          </div>
          ) : (
            null
          )}
 
        </div>
      ))
    )}
  </div>
)
}

export default ShowReview
