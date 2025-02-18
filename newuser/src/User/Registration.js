
import { Link } from "react-router-dom";
import Head from './Head'
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from './Footer'

function Registration() {
    const [sheltername, setSheltername] = useState('');
    const [place, setPlace] = useState('');
    const [ownername, setOwnername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [contact, setContact] = useState('');
    const [licenseno, setLicenseno] = useState('');
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    
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
  
    const validateForm = () => {
      const newErrors = {};
  
      if (!sheltername) newErrors.sheltername = 'Shelter name is required';
      if (!place) newErrors.place = 'Shelter location is required';
      if (!ownername) newErrors.ownername = 'Shelter owner name is required';
      if (!email) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        newErrors.email = 'Email address is invalid';
      }
      if (!password) {
        newErrors.password = 'Password is required';
      } else if (password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
      }
      if (!contact) {
        newErrors.contact = 'Contact number is required';
      } else if (!/^\d{10}$/.test(contact)) {
        newErrors.contact = 'Contact number is invalid';
      }
      if (!licenseno) newErrors.licenseno = 'License number is required';
  
      return newErrors; 
    };
    const fileUpload = (e) => {
      let file = e.target.files[0];
      let formData = new FormData();
      formData.append("file", file);
      fetch("http://localhost:3005/utils/fileupload", {
          method: "POST",
          body: formData,
      })
      .then((res) => res.json())
      .then((result) => {
        setLicenseno(result.path); // Save the uploaded file path
      })
      .catch((err) => {
          console.error("Error uploading file:", err);
        
      });
  };

    const handleFormSubmit = (event) => {
      event.preventDefault();
      const validationErrors = validateForm();
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }
  
      const params = {
        sheltername,
        place,
        ownername,
        licenseno,
        email,
        password,
        contact,
        latitude,
        longitude,
        userstatus: '2',
      };
  
      fetch('http://localhost:3005/shelter/addShelter', {
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
    };
  return (
    <div>
        <Head />

        <div id="banner" class="banner full-screen-mode parallax">
        <div class="container pr">
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div class="banner-static">
                    <div class="banner-text">
                        <div class="banner-cell">
                            

                        <div id="reservation" class="reservations-main pad-top-100 pad-bottom-100">
        <div class="container">
            <div class="row"><br />
                <div class="form-reservations-box">
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div class="wow fadeIn" data-wow-duration="1s" data-wow-delay="0.1s">
                            <h2 class="block-title text-center">
						Registration			
					</h2>
                        </div>
                        
                        <form method="post" onSubmit={handleFormSubmit}>

                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <div class="form-box">
                                    <input type="text" placeholder="Shelter Name" required="required" data-error="E-mail id is required."
                                    value={sheltername}
                                    onChange={(event) => setSheltername(event.target.value)}/>
                                    {errors.sheltername && <span className="text-danger">{errors.sheltername}</span>}
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <div class="form-box">
                                    <input type="text" placeholder="Owner Name" required="required" data-error="E-mail id is required."
                                    value={ownername}
                                    onChange={(event) => setOwnername(event.target.value)}/>
                                    {errors.ownername && <span className="text-danger">{errors.ownername}</span>}
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <div class="form-box">
                                    <input type="file" placeholder="License No" required="required" data-error="E-mail id is required."
                                  
                                    onChange={fileUpload}/>
                                    {errors.licenseno && <span className="text-danger">{errors.licenseno}</span>}
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <div class="form-box">
                                    <input type="text" placeholder="Place" required="required" data-error="E-mail id is required."
                                    value={place}
                                    onChange={(event) => setPlace(event.target.value)}/>
                                    {errors.place && <span className="text-danger">{errors.place}</span>}
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <div id="map" style={{ height: "200px", width: "100%" }}></div>
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <div class="form-box">
                                    <input type="text" placeholder="Enter Contact" required="required" data-error="E-mail id is required."
                                    value={contact}
                                    onChange={(event) => setContact(event.target.value)}/>
                                    {errors.contact && <span className="text-danger">{errors.contact}</span>}
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <div class="form-box">
                                    <input type="email" placeholder="E-Mail ID" required="required" data-error="E-mail id is required."
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}/>
                                    {errors.email && <span className="text-danger">{errors.email}</span>}
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <div class="form-box">
                                    <input type="password" placeholder="Password" required="required" data-error="Password is required."
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}/>
                                    {errors.password && <span className="text-danger">{errors.password}</span>}
                                </div>
                            </div>
                            <div class="col-lg-12 col-md-6 col-sm-6 col-xs-12">
                                <div class="reserve-book-btn text-center">
                                <button type="submit" className="btn btn-primary">Register</button>
                                </div>
                            </div>



                            {/* <div class="col-lg-12 col-md-6 col-sm-6 col-xs-12">
                                <div class="reserve-book-btn text-center">
                                    Already have an Account? <Link to="#"> <p>Sign In</p></Link>
                                </div>
                            </div> */}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>



                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
        <Footer />
    </div>
  )
}

export default Registration
