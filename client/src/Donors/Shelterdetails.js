
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Sidebar from "../Admin/Sidebar";
import Header from "../Admin/Header";

function Shelterdetails() {
  const [shelters, setShelters] = useState([]);
  const [filteredShelters, setFilteredShelters] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [location, setLocation] = useState(null);
  const [requestedShelters, setRequestedShelters] = useState([]);
  const authenticated = JSON.parse(localStorage.getItem("userdata"));

  useEffect(() => {
    fetch("http://127.0.0.1:3005/shelter/shelterview")
      .then((res) => res.json())
      .then((result) => {
        setShelters(result);
        setFilteredShelters(result); 
      })
      .catch((error) => {
        console.error("Error fetching shelters:", error);
      });
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyCWED24ut0NZVXBKwkiynWByxmjj__fVcw&libraries=places";
    script.async = true;
    script.onload = initializeAutocomplete;
    script.onerror = () => {
      console.error("Failed to load the Google Maps API script");
    };
    document.body.appendChild(script);

    function initializeAutocomplete() {
      const input = document.getElementById("searchTextField");
      if (input) {
        const autocomplete = new window.google.maps.places.Autocomplete(input);
        autocomplete.addListener("place_changed", () => {
          const place = autocomplete.getPlace();
          if (place.geometry) {
            const lat = place.geometry.location.lat();
            const lng = place.geometry.location.lng();
            setLocation({ lat, lng });
          }
        });
      }
    }

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (location) {
      filterSheltersByLocation(location.lat, location.lng);
    }
  }, [location]);

  function distance(lat1, lon1, lat2, lon2, unit) {
    const radlat1 = (Math.PI * lat1) / 180;
    const radlat2 = (Math.PI * lat2) / 180;
    const theta = lon1 - lon2;
    const radtheta = (Math.PI * theta) / 180;
    let dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) dist = 1;
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit === "K") dist *= 1.609344;
    if (unit === "N") dist *= 0.8684;
    return dist;
  }

  const filterSheltersByLocation = (lat, lng) => {
    const filtered = shelters.filter((shelter) => {
      const shelterLat = shelter.coordinates.coordinates[1];
      const shelterLng = shelter.coordinates.coordinates[0];
      return distance(lat, lng, shelterLat, shelterLng, "K") <= 50;
    });
    setFilteredShelters(filtered);
  };

  const handleRequest = (shelterId) => {
    const datarequest = {
      shelterId: shelterId,
      donorId: authenticated._id,
    };

    fetch("http://localhost:3005/donors/request", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datarequest),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log("Request sent successfully:", result);
        setRequestedShelters([...requestedShelters, shelterId]);
      })
      .catch((error) => {
        console.error("Error sending request:", error);
      });
  };

  return (
    <div id="wrapper">
      <Sidebar />
      <Header />
      <div className="content-wrapper">
        <div className="container-fluid">
          <div className="row mt-4 mx-3 py-3">
            <form
              className="search-bar"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <input
                type="text"
                id="searchTextField"
                className="form-control"
                placeholder="Enter location"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                style={{ padding: "10px" }}
              />
              <a href="javascript:void(0);">
                <i className="icon-magnifier"></i>
              </a>
            </form>
            <div className="col-lg-12 mt-5">
              <div className="card">
                <div className="card-body">
                  
                  <h5 className="card-title">Shelter details</h5>
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">Sl.NO</th>
                          <th scope="col">Shelter name</th>
                          <th scope="col">Shelter location</th>
                          <th scope="col">Shelter owner name</th>
                          <th scope="col">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredShelters.map((shelter, index) => (
                          <tr key={shelter._id}>
                            <th scope="row">{index + 1}</th>
                            <td>{shelter.sheltername}</td>
                            <td>{shelter.place}</td>
                            <td>{shelter.ownername}</td>
                            <td>
                              <Link to="/shelterviewform" state={{ id: shelter._id }}>
                                <button type="button" className="btn btn-success mr-2">
                                  View shelter
                                </button>
                              </Link>
                              <button
                                className="btn btn-warning mr-2"
                                onClick={() => handleRequest(shelter._id)}
                                disabled={requestedShelters.includes(shelter._id)}
                              >
                                {requestedShelters.includes(shelter._id) ? "Requested" : "Request"}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shelterdetails;


