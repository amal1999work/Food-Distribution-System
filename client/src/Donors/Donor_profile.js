// import React, { useState } from 'react'
// import Header from '../Admin/Header'

// function Donor_profile() {
//     const [authenticated, setAuthenticated] = useState(JSON.parse(localStorage.getItem("userdata")));

//   return (
//     <div id="wrapper">
//     <Header/>
//     <div class="content-wrapper">
//   <div class="container-fluid">

//     <div class="col-lg-8 mt-5">
//          <div class="card">
//           <div class="card-body">
//           <ul class="nav nav-tabs nav-tabs-primary top-icon nav-justified">
//               <li class="nav-item">
//                   <a href="javascript:void();" data-target="#profile" data-toggle="pill" class="nav-link active"><i class="icon-user"></i> <span class="hidden-xs">Profile</span></a>
//               </li>
              
//               <li class="nav-item">
//                   <a href="javascript:void();" data-target="#edit" data-toggle="pill" class="nav-link"><i class="icon-note"></i> <span class="hidden-xs">Edit</span></a>
//               </li>
//           </ul>
//           <div class="tab-content p-3">
//               <div class="tab-pane active" id="profile">
//                   <h4 class="mb-3">DONOR PROFILE</h4>
//                   <div class="row">
//                       <div class="col-md-6">
//                           <h6>Donor name</h6>
//                           <p>
                       
//                           </p>
//                           <h6>Location</h6>
//                           <p>
                    
//                           </p>
                        
//                           <h6>Email</h6>
//                           <p>
                  
//                           </p>
//                           <h6>Contact</h6>
//                           <p>
                         
//                           </p>
//                       </div>
                      
                     
//                   </div>
                  
//               </div>
             
//               <div class="tab-pane" id="edit">
//                   <form>
//                       <div class="form-group row">
//                           <label class="col-lg-3 col-form-label form-control-label">Donor name</label>
//                           <div class="col-lg-9">
//                               <input class="form-control" type="text" value="Sera"/>
//                           </div>
//                       </div>
//                       <div class="form-group row">
//                           <label class="col-lg-3 col-form-label form-control-label">Location</label>
//                           <div class="col-lg-9">
//                               <input class="form-control" type="text" value="Banglore,Karnataka"/>
//                           </div>
//                       </div>
//                       <div class="form-group row">
//                           <label class="col-lg-3 col-form-label form-control-label">Donor type</label>
//                           <div class="col-lg-9">
//                               <input class="form-control" type="text" value="Event management"/>
//                           </div>
//                       </div>
//                       <div class="form-group row">
//                           <label class="col-lg-3 col-form-label form-control-label">Email</label>
//                           <div class="col-lg-9">
//                               <input class="form-control" type="email" value="sera@gmail.com"/>
//                           </div>
//                       </div>
//                       <div class="form-group row">
//                           <label class="col-lg-3 col-form-label form-control-label">Contact</label>
//                           <div class="col-lg-9">
//                               <input class="form-control" type="number" value="978663836"/>
//                           </div>
//                       </div>
                     
                    
                   
                     
                   
//                       <div class="form-group row">
//                           <label class="col-lg-3 col-form-label form-control-label">Password</label>
//                           <div class="col-lg-9">
//                               <input class="form-control" type="password" value="11111122333"/>
//                           </div>
//                       </div>
                  
//                       <div class="form-group row">
//                           <label class="col-lg-3 col-form-label form-control-label"></label>
//                           <div class="col-lg-9">
//                               <input type="reset" class="btn btn-secondary" value="Cancel"/>
//                               <input type="button" class="btn btn-primary" value="Save Changes"/>
//                           </div>
//                       </div>
//                   </form>
//               </div>
//           </div>
//       </div>
//     </div>
//     </div>
//   </div>
//   </div>
//   </div>
//   )
// }

// export default Donor_profile


import React, { useState, useEffect } from 'react';
import Header from '../Admin/Header';

function DonorProfile() {
  const [authenticated, setAuthenticated] = useState(JSON.parse(localStorage.getItem('userdata')));
  const [donor, setDonor] = useState({
    donorname: '',
    place: '',
    email: '',
    contact: '',
  });

  useEffect(() => {
    console.log('Authenticated user:', authenticated);  // Debugging log
    if (authenticated && authenticated._id) {
      fetch(`http://localhost:3005/donors/profileview/${authenticated._id}`)
        .then(response => response.json())
        .then(data => {
          setDonor(data);
          console.log('Donor data:', data);  // Debugging log
        })
        .catch(error => console.error('Error fetching donor details:', error));
    }
  }, [authenticated]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDonor(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3005/donors/profileupdate/${authenticated._id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(donor)
    })
      .then(response => response.json())
      .then(data => {
        setDonor(data);
        alert('Profile updated successfully');
      })
      .catch(error => console.error('Error updating donor details:', error));
  };

  return (
    <div id="wrapper">
      <Header />
      <div className="content-wrapper">
        <div className="container-fluid">
          <div className="col-lg-8 mt-5">
            <div className="card">
              <div className="card-body">
                <ul className="nav nav-tabs nav-tabs-primary top-icon nav-justified">
                  <li className="nav-item">
                    <a href="javascript:void();" data-target="#profile" data-toggle="pill" className="nav-link active"><i className="icon-user"></i> <span className="hidden-xs">Profile</span></a>
                  </li>
                  <li className="nav-item">
                    <a href="javascript:void();" data-target="#edit" data-toggle="pill" className="nav-link"><i className="icon-note"></i> <span className="hidden-xs">Edit</span></a>
                  </li>
                </ul>
                <div className="tab-content p-3">
                  <div className="tab-pane active" id="profile">
                    <h4 className="mb-3">DONOR PROFILE</h4>
                    <div className="row">
                      <div className="col-md-6">
                        <h6>Donor name</h6>
                        <p>{donor.donorname}</p>
                        <h6>Location</h6>
                        <p>{donor.place}</p>
                        <h6>Email</h6>
                        <p>{donor.userid?.email || ''}</p>
                        <h6>Contact</h6>
                        <p>{donor.contact}</p>
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane" id="edit">
                    <form onSubmit={handleFormSubmit}>
                      <div className="form-group row">
                        <label className="col-lg-3 col-form-label form-control-label">Donor name</label>
                        <div className="col-lg-9">
                          <input className="form-control" type="text" name="donorname" value={donor.donorname} onChange={handleInputChange} />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-lg-3 col-form-label form-control-label">Location</label>
                        <div className="col-lg-9">
                          <input className="form-control" type="text" name="place" value={donor.place} onChange={handleInputChange} />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-lg-3 col-form-label form-control-label">Email</label>
                        <div className="col-lg-9">
                          <input className="form-control" type="email" name="email" value={donor.userid?.email} onChange={handleInputChange} />
                        </div>
                      </div>
                      {/* <div className="form-group row">
                        <label className="col-lg-3 col-form-label form-control-label">Email</label>
                        <div className="col-lg-9">
                          <input className="form-control" type="email" name="email" value={donor.userid?.email} onChange={handleInputChange} />
                        </div>
                      </div> */}
                      <div className="form-group row">
                        <label className="col-lg-3 col-form-label form-control-label">Contact</label>
                        <div className="col-lg-9">
                          <input className="form-control" type="number" name="contact" value={donor.contact} onChange={handleInputChange} />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-lg-3 col-form-label form-control-label"></label>
                        <div className="col-lg-9">
                      
                          <input type="submit" className="btn btn-primary" value="Save Changes" />
                        </div>
                      </div>
                    </form>
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

export default DonorProfile;
