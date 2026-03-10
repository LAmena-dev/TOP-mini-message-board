import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import NavBar from "../components/NavBar";

const Form = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [msgUser, setMsgUser] = useState("");
  const [msgText, setMsgText] = useState("");

  useEffect(() => {
    if (!isEditing) return;

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
  }, [id, isEditing]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditing) {
        await api.put(`/messages/${id}`, {
          msgUser,
          msgText,
        });

        navigate(`/messages/${id}`);
      } else {
        await api.post("/messages", {
          msgUser,
          msgText,
        });

        navigate("/");
      }
    } catch (error) {
      console.error("Failed to create message:", error);
    }
  };

  return (
    <>
      <NavBar />

      <main>
        <div className="container msgDeats">
          <div className="containerHead">
            <h2>{isEditing ? "Update Message" : "Add a new Message"}</h2>
          </div>

          <form onSubmit={handleSubmit} className="msgBody">
            <strong>
              <label htmlFor="username">Name:</label>
            </strong>

            <input
              type="text"
              id="username"
              name="msgUser"
              value={msgUser}
              onChange={(e) => setMsgUser(e.target.value)}
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
              value={msgText}
              onChange={(e) => setMsgText(e.target.value)}
              required
            />

            <br />
            <br />

            <div className="formBtns">
              <button type="submit" className="msgBtn postBtn">
                {isEditing ? "Update Message" : "Post Message"}
              </button>

              <button
                type="button"
                onClick={() => navigate(isEditing ? `/messages/${id}` : "/")}
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

export default Form;
