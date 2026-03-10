import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import NavBar from "../components/NavBar";

const MessageDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const res = await api.get(`/messages/${id}`);
        setMessage(res.data);
      } catch (error) {
        console.error("Failed to fetch message:", error);
      }
    };

    fetchMessage();
  }, [id]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this message?",
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/messages/${id}`);
      navigate("/");
    } catch (error) {
      console.error("Failed to delete message:", error);
    }
  };

  if (!message) {
    return (
      <>
        <NavBar />
        <p>Loading message...</p>
      </>
    );
  }

  return (
    <>
      <NavBar />

      <main>
        <div className="container msgDeats">
          <div className="containerHead">
            <h2>Message Details</h2>
          </div>

          <div className="msgBody">
            <div className="msgTop">
              <p>
                <strong>Author: </strong>
                {message.username}
              </p>
              <p className="text">
                <strong>Message: </strong>
                {message.message}
              </p>
            </div>

            <div className="msgBot">
              <em>
                <strong>Added: </strong>
                {new Date(message.add_date).toLocaleString()}
              </em>

              <div className="formBtns">
                <button onClick={handleDelete} className="msgBtn">
                  Delete Message
                </button>
                <Link to={`/messages/${id}/edit`}>
                  <button className="msgBtn">Edit Message</button>
                </Link>

                <button onClick={() => navigate("/")} className="msgBtn back">
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default MessageDetails;
