import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");  // New state for errors
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError(""); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://3.17.77.140:8001/login", form);
      // Clear errors on success
      setError("");
      // Save token and navigate
      localStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (err) {
      // Set error message from server or fallback message
      setError(err.response?.data || "Login failed. Please try again.");
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        {/* Error message */}
        {error && <p className="error-message">{error}</p>}

        <button type="submit">Login</button>
        <button
          type="button"
          onClick={() => navigate("/register")}
          style={{
            marginTop: "10px",
            fontSize: "0.9rem",
            background: "none",
            border: "none",
            color: "#007bff",
            cursor: "pointer",
          }}
        >
          Register?
        </button>
      </form>

      <style jsx>{`
        .form-container {
          max-width: 400px;
          margin: 3rem auto;
          padding: 2rem;
          border: 1px solid #ccc;
          border-radius: 8px;
          background-color: #fafafa;
        }
        form {
          display: flex;
          flex-direction: column;
        }
        input {
          margin: 0.5rem 0;
          padding: 0.75rem;
          font-size: 1rem;
        }
        .error-message {
          color: red;
          margin-top: -0.5rem;
          margin-bottom: 0.75rem;
          font-size: 0.9rem;
        }
        button {
          padding: 0.75rem;
          font-size: 1rem;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        button:hover {
          background-color: #0056b3;
        }
        button[type="button"] {
          background: none;
          color: #007bff;
          border: none;
          padding: 0;
          margin-top: 10px;
          font-size: 0.9rem;
          cursor: pointer;
          text-align: left;
        }
        button[type="button"]:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}
