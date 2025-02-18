import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Uhead from './Uhead'
import Footer from './Footer'


function ViewDonors() {
  const authenticated = JSON.parse(localStorage.getItem("userdata"));
  const [donors, setDonors] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const response = await fetch('http://localhost:3005/donors/requestDonordetails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ shelterId: authenticated._id })
        });
        const result = await response.json();
        if (typeof result === 'object' && result !== null) {
          setDonors([result]); // Set as an array with a single donor object
        } else {
          console.error("Unexpected response format:", result);
          setDonors([]);
        }
      } catch (error) {
        console.error("Error fetching donors:", error);
        setDonors([]);
      }
    };
  
    fetchDonors();
  }, [authenticated._id]);

  const viewDonations = (donorId) => {
    navigate('/lists', { state: { donorId } });
  };

  return (
    <div>
      <Uhead />
      <div id="banner" class="banner full-screen-mode parallax">
        <div class="container pr">
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div class="banner-static">
                    <div class="banner-text">
                        <div class="banner-cell">

                        <h2 class="block-title text-center">Donors</h2>
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="row">Sl.no</th>
                        <th scope="col">Donor name</th>
                        <th scope="col">Contact</th>
                        <th scope="col">Email</th>
                        <th scope="col">Place</th>
                        <th scope="col">View donation</th>
                      </tr>
                    </thead>
                    <tbody>
                      {donors.length > 0 && (
                        <tr>
                          <th scope="row">1</th>
                          <td>{donors[0].donorname}</td>
                          <td>{donors[0].contact}</td>
                          <td>{donors[0].userid.email}</td>
                          <td>{donors[0].place}</td>
                          
                          <td>
                            <button className='btn btn-primary'
                              onClick={() => viewDonations(donors[0]._id)}>
                              View donations
                            </button>
                          </td>
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
                   <Footer/>  
    </div>
  )
}

export default ViewDonors
