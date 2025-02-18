import { useState } from "react";
import { Link } from "react-router-dom";
import Head from './Head'
import Footer from './Footer'

function Login() {
    const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 3) {
      newErrors.password = "Password must be at least 3 characters long";
    }
    return newErrors;
  };

  const login = () => {
    const formErrors = validate();
    if (Object.keys(formErrors).length === 0) {
      let param = {
        email: email,
        password: password,
      };
      fetch("http://localhost:3005/shelter/login", {
        method: "POST",
        body: JSON.stringify(param),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log('data', data);
          if (data !== 'invalid') {
            if (data.userstatus === 2) {
              localStorage.setItem("userdata", JSON.stringify(data));
              window.location.href = '/home';
            } else {
              alert("You are not authorized to log in.");
            }
          } else {
            alert("Invalid email or password");
          }
        })
        .catch((error) => {
          console.error("Login failed:", error);
        });
    } else {
      setErrors(formErrors);
      if (formErrors.email) {
        alert(formErrors.email);
      }
      if (formErrors.password) {
        alert(formErrors.password);
      }
    }
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
            <div class="row"><br /><br /><br />
                <div class="form-reservations-box">
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div class="wow fadeIn" data-wow-duration="1s" data-wow-delay="0.1s">
                            <h2 class="block-title text-center">
						Login			
					</h2>
                        </div>
                        
                        <form id="contact-form" method="post" class="reservations-box" name="contactform">
                            <div class="col-lg-12 col-md-6 col-sm-6 col-xs-12">
                                <div class="form-box">
                                    <input type="email" placeholder="E-Mail ID" required="required" data-error="E-mail id is required."
                                    onChange={(event) => setEmail(event.target.value)}/>
                                </div>
                            </div>
                            <div class="col-lg-12 col-md-6 col-sm-6 col-xs-12">
                                <div class="form-box">
                                    <input type="password" placeholder="Password" required="required" data-error="Password is required."
                                    onChange={(event) => setPassword(event.target.value)}/>
                                </div>
                            </div>
                            <div class="col-lg-12 col-md-6 col-sm-6 col-xs-12">
                                <div class="reserve-book-btn text-center">
                                    <button class="hvr-underline-from-center" type="submit"  onClick={login}>Login </button>
                                </div>
                            </div>
                            <div class="col-lg-12 col-md-6 col-sm-6 col-xs-12">
                                <div class="reserve-book-btn text-center">
                                    Don't have an Account? <Link to="#"> <p>Create One</p></Link>
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
            </div>
        </div>
    </div>
    <Footer />
    </div>
  )
}

export default Login
