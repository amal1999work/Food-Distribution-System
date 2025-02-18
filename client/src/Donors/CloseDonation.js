
import React, { useEffect, useState } from 'react';
import Sidebar from '../Admin/Sidebar';
import Header from '../Admin/Header';

function CloseDonation  () {
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
          console.log("Fetched donors:", result);
          // Filter donations where is_start is 3
          const deliveredDonations = result.filter(donation => donation.is_start === 3);
          setDonations(deliveredDonations);
        })
        .catch((error) => {
          console.error("Error fetching donors:", error);
        });
    }
  }, [refresh, authenticated]);

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
                  <h5 className="card-title">Delivered Donations</h5>
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
                        </tr>
                      </thead>
                      <tbody>
                        {donations.length > 0 ? (
                          donations.map((donation, index) => (
                            <tr key={donation._id}>
                              <th scope="row">{index + 1}</th>
                              <td>{donation.donationname}</td>
                              <td>{donation.quantity}</td>
                              <td>{donation.noofusers}</td>
                              <td>{donation.price}</td>
                              <td>{donation.shelterid?.sheltername || 'N/A'}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="6" className="text-center">No delivered donations found.</td>
                          </tr>
                        )}
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

export default CloseDonation  ;

