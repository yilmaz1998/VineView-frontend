import React,{ useState } from 'react';
import EditReview from '../components/EditReview';

const ShowReview = ({ reviews, setReviews, fetchReviews }) => {
  const URL = import.meta.env.VITE_API_URL
  const [error, setError] = useState(null)
  const token = localStorage.getItem("token")

  const handleRemove = (id) => {
    fetch(`${URL}/review/${id}`, {
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
         alert('Failed to delete review.')
        }
      })
      .catch((error) => {
        setError(error.message)
      })
  }

  return (
    <div className='mt-2'>
    <h2 className='text-3xl font-bold text-center'>Reviews</h2>
    {error && <p className='text-red-500'>{error}</p>}
    {reviews.length === 0 ? (
      <p className='text-center mt-2'>No reviews for this wine.</p>
    ) : (
      reviews.map((review, index) => (
        <div key={index} className='p-1 bg-white mt-2 text-black'>
          <h1 className='break-words overflow-hidden max-w-full text-xl'> {review.title}</h1>
          <p className='break-words overflow-hidden max-w-full'><span className='font-bold'>Review:</span> {review.review}</p>
          <p><span className='font-bold'>Created by:</span> {review.user.username}</p>
          {token ? (
            <div className='flex'>
          <button onClick={() => handleRemove(review._id)} className='btn btn-danger'>
            Delete
          </button>
          <EditReview review={review} setReviews={setReviews} fetchReviews={fetchReviews} />
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
