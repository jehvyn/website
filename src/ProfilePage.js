import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [email, setEmail] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setEmail("");
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setEmail(payload.email || "");
    } catch (error) {
      setEmail("");
    }
  }, []);

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "auto" }}>
      <h2>Profile</h2>
      {email ? (
        <p>Welcome, <strong>{email}</strong></p>
      ) : (
        <p>User info not available.</p>
      )}
      <p>More profile features coming soon!</p>
    </div>
  );
}
