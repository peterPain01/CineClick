import "./ReviewPage";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import request from "../../modules/request";
import { useParams } from "react-router-dom";
import './ReviewPage.css'
function ReviewPage() {
    const { id, name } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        const url = new URL("http://localhost:13123/review/list-all");
        url.search = new URLSearchParams({ mv_id: id });
        request.get(url, (res) => {
            setReviews(res.data);
        });
        setIsLoading(false);
    }, []);

    if (isLoading) return <Loading />;
    return (
        <div className="review-page">
            <div className="review-content">
                <h2 className="review-heading">✍️ {name} Reviews</h2>
                {reviews.map((review, index) => (
                    <div key={index} className="review-card">
                        <div className="review-email">Reviewer: {review.email}</div>
                        <div className="review-stars">
                        Stars: {Array.from({ length: review.stars }, (_, index) => '⭐')}
                        </div>
                        <div className="review-desc">Review: {review.review}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ReviewPage;
