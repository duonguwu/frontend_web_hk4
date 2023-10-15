import { useEffect, useState } from "react";
import Rating from 'react-simple-star-rating'
import { useLocation, useNavigate, useParams } from "react-router-dom";

const ReviewList = ({ reviews }) => {
    return (
        <ul>
            {reviews.map((review) => (
                <li key={review.id}>
                    <Review review={review} />
                </li>
            ))}
        </ul>
    );
};
const userDetails = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;
const Review = ({ review }) => {
    return (
        <div>
            <p>{review.body}</p>
            <p className="text-gray-600 me-1">The product is evaluated by: {review.userDetails}</p>
        </div>
    );
};
const ProductReview = () => {
    const [rating, setRating] = useState(0) // initial rating value

    // Catch Rating value
    const handleRating = (rate) => {
        setRating(rate)
        // Some logic
    };
    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const response = await getProductByIdService(productId);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        })();
    }, [allProducts]);

    return (
        <>
            <div className='text-yellow-400 mb-1'>
                <Rating
                    onClick={handleRating}
                    ratingValue={rating}
                    size={20}
                    label
                    transition
                    fillColor='orange'
                    emptyColor='gray'
                    className='foo'
                />
                {/* Use rating value */}
                {rating}
            </div>
            <div>
                <h2 className="text-lg font-semibold" >Customer Reviews</h2>
                <ReviewList reviews={Review} />
                <h2>Add Review</h2>
                <form onSubmit={onSubmit}>
                    <input type="number" placeholder="Review" />
                    <textarea placeholder="Texting..."></textarea>
                    <button className="bg-[--primary-text-color] p-1 text-gray-100 rounded-md  text-xs disabled:cursor-not-allowed" type="submit">Add</button>
                </form>
            </div>
        </>
    )
};

export default ProductReview;