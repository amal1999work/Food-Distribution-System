import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Homes from "./User/Homes";
import Login from "./User/Login";
import Registration from "./User/Registration";
import Home from "./User/Home";
import Review from "./User/Review";
import Profile from "./User/Profile";
import ViewDonors from "./User/ViewDonors";
import Viewdonationlist from "./User/Viewdonationlist";
import History from "./User/History";
import Chat from "./User/Chat";
import Track from "./User/Track";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homes/>} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/donation" element={<ViewDonors/>}/>
        <Route path="/review" element={<Review/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/register" element={<Registration/>}/>
        <Route path="/lists" element={<Viewdonationlist/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/history" element={<History/>}/>
        <Route path="/chat" element={<Chat/>}/>
        <Route path="/track" element={<Track/>}/>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
