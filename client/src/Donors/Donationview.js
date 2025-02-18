
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../Admin/Sidebar';
import Header from '../Admin/Header';

function Donationview() {
  const [authenticated, setAuthenticated] = useState(
    JSON.parse(localStorage.getItem("userdata"))
  );
  const [donations, setDonations] = useState([]);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    if (authenticated && authenticated._id) {
      fetch("http://localhost:3005/donors/viewdons", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ donorid: authenticated._id })
      })
      .then((res) => res.json())
      .then((result) => {
        const filteredDonations = result.filter(donation => donation.is_start === 0);
        setDonations(filteredDonations);
      })
      .catch((error) => {
        console.error("Error fetching donors:", error);
      });
    }
  }, [refresh, authenticated]);

  const deleteProduct = (iD) => {
    let params = { id: iD };

    fetch('http://localhost:3005/donors/deleteDonations', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    })
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
      setRefresh(prev => prev + 1);
    });
  }

  return (
    <div id="wrapper">
      <Sidebar />
      <Header />

      <div class="content-wrapper">
        <div class="container-fluid">

          <div class="row mt-4 mx-3 py-3">
            <div class="col-lg-12">
              <div class="card">
                <div class="card-body">        

                  <br />

                  <h5 class="card-title">Running Donations</h5>
                  <Link to='/adddonations'><button class='btn btn-secondary'>Add donation</button></Link>
                  <div class="table-responsive">
                    <table class="table">
                      <thead>
                        <tr>
                          <th scope="col">Sl.NO</th>
                          <th scope="col">Item</th>
                          <th scope="col">Quantity</th>
                          <th scope="col">People Consume</th>
                          <th scope="col">Price</th>
                          <th scope="col">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          donations.map((donation, index) => {
                            return (
                              <tr key={donation._id}>
                                <th scope="row">{index + 1}</th>
                                <td>{donation.donationname}</td>
                                <td>{donation.quantity}</td>
                                <td>{donation.noofusers}</td>
                                <td>{donation.price}</td>
                                <td>
                                  <Link to='/editdonation' state={{ id: donation._id }}>
                                    <button type="button" class="btn btn-warning mr-2">
                                      Edit
                                    </button>
                                  </Link> 
                                  <button class="btn btn-danger mr-2" onClick={() => deleteProduct(donation._id)}>
                                    Delete
                                  </button>
                                </td>
                              </tr>
                            )
                          })
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
  )
}

export default Donationview;
