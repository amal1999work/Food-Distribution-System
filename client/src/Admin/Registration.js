// // import React, { useState } from 'react'

// // import { Link, useNavigate } from 'react-router-dom'

// // function Registration() {
// //   const [sheltername, setSheltername] = useState('');
// //   const [place, setPlace] = useState('');
// //   const [ownername, setOwnername] = useState(''); // Added useState
// //   const [email, setEmail] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [contact, setContact] = useState('');
// //   const [licenseno, setLicenseno] = useState('');
// //   const navigate=useNavigate();

  
// //   const handleFormSubmit = () => {
  

    
// //     let params={
// //       "sheltername":sheltername,
// //       "place":place,
// //       "ownername":ownername,
// //       "licenseno":licenseno,
// //       "email":email,
// //       "password":password,
// //       "contact":contact,
// //       "userstatus":"2",
    
// //       //  "pdf":sheltpdf

// //     }


// //     fetch('http://localhost:3005/shelter/addShelter', {
// //       method: 'POST',
// //       headers:{
// //         Accept:'application/json',
// //         'Content-Type':'application/json'
// //       },
// //       body:JSON.stringify(params)
// //     })
// //     .then(res => res.json())
// //     .then(result => {
// //       console.log(result);
// //       navigate('/')
// //     })
// //     .catch(error => {
// //       console.error('Registration failed:', error);
// //     });
// //   };;

// //   return (
// //     <div>     
// //         <div class="container-fluid">
// //           <div class="row px-5 py-5">
// //             <div class="col-lg-10">
// //               <div class="card "style={{marginLeft:'200px'}}>
// //                 <div class="card-body">
// //                   <div class="card-title">REGISTRATION</div>
// //                   <hr />
// //                   <form>
// //                     <div class="form-group">
// //                       <label for="input-1"> SHELTER Name</label>
// //                       <input type="text" class="form-control" id="input-1"  placeholder="enter shelter name" onChange={(event)=>setSheltername(event.target.value)} />
// //                     </div>
// //                     <div class="form-group">
// //                       <label for="input-2">shelter location</label>
// //                       <input type="text" class="form-control" id="input-2" placeholder='enter shelter location' onChange={(event)=>setPlace(event.target.value)} />
// //                     </div>
// //                     <div class="form-group">
// //                       <label for="input-3">shelter owner name</label>
// //                       <input type="text" class="form-control" id="input-3"  placeholder="enter shelter owner name" onChange={(event)=>setOwnername(event.target.value)} />
// //                     </div>
// //                     <div class="form-group">
// //                       <label for="input-5">CONTACT</label>
// //                       <input type="number" class="form-control" id="input-5" placeholder='enter the contact number' onChange={(event)=>setContact(event.target.value)}/>
// //                     </div>
// //                     <div class="form-group">
// //                       <label for="input-4">EMAIL</label>
// //                       <input type="email" class="form-control" id="input-4" placeholder='enter the email' onChange={(event)=>setEmail(event.target.value)}/>
// //                     </div>
// //                     <div class="form-group">
// //                       <label for="input-5">PASSWORD</label>
// //                       <input type="password" class="form-control" id="input-5" placeholder='enter the password'onChange={(event)=>setPassword(event.target.value)} />
// //                     </div>
// //                     <div class="form-group">
// //                       <label for="input-5">LICENCE.NO</label>
// //                       <input type="text" class="form-control" id="input-5" placeholder='enter the password' onChange={(event) => setLicenseno(event.target.value)} />
// //                     </div>
                   
                    
// //                     <div class="form-group">
// //                     <button type="button" class="btn btn-light px-5" onClick={handleFormSubmit}>
// //                         {" "}
// //                         Register
// //                       </button>
// //                     </div>
// //                   </form>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
    
    
// //   )
// // }

// // export default Registration;


// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// function Registration() {
//   const [sheltername, setSheltername] = useState('');
//   const [place, setPlace] = useState('');
//   const [ownername, setOwnername] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [contact, setContact] = useState('');
//   const [licenseno, setLicenseno] = useState('');
//   const [errors, setErrors] = useState({});
//   const navigate = useNavigate();

//   const validateForm = () => {
//     const newErrors = {};

