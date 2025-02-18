import React, { useEffect, useState } from 'react';
import Header from "../Admin/Header";
import Sidebar from "../Admin/Sidebar";

function ViewFeedback() {
    const authenticated = JSON.parse(localStorage.getItem("userdata"));
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3005/donors/getReviewsByDonor", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ donorId: authenticated._id })
        })
            .then((res) => res.json())
            .then((result) => {
                setReviews(result);
            })
            .catch((error) => {
                console.error('Error fetching reviews:', error);
            });
    }, [authenticated._id]);

    return (
        <div id="wrapper">
            <Sidebar />
            <Header />
           
            <div className="content-wrapper">
                <div className="container-fluid">
                    <div className="row mt-4 mx-3 py-3">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-body">
                                    <div>
                                        <div className="row">
                                            <div className="col-4">
                                                <i className="zmdi zmdi-star text-warning"></i>
                                                <i className="zmdi zmdi-star text-warning"></i>
                                                <i className="zmdi zmdi-star text-warning"></i>
                                                <i className="zmdi zmdi-star text-warning"></i>
                                                <i className="zmdi zmdi-star"></i>
                                            </div>
                                            <div className="col-4">
                                                Out of 24 reviews
                                            </div>
                                            <div className="col-4">
                                                Last update 23-07-2024
                                            </div>
                                        </div>
                                    </div><br /><br />
                                    <h5 className="card-title">Reviews</h5>
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Sl.NO</th>
                                                    <th scope="col">Shelter Name</th>
                                                    <th scope="col">Place</th>
                                                    <th scope="col">Shelter Contact</th>
                                                    <th scope="col">Feedback</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {reviews.map((review, index) => (
                                                    <tr key={review._id}>
                                                        <th scope="row">{index + 1}</th>
                                                        <td>{review.sheltersid ? review.sheltersid.sheltername : 'N/A'}</td>
                                                        <td>{review.sheltersid ? review.sheltersid.place : 'N/A'}</td>
                                                        <td>{review.sheltersid ? review.sheltersid.contact : 'N/A'}</td>
                                                        <td>{review.review}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewFeedback;
