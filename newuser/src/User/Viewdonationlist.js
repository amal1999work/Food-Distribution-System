
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Footer from "./Footer";
import Uhead from "./Uhead";
import axios from 'axios';

function Viewdonationlist() {
  const [authenticated, setAuthenticated] = useState(JSON.parse(localStorage.getItem('userdata')));
  const location = useLocation();
  const navigate = useNavigate();
  const [donorId, setDonorId] = useState(null);
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    if (location.state && location.state.donorId) {
      setDonorId(location.state.donorId);
    } else {
      navigate('/');
    }
  }, [location.state, navigate]);

  useEffect(() => {
    const fetchDonations = async () => {
      if (donorId) {
        try {
          const response = await fetch('http://localhost:3005/donors/getdon', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ donorId })
          });
          const result = await response.json();
          if (Array.isArray(result)) {
            setDonations(result);
            console.log("Donations fetched successfully:", result);
          } else {
            console.error("Unexpected response format:", result);
            setDonations([]);
          }
        } catch (error) {
          console.error("Error fetching donations:", error);
          setDonations([]);
        }
      }
    };

    fetchDonations();
  }, [donorId]);

  const updatePaymentStatus = async (donationId) => {
    try {
      const updateStatusUrl = 'http://localhost:3005/donors/updatePaymentStatus';
      await axios.post(updateStatusUrl, { donationId, shelterId: authenticated._id });

      setDonations(prevDonations =>
        prevDonations.map(donation =>
          donation._id === donationId ? { ...donation, payment: 1, shelterid: authenticated._id } : donation
        )
      );
    } catch (error) {
      console.error('Error updating payment status:', error);
    }
  };

  const handlePayment = async (amount, donationId) => {
    await updatePaymentStatus(donationId);

    const options = {
      key: 'rzp_test_4Ex6Tyjkp79GFy',
      amount: amount * 100,
      currency: 'INR',
      name: 'Your Company Name',
      description: 'Test Transaction',
      handler: async (response) => {
        try {
          const verifyUrl = 'http://localhost:3005/donors/verify';
          const { data } = await axios.post(verifyUrl, response);
          if (data.status === 'success') {
            alert('Payment Successful');
            // Additional actions if needed
          } else {
            alert('Payment Verification Failed');
          }
        } catch (error) {
          console.error('Error verifying payment:', error);
          alert('Payment Verification Error');
        }
      },
      prefill: {
        name: 'Test User',
        email: 'testuser@example.com',
        contact: '9999999999',
      },
      theme: {
        color: '#3399cc',
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const handleCancel = async (donationId) => {
    try {
      const response = await fetch('http://localhost:3005/donors/cancelDonation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ donationId, shelterId: authenticated._id })
      });
      const result = await response.json();
      if (response.ok) {
        setDonations(prevDonations =>
          prevDonations.map(donation =>
            donation._id === donationId ? { ...donation, canceledByShelters: [...donation.canceledByShelters, authenticated._id] } : donation
          )
        );
        console.log("Donation cancelled successfully:", result);
      } else {
        console.error("Error cancelling donation:", result);
      }
    } catch (error) {
      console.error("Error cancelling donation:", error);
    }
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
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="row">Sl.no</th>
                        <th scope="col">Fooditem</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Amount of peoples</th>
                        <th scope="col">Price</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {donations.length > 0 ? donations.map((donation, index) => (
                        <tr key={donation._id}>
                          <th scope="row">{index + 1}</th>
                          <td>{donation.donationname}</td>
                          <td>{donation.quantity}</td>
                          <td>{donation.noofusers}</td>
                          <td>{donation.price}</td>
                          <td>
                            {donation.payment !== 1 && !donation.canceledByShelters.includes(authenticated._id) && (
                              <button className='btn btn-primary mx-2' onClick={() => handlePayment(donation.price, donation._id)}>
                                Pay
                              </button>
                            )}
                            {donation.payment === 1 ? (
                              <button className='btn btn-secondary' disabled>Paid</button>
                            ) : donation.canceledByShelters.includes(authenticated._id) ? (
                              <button className='btn btn-secondary' disabled>Cancelled</button>
                            ) : (
                              <button className='btn btn-danger' onClick={() => handleCancel(donation._id)}>Cancel</button>
                            )}
                        <Link to='/chat' state={{ donorId: donation.donorid }}>
  <button className='btn btn-warning'>Chat</button>
</Link>
                          </td>
                        </tr>
                      )) : (
                        <tr>
                          <td colSpan="6">No donations found</td>
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

export default Viewdonationlist;
