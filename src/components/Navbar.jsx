import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <span className="logo-bracket">[</span>
        AI Reviewer
        <span className="logo-bracket">]</span>
        <span className="logo-dot" />
      </Link>

      <div className="nav-links">
        <Link to="/" className="nav-link">home</Link>
        <Link to="/history" className="nav-link">history</Link>

        {!token && (
          <>
            <Link to="/login">
              <button className="login-btn">login</button>
            </Link>
            <Link to="/signup">
              <button className="signup-btn">get started</button>
            </Link>
          </>
        )}

        {token && (
          <button className="logout-btn" onClick={logout}>
            logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
