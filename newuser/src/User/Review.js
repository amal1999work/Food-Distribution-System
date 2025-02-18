import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import Uhead from "./Uhead";
import { useLocation } from "react-router-dom";

function Review() {
  const authenticated = JSON.parse(localStorage.getItem("userdata"));
  const [review, setReview] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  // Retrieve donorId from location state
  const location = useLocation();
  const donorId = location.state?.donorId || ""; // Fallback to an empty string if donorId is not present
  console.log("Donor ID from location:", donorId);

  const validateForm = () => {
    let formErrors = {};
    if (!donorId) formErrors.donor = "Donor ID is required.";
    if (!review) formErrors.review = "Please write a review.";
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    const reviewData = {
      donorsid: donorId,
      sheltersid: authenticated._id,
      review: review,
      status:0,
      label:""
    };

    fetch("http://localhost:3005/donors/addreview", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        setMessage("Review submitted successfully!");
        // Clear form fields
        setReview("");
        // Clear error messages
        setErrors({});
      })
      .catch((error) => {
        console.error("Error:", error);
        setMessage("Failed to submit review");
      });
  };

  return (
    <div>
      <Uhead />
      <div id="banner" className="banner full-screen-mode parallax">
        <div className="container pr">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div className="banner-static">
              <div className="banner-text">
                <div className="banner-cell">
                  <div
                    id="reservation"
                    className="reservations-main pad-top-100 pad-bottom-100"
                  >
                    <div className="container">
                      <div className="row">
                        <br />
                        <br />
                        <br />
                        <div className="form-reservations-box">
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div
                              className="wow fadeIn"
                              data-wow-duration="1s"
                              data-wow-delay="0.1s"
                            >
                              <h2 className="block-title text-center">
                                Add Reviews
                              </h2>
                              <form
                                onSubmit={handleSubmit}
                                className="p-5 bg-white"
                              >
                                <div className="col-lg-12 col-md-6 col-sm-6 col-xs-12">
                                  <div className="form-box">
                                    <input
                                      type="text"
                                      placeholder="Write Your Reviews here.."
                                      required="required"
                                      data-error="Review is required."
                                      value={review}
                                      onChange={(event) =>
                                        setReview(event.target.value)
                                      }
                                    />
                                  </div>
                                  {errors.review && (
                                    <p className="text-danger">
                                      {errors.review}
                                    </p>
                                  )}
                                  {errors.donor && (
                                    <p className="text-danger">
                                      {errors.donor}
                                    </p>
                                  )}
                                </div>
                                <div className="col-lg-12 col-md-6 col-sm-6 col-xs-12">
                                  <div className="reserve-book-btn text-center">
                                    <button
                                      className="hvr-underline-from-center"
                                      type="submit"
                                    >
                                      Submit Review
                                    </button>
                                  </div>
                                </div>
                                {message && (
                                  <div className="row form-group">
                                    <div className="col-md-12">
                                      <p className="text-success">{message}</p>
                                    </div>
                                  </div>
                                )}
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Review;
