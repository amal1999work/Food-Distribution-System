import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Link } from "react-router-dom";

function AppShelter() {
    const [shelters, setShelters] = useState([]);
  const [acceptedShelters, setAcceptedShelters] = useState([]);
  const [rejectedShelters, setRejectedShelters] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3005/shelter/shelterview')
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        const pending = [];
        const accepted = [];
        const rejected = [];
        result.forEach((shelter) => {
          if (shelter.is_check === 1) {
            accepted.push(shelter);
          } else if (shelter.is_check === 2) {
            rejected.push(shelter);
          } else {
            pending.push(shelter);
          }
        });
        setShelters(pending);
        setAcceptedShelters(accepted);
        setRejectedShelters(rejected);
      });
  }, []);

  const handleApprove = (id) => {
    let dataApprove = {
      id,
      is_check: 1
    };
    fetch('http://localhost:3005/shelter/approve', {
      method: "post",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataApprove)
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setShelters((prevShelters) => prevShelters.filter((shelter) => shelter._id !== id));
        setAcceptedShelters((prevAcceptedShelters) => [
          ...prevAcceptedShelters,
          shelters.find((shelter) => shelter._id === id)
        ]);
      });
  };

  const handleReject = (id) => {
    let dataReject = {
      id,
      is_check: 2
    };
    fetch('http://localhost:3005/shelter/reject', {
      method: "post",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataReject)
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setShelters((prevShelters) => prevShelters.filter((shelter) => shelter._id !== id));
        setRejectedShelters((prevRejectedShelters) => [
          ...prevRejectedShelters,
          shelters.find((shelter) => shelter._id === id)
        ]);
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
                  

                  <h5 className="card-title mt-5">Accepted Shelters</h5>
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">Sl.NO</th>
                          <th scope="col">Shelter name</th>
                          <th scope="col">Shelter location</th>
                          <th scope="col">Shelter owner name</th>
                          <th scope="col">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {acceptedShelters.map((shelter, index) => (
                          <tr key={shelter._id}>
                            <th scope="row">{index + 1}</th>
                            <td>{shelter.sheltername}</td>
                            <td>{shelter.place}</td>
                            <td>{shelter.ownername}</td>
                              
                            <td><Link to='/shelterview' state={{ id: shelter._id }}>
                              </Link>
                              <button className="btn btn-danger mr-2" onClick={() => handleReject(shelter._id)}>Reject</button></td>
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

export default AppShelter
