import React, { useEffect, useState } from 'react';
import Header from "../Admin/Header";
import Sidebar from "../Admin/Sidebar";

function Chats() {
  const authenticated = JSON.parse(localStorage.getItem("userdata"));
  const [messages, setMessages] = useState([]);
  const [showReply, setShowReply] = useState(null); // Track which message to show the reply box for
  const [replyText, setReplyText] = useState('');

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

  const handleReplyClick = (messageId) => {
    setShowReply(messageId);
  };

  const handleReplyChange = (e) => {
    setReplyText(e.target.value);
  };

  const handleSendReply = (message) => {
    fetch("http://localhost:3005/donors/addReply", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        donorid: authenticated._id,
        shelterid: message.shelterid._id,
        messageid: message._id,
        reply: replyText
      })
    })
      .then((res) => res.json())
      .then((result) => {
        console.log('Reply sent:', result);
        setShowReply(null);
        setReplyText('');
      })
      .catch((error) => {
        console.error('Error sending reply:', error);
      });
  };

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
                  <h5 className="card-title">Messages</h5>
                  <div className="table-responsive">
                    <table className="table">
                      <tbody>
                        {messages.map((message, index) => (
                          <tr key={message._id}>
                            <td>
                              <img 
                                src="https://via.placeholder.com/110x110" 
                                alt="Sample" 
                                className="rounded-circle" 
                                width="50" 
                                height="50" 
                              />
                            </td>
                            <td>
                              <strong>{message.shelterid ? message.shelterid.sheltername : 'N/A'}</strong><br />
                              <span>{message.message}</span>
                            </td>
                            <td>
                              {new Date(message.createdAt).toLocaleTimeString()}
                            </td>
                            <td>
                              <button
                                className='btn btn-primary'
                                onClick={() => handleReplyClick(message._id)}
                              >
                                Reply
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {showReply && (
                    <div className="reply-box">
                      <textarea className='form-control'
                        value={replyText}
                        onChange={handleReplyChange}
                        placeholder="Type your reply here"
                        rows="3"
                      ></textarea>
                      <button
                        className="btn btn-success mt-2 mx-2"
                        onClick={() => handleSendReply(messages.find(m => m._id === showReply))}
                      >
                        Send
                      </button>
                      <button
                        className="btn btn-secondary mt-2 mx2"
                        onClick={() => setShowReply(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chats;
