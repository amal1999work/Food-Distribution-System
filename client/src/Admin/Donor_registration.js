import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function DonorRegistration() {
  const navigate = useNavigate();
  const [donorname, setDonorname] = useState('');
  const [place, setPlace] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [contact, setContact] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const loadScript = () => {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY`;
      script.async = true;
      script.defer = true;
      script.onload = initMap;
      document.head.appendChild(script);
    };

    const initMap = () => {
      const map = new window.google.maps.Map(document.getElementById("map"), {
        center: { lat: 20.5937, lng: 78.9629 }, // Coordinates for India
        zoom: 5, // Suitable zoom level to cover India
      });

      const marker = new window.google.maps.Marker({
        map: map,
      });

      map.addListener("click", (event) => {
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();
        setLatitude(lat);
        setLongitude(lng);
        marker.setPosition({ lat, lng });
      });
    };

    if (!window.google) {
      loadScript();
    } else {
      initMap();
    }
  }, []);


  const validate = () => {
    const newErrors = {};
    if (!donorname) newErrors.donorname = 'Donor name is required';
    if (!place) newErrors.place = 'Location is required';
    if (!email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid';
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (!contact) newErrors.contact = 'Contact number is required';
    else if (!/^\d{10}$/.test(contact)) newErrors.contact = 'Contact number is invalid';
    return newErrors;
  };

  const handleFormSubmit = () => {
    const formErrors = validate();
    if (Object.keys(formErrors).length === 0) {
      let params = {
        donorname,
        place,
        email,
        password,
        contact,
        latitude,
        longitude,
        userstatus: '1',
      };
      fetch('http://localhost:3005/donors/adddonor', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          navigate('/');
        })
        .catch((error) => {
          console.error('Registration failed:', error);
        });
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <div>
      <div className="container-fluid">
        <div className="row px-5 py-5">
          <div className="col-lg-10">
            <div className="card" style={{ marginLeft: '200px' }}>
              <div className="card-body">
                <div className="card-title">REGISTRATION</div>
                <hr />
                <form>
                  <div className="form-group">
                    <label htmlFor="input-1">DONOR Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="input-1"
                      placeholder="Enter donor name"
                      onChange={(event) => {
                        setDonorname(event.target.value);
                      }}
                    />
                    {errors.donorname && <div className="text-danger">{errors.donorname}</div>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="input-2">Location</label>
                    <input
                      type="text"
                      className="form-control"
                      id="input-2"
                      placeholder="Enter location"
                      onChange={(event) => {
                        setPlace(event.target.value);
                      }}
                    />
                    {errors.place && <div className="text-danger">{errors.place}</div>}
                  </div>
                  <div id="map" style={{ height: "200px", width: "100%", marginTop: "20px" }}></div>
                  <div className="form-group">
                    <label htmlFor="input-5">Contact</label>
                    <input
                      type="number"
                      className="form-control"
                      id="input-5"
                      placeholder="Enter the contact number"
                      onChange={(event) => {
                        setContact(event.target.value);
                      }}
                    />
                    {errors.contact && <div className="text-danger">{errors.contact}</div>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="input-4">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="input-4"
                      placeholder="Enter the email"
                      onChange={(event) => {
                        setEmail(event.target.value);
                      }}
                    />
                    {errors.email && <div className="text-danger">{errors.email}</div>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="input-5">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="input-5"
                      placeholder="Enter the password"
                      onChange={(event) => {
                        setPassword(event.target.value);
                      }}
                    />
                    {errors.password && <div className="text-danger">{errors.password}</div>}
                  </div>
                  <div className="form-group">
                    <button type="button" className="btn btn-light px-5" onClick={handleFormSubmit}>
                      Register
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DonorRegistration;
