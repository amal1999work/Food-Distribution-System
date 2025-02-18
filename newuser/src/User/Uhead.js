import React from 'react'
import { Link, useNavigate } from "react-router-dom";

function Uhead() {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.clear();
        setTimeout(() => {
          navigate('/');
          window.location.reload();
        }, 100);
      };
  return (
    <div>
      <div id="site-header">
        <header id="header" class="header-block-top">
            <div class="container">
                <div class="row">
                    <div class="main-menu">
                        <nav class="navbar navbar-default" id="mainNav">
                            <div class="navbar-header">
                                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                                    <span class="sr-only">Toggle navigation</span>
                                    <span class="icon-bar"></span>
                                    <span class="icon-bar"></span>
                                    <span class="icon-bar"></span>
                                </button>
                                <div class="logo">
                                    <a class="navbar-brand js-scroll-trigger logo-header" href="#">
                                        <img src="images/new.png" alt="" height="75px"width="75px"/>
                                    </a>
                                </div>
                            </div>
                            <div id="navbar" class="navbar-collapse collapse">
                                <ul class="nav navbar-nav navbar-right">
                                    <li class="active"><a href="/home">Home</a></li>
                                    <li><a href="/donation">View Donation</a></li>
                                    <li><a href="/track">Track</a></li>
                                    <li><a href="/history">History</a></li>
                                 
                         
                                    <li><a href="/profile">My Profile</a></li>
                                    <li><a href="#" style={{ fontSize: 'medium' }} onClick={handleLogout}>Logout</a></li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
        </div>
    </div>
  )
}

export default Uhead
