import React, { useState } from "react";

function Sidebar() {
  const [authenticated, setAuthenticated] = useState(JSON.parse(localStorage.getItem("userdata")));

  return (
    <div id="sidebar-wrapper" data-simplebar="" data-simplebar-auto-hide="true">
      <div className="brand-logo">
        {/* Brand logo content */}
      </div>
      <ul className="sidebar-menu do-nicescrol">
        {authenticated?.userstatus === 0 ? (
          <>
            <li>
              <a href="/">
                <i className="zmdi zmdi-home"></i> <span>New Shelters</span>
              </a>
            </li>
            <li>
              <a href="/appshel">
                <i className="zmdi zmdi-home text-success"></i> <span>Approved Shelters</span>
              </a>
            </li>
            <li>
              <a href="/rejshel">
                <i className="zmdi zmdi-home text-danger"></i> <span>Rejected Shelters</span>
              </a>
            </li>
            <li class="sidebar-header"></li>
            <li>
              <a href="/donors">
                <i className="zmdi zmdi-accounts-alt"></i> <span>New Donors</span>
              </a>
            </li>
            <li>
              <a href="/appdonor">
                <i className="zmdi zmdi-accounts-add text-success"></i> <span>Approved Donors</span>
              </a>
            </li>
            <li>
              <a href="/rejdonor">
                <i className="zmdi zmdi-accounts-add text-danger"></i> <span>Rejected Donors</span>
              </a>
            </li>
            <li class="sidebar-header"></li>
            <li>
              <a href="/donation">
                <i className="zmdi zmdi-swap text-warning"></i> <span>Donations</span>
              </a>
            </li>
            <li>
              <a href="/feedback">
                <i className="zmdi zmdi-comments"></i> <span>Reviews</span>
              </a>
            </li>
            <li class="sidebar-header"></li>
            <li>
              <a href="/download">
                <i className="zmdi zmdi-download"></i> <span>Download Test Data</span>
              </a>
            </li>
            <li>
              <a href="https://colab.research.google.com/drive/1YNbs1Dp33AkuKagf5VaL6g7zAl0PXW-N#scrollTo=mTJx7QHiW4p9" target="_blank">
                <i className="zmdi zmdi-settings"></i> <span>Testing</span>
              </a>
            </li>
            <li>
              <a href="/upload">
                <i className="zmdi zmdi-upload"></i> <span>Upload Result</span>
              </a>
            </li>
          </>
        ) : (
          <><li class="sidebar-header"></li>
            <li>
              <a href="/">
                <i className="zmdi zmdi-home"></i> <span>View Shelters</span>
              </a>
            </li>
            <li class="sidebar-header"></li>
            <li>
              <a href="/adddonations">
                <i className="zmdi zmdi-plus"></i> <span>Add Donations</span>
              </a>
            </li>
            <li>
              <a href="/donationview">
                <i className="zmdi zmdi-refresh"></i> <span>Running Donations</span>
              </a>
            </li>
            <li>
              <a href="/penddona">
                <i className="zmdi zmdi-alert-polygon"></i> <span>Pending Donations</span>
              </a>
            </li>
            <li>
              <a href="/closedona">
                <i className="zmdi zmdi-block"></i> <span>Closed Donations</span>
              </a>
            </li>
            <li class="sidebar-header"></li>
            <li>
              <a href="/reviewss">
                <i className="zmdi zmdi-comments"></i> <span>Reviews</span>
              </a>
            </li>
            <li>
              <a href="/chats">
                <i className="zmdi zmdi-comment"></i> <span>Chats</span>
              </a>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

export default Sidebar;
