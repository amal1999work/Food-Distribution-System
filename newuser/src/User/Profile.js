import React, { useEffect, useState } from 'react';
import Uhead from './Uhead'
import './profile.css';
import { Link } from 'react-router-dom';
import Footer from './Footer'

function Profile() {
  const [authenticated, setAuthenticated] = useState(JSON.parse(localStorage.getItem('userdata')));
  const [shelter, setShelter] = useState(null);
  

  useEffect(() => {
      console.log('Authenticated user:', authenticated);  
      if (authenticated && authenticated._id) {
          fetch(`http://localhost:3005/shelter/profileview/${authenticated._id}`)
              .then(response => response.json())
              .then(data => {
                  setShelter(data);
                  console.log('shelter data:', data);  
                  
              })
              .catch(error => console.error('Error fetching shelter details:', error));
      }
  }, [authenticated]);

  return (
    <div>
      <Uhead />
      <div id="banner" class="banner full-screen-mode parallax">
        <div class="container pr">
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div class="banner-static">
                    <div class="banner-text">
                        <div class="banner-cell">



                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
                   <Footer/>  
    </div>
  )
}

export default Profile
