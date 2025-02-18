import React, { useEffect, useState } from 'react';
import Sidebar from '../Admin/Sidebar';
import Header from '../Admin/Header';

function Viewmessage() {
  const authenticated = JSON.parse(localStorage.getItem("userdata"));
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3005/donors/getmessages", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ donorId: authenticated._id })
    })
      .then((res) => res.json())
      .then((result) => {
        setMessages(result);
      })
      .catch((error) => {
        console.error('Error fetching messages:', error);
      });
  }, [authenticated._id]);

  return (
    <div id="wrapper">
      <Sidebar />
      <Header />

      <div className="content-wrapper">
        <div className="container-fluid">
          <div className="row mt-4 mx-3 py-3">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Reviews</h5>
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">Sl.NO</th>
                          <th scope="col">Shelter Name</th>
                          <th scope="col">Message</th>
                          <th scope="col">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {messages.map((message, index) => (
                          <tr key={message._id}>
                            <th scope="row">{index + 1}</th>
                            <td>{message.shelterid ? message.shelterid.sheltername : 'N/A'}</td>
                            <td>{message.message}</td>
                            <td>{new Date(message.createdAt).toLocaleDateString()}</td>
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

export default Viewmessage;
