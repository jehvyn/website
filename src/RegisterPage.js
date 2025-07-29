import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate();

  // Simple regex for basic email validation
  const validateEmail = (email) => {
    // This regex checks for something like 'text@text.text'
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    // Clear errors when typing
    setErrorMessage("");
    if (e.target.name === "email") {
      if (!validateEmail(e.target.value)) {
        setEmailError("Please enter a valid email address.");
      } else {
        setEmailError("");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check email before submit
    if (!validateEmail(form.email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    try {
      await axios.post("http://3.17.77.140:8001/register", form);
      alert("Registration successful!");
      navigate("/login");
    } catch (error) {
      setErrorMessage(error.response?.data || error.message);
    }
  };

  return (
    <>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h2>Register</h2>
          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            value={form.email}
            required
          />
          {emailError && <p className="error">{emailError}</p>}

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            value={form.password}
            required
          />
          {errorMessage && <p className="error">{errorMessage}</p>}

          <button type="submit" style={{ backgroundColor: "green" }}>
            Register
          </button>

          <button
            type="button"
            onClick={() => navigate("/login")}
            className="link-button"
          >
            Already have an account? Login
          </button>
        </form>
      </div>

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
        button {
          padding: 0.75rem;
          font-size: 1rem;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        button[type="submit"] {
          background-color: green;
        }
        button[type="submit"]:hover {
          background-color: #005500;
        }
        .link-button {
          background: none;
          color: #007bff;
          border: none;
          padding: 0;
          margin-top: 10px;
          font-size: 0.9rem;
          cursor: pointer;
          text-align: left;
        }
        .link-button:hover {
          text-decoration: underline;
        }
        .error {
          color: red;
          font-size: 0.85rem;
          margin-top: -0.25rem;
          margin-bottom: 0.75rem;
        }
      `}</style>
    </>
  );
}
