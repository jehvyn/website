import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.left}>
        <Link to="/" style={styles.link}>MyStore</Link>
      </div>
      <div style={styles.right}>
        <Link to="/" style={styles.link}>Home</Link>
        {isLoggedIn ? (
          <>
            <Link to="/profile" style={styles.link}>Profile</Link>
            <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
          </>
        ) : (
          <Link to="/login" style={styles.link}>Login</Link>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "1rem 2rem",
    backgroundColor: "#333",
    color: "#fff",
    alignItems: "center"
  },
  left: {
    fontSize: "1.5rem",
    fontWeight: "bold"
  },
  right: {
    display: "flex",
    gap: "1rem",
    alignItems: "center"
  },
  link: {
    color: "white",
    textDecoration: "none"
  },
  logoutButton: {
    background: "none",
    color: "white",
    border: "1px solid white",
    padding: "0.4rem 0.7rem",
    borderRadius: "4px",
    cursor: "pointer"
  }
};
