// import React, { useEffect, useState } from "react";
// import Uhead from "./Uhead";
// import Footer from "./Footer";
// import './track.css';

// function Track() {
//   const [donations, setDonations] = useState([]);
//   const [authenticated, setAuthenticated] = useState(
//     JSON.parse(localStorage.getItem("userdata"))
//   );

//   useEffect(() => {
//     if (authenticated && authenticated._id) {
//       fetchDonationDetails();
//     }
//   }, [authenticated]);

//   const fetchDonationDetails = () => {
//     fetch("http://localhost:3005/donors/track", {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ shelterid: authenticated._id })
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         setDonations(data);
//       })
//       .catch((error) => {
//         console.error("Error fetching donation details:", error);
//       });
//   };

//   const getStatusText = (status) => {
//     switch (status) {
//       case 1:
//         return "Started";
//       case 2:
//         return "On the way";
//       case 3:
//         return "Delivered";
//       default:
//         return "No response";
//     }
//   };

//   return (
//     <div>
//       <Uhead />
//       <div id="banner" className="banner full-screen-mode parallax">
//         <div className="container pr">
//           <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
//             <div className="banner-static">
//               <div className="banner-text">
//                 <div className="banner-cell">
//                   <div id="reservation" className="reservations-main pad-top-100 pad-bottom-100">
//                     <div className="container">
//                       <div className="row">
//                         <br />
//                         <br />
//                         <br />
//                         <div className="form-reservations-box">
//                           <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
//                             <div className="wow fadeIn" data-wow-duration="1s" data-wow-delay="0.1s">
//                               <h2 className="block-title text-center">
//                                 Show the track
//                               </h2>
//                               {donations.length > 0 ? (
//                                 donations.map((donation) => (
//                                   <div key={donation._id} className="col-12 col-md-10 hh-gray-box pt45 pb20">
//                                     <div className="track-steps">
//                                       <div className={`order-tracking ${donation.is_start >= 1 ? 'completed' : ''}`}>
//                                         <span className="is-complete"></span>
//                                         <p>Started<br /><span>{new Date(donation.createdAt).toDateString()}</span></p>
//                                       </div>
//                                       <div className={`order-tracking ${donation.is_start >= 2 ? 'completed' : ''}`}>
//                                         <span className="is-complete"></span>
//                                         <p>On the way<br /><span>{new Date(donation.createdAt).toDateString()}</span></p>
//                                       </div>
//                                       <div className={`order-tracking ${donation.is_start >= 3 ? 'completed' : ''}`}>
//                                         <span className="is-complete"></span>
//                                         <p>Delivered<br /><span>{new Date(donation.createdAt).toDateString()}</span></p>
//                                       </div>
//                                       <p>Status: {getStatusText(donation.is_start)}</p>
//                                     </div>
//                                   </div>
//                                 ))
//                               ) : (
//                                 <p>No donations found for tracking.</p>
//                               )}
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// }

// export default Track;


import React, { useEffect, useState } from "react";
import Uhead from "./Uhead";
import Footer from "./Footer";
import './track.css';

function Track() {
  const [donations, setDonations] = useState([]);
  const [authenticated, setAuthenticated] = useState(
    JSON.parse(localStorage.getItem("userdata"))
  );

  useEffect(() => {
    if (authenticated && authenticated._id) {
      fetchDonationDetails();
    }
  }, [authenticated]);

  const fetchDonationDetails = () => {
    fetch("http://localhost:3005/donors/track", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ shelterid: authenticated._id })
    })
      .then((res) => res.json())
      .then((data) => {
        // Filter out donations that have been delivered (is_start === 3)
        const filteredDonations = data.filter(donation => donation.is_start < 3);
        setDonations(filteredDonations);
      })
      .catch((error) => {
        console.error("Error fetching donation details:", error);
      });
  };

  const getStatusText = (status) => {
    switch (status) {
      case 1:
        return "Started";
      case 2:
        return "On the way";
      case 3:
        return "Delivered";
      default:
        return "No response";
    }
  };

  return (
    <div>
      <Uhead />
      <div id="banner" className="banner full-screen-mode parallax">
        <div className="container pr">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div className="banner-static">
              <div className="banner-text">
                <div className="banner-cell">
                  <div id="reservation" className="reservations-main pad-top-100 pad-bottom-100">
                    <div className="container">
                      <div className="row">
                        <br />
                        <br />
                        <br />
                        <div className="form-reservations-box">
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div className="wow fadeIn" data-wow-duration="1s" data-wow-delay="0.1s">
                              <h2 className="block-title text-center">
                                Show the track
                              </h2>
                              {donations.length > 0 ? (
                                donations.map((donation) => (
                                  <div key={donation._id} className="col-12 col-md-10 hh-gray-box pt45 pb20">
                                    <div className="track-steps">
                                      <div className={`order-tracking ${donation.is_start >= 1 ? 'completed' : ''}`}>
                                        <span className="is-complete"></span>
                                        <p>Started<br /><span>{new Date(donation.createdAt).toDateString()}</span></p>
                                      </div>
                                      <div className={`order-tracking ${donation.is_start >= 2 ? 'completed' : ''}`}>
                                        <span className="is-complete"></span>
                                        <p>On the way<br /><span>{new Date(donation.createdAt).toDateString()}</span></p>
                                      </div>
                                      <div className={`order-tracking ${donation.is_start >= 3 ? 'completed' : ''}`}>
                                        <span className="is-complete"></span>
                                        <p>Delivered<br /><span>{new Date(donation.createdAt).toDateString()}</span></p>
                                      </div>
                                      <p>Status: {getStatusText(donation.is_start)}</p>
                                    </div>
                                  </div>
                                ))
                              ) : (
                                <p>No donations found for tracking.</p>
                              )}
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
      </div>
      <Footer />
    </div>
  );
}

export default Track;
