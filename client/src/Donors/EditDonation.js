import React, { useEffect, useState } from 'react';
import Header from '../Admin/Header';
import Sidebar from '../Admin/Sidebar';
import { useLocation, useNavigate } from 'react-router-dom';

function EditDonation() {
  const [donationname, setDonationname] = useState("");
  const [quantity, setQuantity] = useState("");
  const [noofusers, setNoofusers] = useState("");
  const [price, setPrice] = useState("");
  const [errors, setErrors] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const param = { id: location.state.id };

    fetch("http://localhost:3005/donors/getDonations", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(param),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result); // Log the result to see the structure
        setDonationname(result.donationname);
        setQuantity(result.quantity);
        setNoofusers(result.noofusers);
        setPrice(result.price); // Set the price from the response
      })
      .catch((error) => {
        console.error("Error fetching donation details:", error);
      });
  }, [location.state.id]);

  const validateForm = () => {
    const newErrors = {};

    if (!donationname) newErrors.donationname = 'Donation name is required';
    if (!quantity) newErrors.quantity = 'Quantity is required';
    if (!noofusers) {
      newErrors.noofusers = 'Number of users is required';
    } else if (isNaN(noofusers) || noofusers <= 0) {
      newErrors.noofusers = 'Number of users must be a positive number';
    }
    if (!price && price !== 0) {
      newErrors.price = 'Price is required';
    } else if (isNaN(price) || price < 0) {
      newErrors.price = 'Price must be a non-negative number';
    }

    return newErrors;
  };

  const handleUpdate = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    console.log({ donationname, quantity, noofusers, price }); // Log the state values

    const data = {
      id: location.state.id,
      donationname,
      quantity,
      noofusers,
      price
    };

    fetch("http://localhost:3005/donors/updateDonations", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log("Donation updated successfully:", result);
        navigate('/donationview');
      })
      .catch((error) => {
        console.error("Error updating donation:", error);
      });
  };

  return (
    <div id="wrapper">
      <Sidebar />
      <Header />
      <div className="content-wrapper">
        <div className="container-fluid">
          <div className="row px-5 py-5">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <div className="card-title">Edit Donation</div>
                  <hr />
                  <form>
                    <div className="form-group">
                      <label htmlFor="input-1">Donation item</label>
                      <input
                        type="text"
                        className="form-control"
                        id="input-1"
                        value={donationname}
                        onChange={(event) => setDonationname(event.target.value)}
                      />
                      {errors.donationname && <span className="text-danger">{errors.donationname}</span>}
                    </div>
                    <div className="form-group">
                      <label htmlFor="input-2">Quantity</label>
                      <input
                        type="text"
                        className="form-control"
                        id="input-2"
                        value={quantity}
                        onChange={(event) => setQuantity(event.target.value)}
                      />
                      {errors.quantity && <span className="text-danger">{errors.quantity}</span>}
                    </div>
                    <div className="form-group">
                      <label htmlFor="input-3">Amount of people</label>
                      <input
                        type="number"
                        className="form-control"
                        id="input-3"
                        value={noofusers}
                        onChange={(event) => setNoofusers(event.target.value)}
                      />
                      {errors.noofusers && <span className="text-danger">{errors.noofusers}</span>}
                    </div>
                    <div className="form-group">
                      <label htmlFor="input-4">Price</label>
                      <input
                        type="number"
                        className="form-control"
                        id="input-4"
                        value={price}
                        onChange={(event) => setPrice(event.target.value)}
                      />
                      {errors.price && <span className="text-danger">{errors.price}</span>}
                    </div>
                    <div className="form-group">
                      <button type="button" className="btn btn-light px-5" onClick={handleUpdate}>
                        Edit
                      </button>
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

export default EditDonation;
