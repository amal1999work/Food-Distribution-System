import React, { useState } from 'react';
import Header from '../Admin/Header';
import Sidebar from '../Admin/Sidebar';
import { useNavigate } from 'react-router-dom';

function AddDonation() {
    const [authenticated, setAuthenticated] = useState(
        JSON.parse(localStorage.getItem("userdata"))
    );
    const [donationname, setdonationname] = useState("");
    const [quantity, setquantity] = useState("");
    const [price, setPrice] = useState("");
    const [noofusers, setnoofusers] = useState("");
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const validate = () => {
        const newErrors = {};
        if (!donationname) newErrors.donationname = "Donation item is required";
        if (!quantity) newErrors.quantity = "Quantity is required";
        if (!price) newErrors.price = "Price is required";
        if (!noofusers) newErrors.noofusers = "Number of people is required";
        return newErrors;
    };

    const save = () => {
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        let params = {
            donationname: donationname,
            quantity: quantity,
            noofusers: noofusers,
            price: price,
            donorid: authenticated._id
        }
        fetch('http://localhost:3005/donors/adddonation', {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        }).then((res) => res.json()).then((result) => {
            console.log(result);
            navigate('/donationview');
        })
    }

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
                                    <div className="card-title">Add donations</div>
                                    <hr />
                                    <form>
                                        <div className="form-group">
                                            <label htmlFor="input-1">Donation item</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="input-1"
                                                value={donationname}
                                                onChange={(event) => { setdonationname(event.target.value); setErrors({ ...errors, donationname: "" }); }}
                                            />
                                            {errors.donationname && <small className="text-danger">{errors.donationname}</small>}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="input-2">Quantity</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="input-2"
                                                value={quantity}
                                                onChange={(event) => { setquantity(event.target.value); setErrors({ ...errors, quantity: "" }); }}
                                            />
                                            {errors.quantity && <small className="text-danger">{errors.quantity}</small>}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="input-3">Amount of peoples</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                id="input-3"
                                                value={noofusers}
                                                onChange={(event) => { setnoofusers(event.target.value); setErrors({ ...errors, noofusers: "" }); }}
                                            />
                                            {errors.noofusers && <small className="text-danger">{errors.noofusers}</small>}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="input-4">Price</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                id="input-4"
                                                value={price}
                                                onChange={(event) => { setPrice(event.target.value); setErrors({ ...errors, price: "" }); }}
                                            />
                                            {errors.price && <small className="text-danger">{errors.price}</small>}
                                        </div>
                                        <div className="form-group">
                                            <button type="button" className="btn btn-light px-5" onClick={save}>
                                                Add donation
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
    )
}

export default AddDonation;
