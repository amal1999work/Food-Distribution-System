import React, { useEffect, useState } from 'react';
import Sidebar from "./Sidebar";
import Header from "./Header";
import axios from 'axios';


function RejDonors() {
    const [donors, setDonors] = useState([]);
  const [filteredDonors, setFilteredDonors] = useState({ new: [], approved: [], rejected: [] });

  useEffect(() => {
    fetchDonors();
  }, []);

  const fetchDonors = async () => {
    try {
      const response = await fetch("http://localhost:3005/donors/viewdonor");
      const result = await response.json();
      setDonors(result);
      filterDonors(result);
    } catch (error) {
      console.error("Error fetching donors:", error);
    }
  };

  const filterDonors = (donors) => {
    const newDonors = donors.filter(donor => donor.is_request === 0);
    const approvedDonors = donors.filter(donor => donor.is_request === 1);
    const rejectedDonors = donors.filter(donor => donor.is_request === 2);
    setFilteredDonors({ new: newDonors, approved: approvedDonors, rejected: rejectedDonors });
  };

  const handleApprove = async (id) => {
    try {
      await axios.post("http://localhost:3005/donors/approve", { id });
      fetchDonors(); // Re-fetch the donors list to update the UI
    } catch (error) {
      console.error("Error approving donor:", error);
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.post("http://localhost:3005/donors/reject", { id });
      fetchDonors(); // Re-fetch the donors list to update the UI
    } catch (error) {
      console.error("Error rejecting donor:", error);
    }
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
                  

                  <h5 className="card-title mt-5">Rejected Donors</h5>
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">Sl.NO</th>
                          <th scope="col">Donor Name</th>
                          <th scope="col">Place</th>
                          <th scope="col">Email</th>
                          <th scope="col">Contact</th>
                          <th scope="col">Ratings</th>
                          <th scope="col">Donations</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredDonors.rejected.map((donor, index) => (
                          <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{donor.donorname}</td>
                            <td>{donor.place}</td>
                            <td>{donor.userid.email}</td>
                            <td>{donor.contact}</td>
                            <td>
                              <i className="zmdi zmdi-star text-warning"></i>
                              <i className="zmdi zmdi-star text-warning"></i>
                              <i className="zmdi zmdi-star text-warning"></i>
                              <i className="zmdi zmdi-star text-warning"></i>
                              <i className="zmdi zmdi-star"></i>
                            </td>
                            <td>
                              <button className="btn btn-primary">Donations</button>
                            </td>
                            <td>
                              <button className="btn btn-success" onClick={() => handleApprove(donor._id)}>Approve</button>
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
  )
}

export default RejDonors
