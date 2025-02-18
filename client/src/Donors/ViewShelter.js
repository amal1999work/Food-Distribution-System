import React, { useEffect, useState } from "react";

import { Link, useLocation } from "react-router-dom";
import Header from "../Admin/Header";
import Sidebar from "../Admin/Sidebar";

function ViewShelter() {
  const location = useLocation();
  const [sheltername, setSheltername] = useState('');
  const [place, setPlace] = useState('');
  const [ownername, setOwnername] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [licenseno, setLicenseno] = useState('');

  useEffect(() => {
    let param = {
      id: location.state.id,
    };

    fetch("http://localhost:3005/shelter/getShelterById", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(param),
    })
    .then((res) => res.json())
    .then((result) => {
      setSheltername(result.sheltername);
      setPlace(result.place);
      setOwnername(result.ownername);
      setEmail(result.userid?.email || ''); // Adjusted this line to fetch email from the nested userid field
      setContact(result.contact);
      setLicenseno(result.licenseno);
    })
    .catch((error) => {
      console.error("Error fetching shelter details:", error);
    });
  }, [location.state.id]);

  return (
    <div id="wrapper">
      <Sidebar />
      <Header/>
      <div class="content-wrapper">
        <div class="container-fluid">
          <div class="row px-5 py-5">
            <div class="col-lg-12">
              <div class="card">
                <div class="card-body">
                  <div class="card-title">SHELTER DETAILS</div>
                  <hr />
                  <form>
                    <div class="form-group">
                      <label for="input-1">SHELTER Name</label>
                      <input
                        type="text"
                        class="form-control"
                        id="input-1"
                        value={sheltername}
                        readOnly
                      />
                    </div>
                    <div class="form-group">
                      <label for="input-2">Shelter Location</label>
                      <input
                        type="text"
                        class="form-control"
                        id="input-2"
                        value={place}
                        readOnly
                      />
                    </div>
                    <div class="form-group">
                      <label for="input-3">Shelter Owner Name</label>
                      <input
                        type="text"
                        class="form-control"
                        id="input-3"
                        value={ownername}
                        readOnly
                      />
                    </div>
                    <div class="form-group">
                      <label for="input-4">Email</label>
                      <input
                        type="text"
                        class="form-control"
                        id="input-4"
                        value={email}
                        readOnly
                      />
                    </div>
                    <div class="form-group">
                      <label for="input-5">Contact</label>
                      <input
                        type="text"
                        class="form-control"
                        id="input-5"
                        value={contact}
                        readOnly
                      />
                    </div>
                    <div class="form-group">
                      <label for="input-6">License No</label>
                      <input
                        type="text"
                        class="form-control"
                        id="input-6"
                        value={licenseno}
                        readOnly
                      />
                    </div>
                    
                    <div class="form-group">
                      <Link to={'/'}>
                        <button type="button" class="btn btn-light px-5">
                          GO BACK
                        </button>
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewShelter;
