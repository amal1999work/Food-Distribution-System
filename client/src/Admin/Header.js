// import React from "react";
// import { Link, useNavigate } from "react-router-dom";

// function Header() {
//   const userdata = JSON.parse(localStorage.getItem("userdata"));
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.clear();
//     setTimeout(() => {
//       navigate('/');
//       window.location.reload();
//     }, 100);
//   };

//   return (
//     <div>
//       <header className="topbar-nav">
//         <nav className="navbar navbar-expand fixed-top">
//           <a href="index.html">
//             <img
//               src="assets/images/logo-icon.png"
//               className="logo-icon"
//               alt="logo icon"
//             />
//             <h5 className="logo-text">Food Redistribution</h5>
//           </a>

//           <ul className="navbar-nav mr-auto align-items-center"></ul>

//           <ul className="navbar-nav align-items-center right-nav-link">
//             <li className="nav-item dropdown-lg">
//               <a
//                 className="nav-link dropdown-toggle dropdown-toggle-nocaret waves-effect"
//                 data-toggle="dropdown"
//                 href="#"
//               >
//                 <i className="fa fa-bell-o"></i>
//               </a>
//             </li>

//             <li className="nav-item">
//               <a
//                 className="nav-link dropdown-toggle dropdown-toggle-nocaret"
//                 data-toggle="dropdown"
//                 href="#"
//               >
//                 {userdata?.userstatus === 0 ? (
//                   <span className="user-profile" style={{ visibility: 'hidden' }}>
//                     <img
//                       src="https://via.placeholder.com/110x110"
//                       className="img-circle"
                    
//                     />
//                   </span>
//                 ) : (
//                   <span className="user-profile">
//                     <Link to={'/donorprofile'}>
//                       <img
//                         src="https://via.placeholder.com/110x110"
//                         className="img-circle"
            
//                       />
//                     </Link>
//                   </span>
//                 )}
//               </a>
//               <ul className="dropdown-menu dropdown-menu-right">
//                 <li className="dropdown-item user-details">
//                   <a href="javascript:void();">
//                     <div className="media">
//                       <div className="avatar">
//                         <img
//                           className="align-self-start mr-3"
//                           src="https://via.placeholder.com/110x110"
//                           alt="user avatar"
//                         />
//                       </div>
//                     </div>
//                   </a>
//                 </li>
//               </ul>
//             </li>
//             <li className="nav-item">
//               <a className="nav-link waves-effect" href="#" style={{ fontSize: 'medium' }} onClick={handleLogout}>Logout</a>
//             </li>
//           </ul>
//         </nav>
//       </header>
//     </div>
//   );
// }

// export default Header;


import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

function Header() {
  const userdata = JSON.parse(localStorage.getItem("userdata"));
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);

  const handleLogout = () => {
    localStorage.clear();
    setTimeout(() => {
      navigate('/');
      window.location.reload();
    }, 100);
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      if (userdata) {
        try {
          const response = await axios.post('http://localhost:3005/donors/getnotification', {
            donorId: userdata._id
          });
          setNotifications(response.data);
          console.log(response.data)
        } catch (error) {
          console.error("Error fetching notifications:", error);
        }
      }
    };

    fetchNotifications();
  }, [userdata]);

  return (
    <div>
      <header className="topbar-nav">
        <nav className="navbar navbar-expand fixed-top">
          <a href="index.html">
            <img
              src="assets/images/new.png" height='75px' width='75px'
              alt="logo icon"
            />
            <h5 className="logo-text">Serve The Needy</h5>
          </a>

          <ul className="navbar-nav mr-auto align-items-center"></ul>

          <ul className="navbar-nav align-items-center right-nav-link">
            <li className="nav-item dropdown-lg">
              <a
                className="nav-link dropdown-toggle dropdown-toggle-nocaret waves-effect"
                data-toggle="dropdown"
                href="#"
              >
                <i className="fa fa-bell-o"></i>
                {notifications.length > 0 && (
                  <span className="badge badge-danger">{notifications.length}</span>
                )}
              </a>
              <div className="dropdown-menu dropdown-menu-right" style={{backgroundColor:'red'}}>
                {notifications.length > 0 ? (
                  notifications.map((notification, index) => (
                    <div key={index} className="dropdown-item">
                      {notification.notification}
                    </div>
                  ))
                ) : (
                  <div className="dropdown-item">No notifications</div>
                )}
              </div>
            </li>

            <li className="nav-item">
              <a
                className="nav-link dropdown-toggle dropdown-toggle-nocaret"
                data-toggle="dropdown"
                href="#"
              >
                {userdata?.userstatus === 0 ? (
                  <span className="user-profile" >
                    <Link to={'/adminprofile'}>
                    <img
                      src="https://via.placeholder.com/110x110"
                      className="img-circle"
                    />
                    </Link>
                  </span>
                ) : (
                  <span className="user-profile">
                    <Link to={'/donorprofile'}>
                      <img
                        src="https://via.placeholder.com/110x110"
                        className="img-circle"
                      />
                    </Link>
                  </span>
                )}
              </a>
              <ul className="dropdown-menu dropdown-menu-right">
                <li className="dropdown-item user-details">
                  <a href="javascript:void();">
                    <div className="media">
                      <div className="avatar">
                        <img
                          className="align-self-start mr-3"
                          src="https://via.placeholder.com/110x110"
                          alt="user avatar"
                        />
                      </div>
                    </div>
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <a className="nav-link waves-effect" href="#" style={{ fontSize: 'medium' }} onClick={handleLogout}>Logout</a>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
}

export default Header;

