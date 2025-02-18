import React, { useEffect, useState } from 'react';
import Sidebar from "./Sidebar";
import Header from "./Header";

function Donations() {
    const [reviews, setReviews] = useState([]);

    
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
                                <select id="dateFilter" className="form-control">
                                    <option value="">Add Filter</option>
                                    <option value="today">Today</option>
                                    <option value="this_week">This Week</option>
                                    <option value="this_month">This Month</option>
                                    <option value="this_year">This Year</option>
                                </select>
                                    <br />
                                    <h5 className="card-title">Donations</h5>
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Sl.NO</th>
                                                    <th scope="col">Shelter Name</th>
                                                    <th scope="col">Donor Name</th>
                                                    <th scope="col">Food</th>
                                                    <th scope="col">Quantity</th>
                                                    <th scope="col">Price</th>
                                                    <th scope="col">Date</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                    <tr>
                                                        <th scope="row">1</th>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                    </tr>
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

export default Donations
