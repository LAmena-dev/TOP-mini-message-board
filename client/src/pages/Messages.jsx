import { useState, useEffect } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";

const Messages = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await api.get("/messages");
        console.log("API Response:", res);
        setMessages(res.data);
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      }
    };

    fetchMessages();
  }, []);

  return (
    <>
      <NavBar />
      <main>
        <div className="container">
          <div className="containerHead">
            <h2>Messages</h2>
          </div>
          <ul>
            {messages.length === 0 ? (
              <li className="msgBody emptyState">
                <div className="msgTop">
                  <p className="emptyText">No messages yet.</p>
                  <strong>
                    <p className="emptyText">Be the first to Post!</p>
                  </strong>
                </div>
                <Link to="/new">
                  <button className="msgBtn postBtn">
                    Create the first message
                  </button>
                </Link>
              </li>
            ) : (
              messages.map((message) => (
                <li key={message.id} className="msgBody">
                  <p className="msgTop">
                    <strong>{message.username}:</strong>
                  </p>
                  <p className="text">{message.message}</p>

                  <div className="msgBot">
                    <em>({new Date(message.add_date).toLocaleString()})</em>
                    <Link to={`/messages/${message.id}`}>
                      <button className="msgBtn">Open</button>
                    </Link>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      </main>
    </>
  );
};

export default Messages;
