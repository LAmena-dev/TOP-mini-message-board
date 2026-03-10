import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav>
      <Link className="siteTitle" to="/">
        <h1>Mini Messageboard</h1>
      </Link>
      <div>
        <Link to="/">
          <button disabled style={{ cursor: "not-allowed" }}>
            Messages
          </button>
        </Link>
        <Link to="/new">
          <button>Add a new message</button>
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