//     if (!sheltername) newErrors.sheltername = 'Shelter name is required';
//     if (!place) newErrors.place = 'Shelter location is required';
//     if (!ownername) newErrors.ownername = 'Shelter owner name is required';
//     if (!email) {
//       newErrors.email = 'Email is required';
//     } else if (!/\S+@\S+\.\S+/.test(email)) {
//       newErrors.email = 'Email address is invalid';
//     }
//     if (!password) {
//       newErrors.password = 'Password is required';
//     } else if (password.length < 6) {
//       newErrors.password = 'Password must be at least 6 characters';
//     }
//     if (!contact) {
//       newErrors.contact = 'Contact number is required';
//     } else if (!/^\d{10}$/.test(contact)) {
//       newErrors.contact = 'Contact number is invalid';
//     }
//     if (!licenseno) newErrors.licenseno = 'License number is required';

//     return newErrors;
//   };

//   const handleFormSubmit = () => {
//     const validationErrors = validateForm();
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }

//     let params = {
//       sheltername,
//       place,
//       ownername,
//       licenseno,
//       email,
//       password,
//       contact,
//       userstatus: '2',
//     };

//     fetch('http://localhost:3005/shelter/addShelter', {
//       method: 'POST',
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(params),
//     })
//       .then((res) => res.json())
//       .then((result) => {
//         console.log(result);
//         navigate('/');
//       })
//       .catch((error) => {
//         console.error('Registration failed:', error);
//       });
//   };

//   return (
//     <div>
//       <div className="container-fluid">
//         <div className="row px-5 py-5">
//           <div className="col-lg-10">
//             <div className="card" style={{ marginLeft: '200px' }}>
//               <div className="card-body">
//                 <div className="card-title">REGISTRATION</div>
//                 <hr />
//                 <form>
//                   <div className="form-group">
//                     <label htmlFor="input-1">SHELTER Name</label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       id="input-1"
//                       placeholder="Enter shelter name"
//                       onChange={(event) => setSheltername(event.target.value)}
//                     />
//                     {errors.sheltername && <span className="text-danger">{errors.sheltername}</span>}
//                   </div>
//                   <div className="form-group">
//                     <label htmlFor="input-2">Shelter location</label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       id="input-2"
//                       placeholder="Enter shelter location"
//                       onChange={(event) => setPlace(event.target.value)}
//                     />
//                     {errors.place && <span className="text-danger">{errors.place}</span>}
//                   </div>
//                   <div className="form-group">
//                     <label htmlFor="input-3">Shelter owner name</label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       id="input-3"
//                       placeholder="Enter shelter owner name"
//                       onChange={(event) => setOwnername(event.target.value)}
//                     />
//                     {errors.ownername && <span className="text-danger">{errors.ownername}</span>}
//                   </div>
//                   <div className="form-group">
//                     <label htmlFor="input-5">CONTACT</label>
//                     <input
//                       type="number"
//                       className="form-control"
//                       id="input-5"
//                       placeholder="Enter the contact number"
//                       onChange={(event) => setContact(event.target.value)}
//                     />
//                     {errors.contact && <span className="text-danger">{errors.contact}</span>}
//                   </div>
//                   <div className="form-group">
//                     <label htmlFor="input-4">EMAIL</label>
//                     <input
//                       type="email"
//                       className="form-control"
//                       id="input-4"
//                       placeholder="Enter the email"
//                       onChange={(event) => setEmail(event.target.value)}
//                     />
//                     {errors.email && <span className="text-danger">{errors.email}</span>}
//                   </div>
//                   <div className="form-group">
//                     <label htmlFor="input-5">PASSWORD</label>
//                     <input
//                       type="password"
//                       className="form-control"
//                       id="input-5"
//                       placeholder="Enter the password"
//                       onChange={(event) => setPassword(event.target.value)}
//                     />
//                     {errors.password && <span className="text-danger">{errors.password}</span>}
//                   </div>
//                   <div className="form-group">
//                     <label htmlFor="input-5">LICENCE.NO</label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       id="input-5"
//                       placeholder="Enter the license number"
//                       onChange={(event) => setLicenseno(event.target.value)}
//                     />
//                     {errors.licenseno && <span className="text-danger">{errors.licenseno}</span>}
//                   </div>
//                   <div className="form-group">
//                     <button type="button" className="btn btn-light px-5" onClick={handleFormSubmit}>
//                       Register
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Registration;
