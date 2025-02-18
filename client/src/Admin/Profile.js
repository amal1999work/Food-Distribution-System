import React, { useState, useEffect } from 'react';
import Header from './Header';

function Profile() {
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
  )
}

export default Profile
