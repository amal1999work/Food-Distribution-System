import React, { useState, useEffect } from 'react';
import Uhead from './Uhead'; // Assuming you have this component
import Footer from './Footer'; // Assuming you have this component
import { Link } from 'react-router-dom';

function History() {
  const [authenticated, setAuthenticated] = useState(
    JSON.parse(localStorage.getItem("userdata"))
  );
  const [donations, setDonations] = useState([]);
  const [refresh, setRefresh] = useState(false); // Add a state to trigger refresh

  useEffect(() => {
    if (authenticated && authenticated._id) {
      fetch("http://localhost:3005/donors/viewhistory", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ shelterid: authenticated._id })
      })
        .then((res) => res.json())
        .then((result) => {
          console.log("Fetched donations:", result);
          setDonations(result);
        })
        .catch((error) => {
          console.error("Error fetching donations:", error);
        });
    }
  }, [refresh, authenticated]);

  return (
    <div>
      <Uhead />
      <div id="banner" className="banner full-screen-mode parallax">
        <div className="container pr">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div className="banner-static">
              <div className="banner-text">
                <div className="banner-cell">
                  <h2 className="block-title text-center">Donors</h2>
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">Sl.no</th>
                        <th scope="col">Donation Item</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Donor name</th>
                        <th scope="col">Date</th>
                        <th scope="col">Review</th>
                      </tr>
                    </thead>
                    <tbody>
                      {donations.length > 0 ? (
                        donations.map((donation, index) => (
                          <tr key={donation._id}>
                            <th scope="row">{index + 1}</th>
                            <td>{donation.donationname}</td>
                            <td>{donation.quantity}</td>
                            <td>{donation.price}</td>
                            <td>{donation.donorid.donorname}</td>
                            <td>{new Date(donation.createdAt).toLocaleDateString()}</td>
                            <tr><Link to='/review' state={{donorId:donation.donorid}}><button className='btn btn-primary'>review</button></Link></tr>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6" className="text-center">No donations found.</td>
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
      <Footer />
    </div>
  );
}

export default History;
