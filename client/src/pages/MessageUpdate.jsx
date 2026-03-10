import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import NavBar from "../components/NavBar";

const MessageUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [msgUser, setMsgUser] = useState("");
  const [msgText, setMsgText] = useState("");

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const res = await api.get(`/messages/${id}`);
        setMsgUser(res.data.username);
        setMsgText(res.data.message);
      } catch (error) {
        console.error("Failed to fetch message:", error);
      }
    };

    fetchMessage();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/messages/${id}`, {
        msgUser,
        msgText,
      });

      navigate(`/messages/${id}`);
    } catch (error) {
      console.error("Failed to update message:", error);
    }
  };

  return (
    <>
      <NavBar />
      <main>
        <div className="container msgDeats">
          <div className="containerHead">
            <h2>Update Message</h2>
          </div>

          <form onSubmit={handleSubmit} className="msgBody">
            <strong>
              <label htmlFor="username">Name:</label>
            </strong>
            <input
              type="text"
              id="username"
              name="msgUser"
              onChange={(e) => setMsgUser(e.target.value)}
              value={msgUser}
              required
            />

            <br />
            <br />

            <strong>
              <label htmlFor="text">Message:</label>
            </strong>

            <textarea
              id="text"
              name="msgText"
              onChange={(e) => setMsgText(e.target.value)}
              required
            />

            <br />
            <br />

            <div className="formBtns">
              <button type="submit" className="msgBtn postBtn">
                Update Message
              </button>

              <button
                type="button"
                onClick={() => navigate(`/messages/${id}`)}
                className="msgBtn back"
              >
                Back
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default MessageUpdate;
