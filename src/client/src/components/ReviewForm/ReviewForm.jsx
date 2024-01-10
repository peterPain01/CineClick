import { useState } from "react";
import "./ReviewForm.css";
import StarRating from "../../components/StarRating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import request from '../../modules/request'
import {useNavigate} from 'react-router-dom'

function ReviewForm({ setIsReview, mv_id = "", name="" }) {
    const navigate = useNavigate()
    const [review, setReview] = useState("");
    const [rating, setRating] = useState(0);
    const [finish, setFinish] = useState(false);
    const handleReviewChange = (event) => {
        setReview(event.target.value);
    };
    const [msg, setMsg] = useState("")
    const handleSubmit = () => {
        console.log("Review:", review);
        console.log("Rating:", rating);
        if (!review || rating === 0) {
            toast.error("You must fill review area");
            return;
        }

        // send to server
        request.post('/review/create', {review, stars: rating, mv_id})        
        .then(res => { 
            setMsg(res.data)
        })
        .catch(err => {
            console.log(err);
        })
        setReview("");
        setRating(1);
        setFinish(true);
    };

    function handleCloseForm() {
        setIsReview(false);
    }

    function handleListReview(){
        navigate(`/allReview/${mv_id}/${name}`)
    }
    return (
        <div className="movie-review-container">
            <div className="movie-review-form">
                {finish ? (
                    <div className="review-finish-container">
                        <h2 className="review-heading">
                            🎉 {msg} 🎉 
                        </h2>
                        <button
                            className="review-submit backToVideo-btn"
                            onClick={handleCloseForm}
                        >
                            <FontAwesomeIcon
                                icon={faArrowLeft}
                                color="#fff"
                                size="xl"
                                style={{ marginRight: "10px", padding: 0 }}
                            />
                            Continue Watching
                        </button>
                        <p className="review-more" onClick={handleListReview}> 📃See more review here</p>
                    </div>
                ) : (
                    <>
                        <FontAwesomeIcon
                            icon={faXmark}
                            className="review-close"
                            onClick={handleCloseForm}
                        />
                        <h2 className="review-heading">Write a Review</h2>
                        <label>
                            <textarea
                                value={review}
                                onChange={handleReviewChange}
                                placeholder="Write your review here..."
                                className="review-area"
                            />
                        </label>

                        <div className="rating-container">
                            <StarRating onSetRating={setRating} />
                        </div>

                        <button
                            className="review-submit"
                            onClick={handleSubmit}
                        >
                            Submit Review
                        </button>
                    </>
                )}
            </div>
            <ToastContainer />
        </div>
    );
}

export default ReviewForm;
