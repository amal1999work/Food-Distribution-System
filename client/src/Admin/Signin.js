

import React, { useState } from "react";
import { Link } from "react-router-dom";

function Signin() {
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
      const param = {
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
            if (data.userstatus === 0 || (data.userstatus === 1 && data.is_request === 1)) {
              localStorage.setItem("userdata", JSON.stringify(data));
              window.location.href = '/';
            } else {
              alert("Unauthorized login:Admin is not permitted.");
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
    <div id="wrapper">
      <div className="loader-wrapper">
        <div className="lds-ring"></div>
        <div className="card card-authentication1 mx-auto my-5">
          <div className="card-body">
            <div className="card-content p-2">
              <div className="text-center">
                <img src="assets/images/new.png" height="100px" width="100px" alt="logo icon" />
              </div>
              <div className="card-title text-uppercase text-center py-3">
                Sign In
              </div>
              <form>
                <div className="form-group">
                  <label htmlFor="exampleInputUsername" className="sr-only">
                    Username
                  </label>
                  <div className="position-relative has-icon-right">
                    <input
                      type="email"
                      onChange={(event) => setEmail(event.target.value)}
                      id="exampleInputUsername"
                      className="form-control input-shadow"
                      placeholder="Enter Username"
                    />
                    <div className="form-control-position">
                      <i className="icon-user"></i>
                    </div>
                    {errors.email && <div className="text-danger">{errors.email}</div>}
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword" className="sr-only">
                    Password
                  </label>
                  <div className="position-relative has-icon-right">
                    <input
                      type="password"
                      id="exampleInputPassword"
                      className="form-control input-shadow"
                      placeholder="Enter Password"
                      onChange={(event) => setPassword(event.target.value)}
                    />
                    <div className="form-control-position">
                      <i className="icon-lock"></i>
                    </div>
                    {errors.password && <div className="text-danger">{errors.password}</div>}
                  </div>
                </div>
                {/* <div class="form-row">
                  <div class="form-group col-6">
                    <div class="icheck-material-white">
                            <input type="checkbox" id="user-checkbox" checked="" />
                            <label for="user-checkbox">Remember me</label>
                    </div>
                  </div>
                  <div class="form-group col-6 text-right">
                    <a href="#">Reset Password</a>
                  </div>
			          </div> */}
                <button type="button" class="btn btn-light btn-block"  onClick={login}>Sign In</button>
                {/* <div className="form-row mt-4">
                  <div className="form-group mb-0 col-6">
                    <button type="button" className="btn btn-light btn-block" style={{ marginLeft: '80px' }} onClick={login}>
                      Log In
                    </button>
                  </div>
                </div> */}
                
                {/* <div className="form-row mt-4">Don't Have an Account, &nbsp;
                    <Link to='/donorregistration'>
                    <h6 style={{ color: 'red' }}>Register here</h6>
                    </Link>
                </div> */}
              </form>
            </div>
          </div>
          <div class="card-footer text-center py-3">
          
		    <p class="text-warning mb-0">Do not have an account? <Link to='/donorregistration'> Sign Up here</Link></p>
                        
      </div>
        </div>     
      </div>
    </div>
  );
}

export default Signin;
