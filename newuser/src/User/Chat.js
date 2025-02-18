
import React, { useEffect, useState } from "react";
import Uhead from "./Uhead";
import Footer from "./Footer";
import { useLocation } from "react-router-dom";

function Chat() {
  const [authenticated, setAuthenticated] = useState(
    JSON.parse(localStorage.getItem("userdata"))
  );

  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [replies, setReplies] = useState([]);
  
  // Retrieve donorId from location state
  const location = useLocation();
  const donorId = location.state?.donorId || ""; 
  console.log("Donor ID from location:", donorId);

  useEffect(() => {
    if (authenticated) {
      fetchReplies();
    }
  }, [authenticated]);

  const fetchReplies = () => {
    fetch("http://localhost:3005/donors/getReplies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ shelterid: authenticated._id }),
    })
      .then((res) => res.json())
      .then((result) => {
        setReplies(result);
      })
      .catch((error) => {
        console.error("Error fetching replies:", error);
      });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!donorId) newErrors.donor = "Donor ID is required";
    if (!message) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const messageData = {
      message,
      shelterid: authenticated._id,
      donorid: donorId, // Use donorId from location
    };

    fetch("http://localhost:3005/donors/addmessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messageData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Message added:", data);
        setMessage("");
        fetchReplies(); // Fetch replies again to update the list
      })
      .catch((error) => {
        console.error("Error adding message:", error);
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
                              <h2 className="block-title text-center ">
                                Send message
                              </h2>
                              <form
                                onSubmit={handleSubmit}
                                className="p-5 bg-white mb-4"
                              >
                                <div className="col-lg-12 col-md-6 col-sm-6 col-xs-12">
                                  <div className="form-box">
                                    <input
                                      type="text"
                                      placeholder="Send message here.."
                                      required="required"
                                      data-error="Message is required."
                                      value={message}
                                      onChange={(e) =>
                                        setMessage(e.target.value)
                                      }
                                    />
                                    {errors.message && (
                                      <p className="text-danger">
                                        {errors.message}
                                      </p>
                                    )}
                                  </div>
                                </div>
                                <div className="col-lg-12 col-md-6 col-sm-6 col-xs-12">
                                  <div className="reserve-book-btn text-center">
                                    <button
                                      className="hvr-underline-from-center mb-4"
                                      type="submit"
                                    >
                                      Send message
                                    </button>
                                  </div>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4">
                        <h2 className="block-title text-center">
                          View Replies
                        </h2>
                        <table className="table">
                          <thead>
                            <tr>
                              <th scope="col">Sl.no</th>
                              <th scope="col">Donor name</th>
                              <th scope="col">Reply</th>
                              <th scope="col">Time</th>
                            </tr>
                          </thead>
                          <tbody>
                            {replies.map((reply, index) => (
                              <tr key={reply._id}>
                                <td>{index + 1}</td>
                                <td>
                                  {reply.donorid
                                    ? reply.donorid.donorname
                                    : "N/A"}
                                </td>
                                <td>{reply.reply}</td>
                                <td>
                                  {new Date(
                                    reply.createdAt
                                  ).toLocaleTimeString()}
                                </td>
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
      </div>
      <Footer />
    </div>
  );
}

export default Chat;
