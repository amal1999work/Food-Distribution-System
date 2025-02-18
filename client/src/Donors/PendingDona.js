
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../Admin/Sidebar';
import Header from '../Admin/Header';

function PendingDona() {
  const [authenticated, setAuthenticated] = useState(
    JSON.parse(localStorage.getItem("userdata"))
  );
  const [donations, setDonations] = useState([]);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    if (authenticated && authenticated._id) {
      fetch("http://localhost:3005/donors/viewcloseddonors", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ donorid: authenticated._id })
      })
      .then((res) => res.json())
      .then((result) => {
        // Filter donations where is_start is not 3
        const filteredDonations = result.filter(donation => donation.is_start !== 3);
        setDonations(filteredDonations);
      })
      .catch((error) => {
        console.error("Error fetching donors:", error);
      });
    }
  }, [refresh, authenticated]);

  const updateDonationStatus = (donationId, status) => {
    let endpoint;
    let alertMessage;

    if (status === 1) {
      endpoint = 'start';
      alertMessage = "Donation has started!";
    } else if (status === 2) {
      endpoint = 'ontheway';
      alertMessage = "Donation is on the way!";
    } else if (status === 3) {
      endpoint = 'delivered';
      alertMessage = "Donation has been delivered!";
    }

    fetch(`http://localhost:3005/donors/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ donationId }),
    })
      .then((res) => {
        // Check if the response is OK (status 200-299)
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => {
        console.log("Updated donation:", data);

        // Check if the update was successful
        if (data.success) {
          // If the donation is delivered, remove it from the list
          if (status === 3) {
            setDonations(prevDonations => prevDonations.filter(donation => donation._id !== donationId));
          }
          alert(alertMessage);
        } else {
      
          alert("updated successfully");
        }
      })
      .catch((error) => {
        // Handle network or other errors
        console.error("Error updating donation status:", error);
        alert("Failed to update donation status. Please try again.");
      });
  };

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
                  <h5 className="card-title">Pending Donations</h5>
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">Sl.NO</th>
                          <th scope="col">Item</th>
                          <th scope="col">Quantity</th>
                          <th scope="col">People Consume</th>
                          <th scope="col">Price</th>
                          <th scope="col">Shelter Name</th>
                          <th scope="col">Deliver Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          donations.map((donation, index) => (
                            <tr key={donation._id}>
                              <th scope="row">{index + 1}</th>
                              <td>{donation.donationname}</td>
                              <td>{donation.quantity}</td>
                              <td>{donation.noofusers}</td>
                              <td>{donation.price}</td>
                              <td>{donation.shelterid?.sheltername}</td>
                              <td>
                                <button
                                  className="btn btn-warning mr-1"
                                  onClick={() => updateDonationStatus(donation._id, 1)}
                                >
                                  Started
                                </button>
                                <button
                                  className="btn btn-success mr-1"
                                  onClick={() => updateDonationStatus(donation._id, 2)}
                                >
                                  On the way
                                </button>
                                <button
                                  className="btn btn-primary"
                                  onClick={() => updateDonationStatus(donation._id, 3)}
                                >
                                  Delivered
                                </button>
                              </td>
                            </tr>
                          ))
                        }
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

export default PendingDona;


