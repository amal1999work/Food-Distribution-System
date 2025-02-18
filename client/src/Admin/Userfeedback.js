import React, { useEffect, useState } from 'react';
import Sidebar from "./Sidebar";
import Header from "./Header";

function Userfeedback() {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3005/donors/viewreview")
            .then((res) => res.json())
            .then((result) => {
                setReviews(result);
            })
            .catch((error) => {
                console.error('Error fetching reviews:', error);
            });
    }, []);

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
                                    <h5 className="card-title">Reviews</h5>
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Sl.NO</th>
                                                    <th scope="col">Shelter Name</th>
                                                    <th scope="col">Donor Name</th>
                                                    <th scope="col">Place</th>
                                                    <th scope="col">Shelter contact</th>
                                                    <th scope="col">Feedback</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {reviews.map((review, index) => (
                                                    <tr key={review._id}>
                                                        <th scope="row">{index + 1}</th>
                                                        <td>{review.sheltersid.sheltername}</td>
                                                        <td>{review.donorsid.donorname}</td>
                                                        <td>{review.sheltersid.place}</td>
                                                        <td>{review.sheltersid.contact}</td>
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

export default Userfeedback;
