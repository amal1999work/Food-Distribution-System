import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from './Admin/Signin';

import Donours from "./Admin/Donours";
import Shelters from "./Admin/Shelters";
import Shelter_view from "./Admin/Shelter_view";
// import Registration from "./Admin/Registration";


import Donor_profile from "./Donors/Donor_profile";
import Donor_registration from "./Admin/Donor_registration";
import Userfeedback from "./Admin/Userfeedback";
import { useState } from "react";

import Shelterdetails from "./Donors/Shelterdetails";
import AddDonation from "./Donors/AddDonation";
import Donationview from "./Donors/Donationview";
import EditDonation from "./Donors/EditDonation";
import ViewShelter from "./Donors/ViewShelter";
import ViewFeedback from "./Donors/ViewFeedback";
import Upload from "./Admin/Upload";
import AppShelter from "./Admin/AppShelter";
import RejShelters from "./Admin/RejShelters";
import AppDonor from "./Admin/AppDonor";
import RejDonors from "./Admin/RejDonors";
import CloseDonation from "./Donors/CloseDonation";
import Chats from "./Donors/Chats";
import PendingDona from "./Donors/PendingDona";
import Donations from "./Admin/Donations";
import Download from "./Admin/Download";


function App() {
  const [authenticated, setAuthenticated] = useState(JSON.parse(localStorage.getItem("userdata")));

  console.log("authenticated:", authenticated); 
  return (
    <BrowserRouter>
{authenticated == null ? (
        <Routes>
          <Route path="/" element={<Signin/>} />
          <Route path="/donorregistration" element={<Donor_registration/>}/>
        </Routes>
      ) : authenticated.userstatus === 0 ? (
        <Routes>
           <Route path="/" element={<Shelters/>}/>
           <Route path="/appshel" element={<AppShelter/>} />
           <Route path="/rejshel" element={<RejShelters/>} />
           <Route path="/donors" element={<Donours/>}/>   
           <Route path="/appdonor" element={<AppDonor/>} />
           <Route path="/rejdonor" element={<RejDonors/>} />
           <Route path="/donation" element={<Donations/>}/>
        <Route path="/shelterview" element={<Shelter_view/>}/>
        <Route path="/download" element={<Download/>}/>
        <Route path ="/upload" element={<Upload/>} />
      
        <Route path="/feedback" element={<Userfeedback/>}/> 
        </Routes>
      ) : authenticated.userstatus === 1 ? (
        <Routes>
          <Route path="/" element={<Shelterdetails/>}/> 
          <Route path="/donorprofile" element={<Donor_profile/>}/> 
          <Route path="/adddonations" element={<AddDonation/>}/>
           <Route path="/donationview" element={<Donationview/>}/>
           <Route path="/penddona" element={<PendingDona/>}/>
           <Route path="/closedona" element={<CloseDonation/>} />
           <Route path="/editdonation" element={<EditDonation/>}/>
           <Route path="/shelterviewform" element={<ViewShelter/>}/>
           <Route path="/reviewss" element={<ViewFeedback/>}/>
           <Route path="/chats" element={<Chats/>}/>
        </Routes>
      ) : (
        <>
          <Routes></Routes>
        </>
      )} 
    </BrowserRouter>
  );
}

export default App;
