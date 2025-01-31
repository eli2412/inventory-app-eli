import React, { useState } from "react";
import validator from "validator";
import apiURL from "../api";

const Login = ({ setAuth, toggleAuth }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    // validate email format
    if (!validator.isEmail(email)) {
      alert("Invalid email format");
      return;
    }

    try {
      const response = await fetch(`${apiURL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        setAuth(true);
      } else {
        const error = await response.json();
        alert(error.error || "Login failed.");
      }
    } catch (err) {
      console.error("Error during login:", err);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Login</button>
      </form>
      <div>
        <p>Don't have an account?</p>
        <button onClick={toggleAuth}>Sign Up</button>
      </div>
    </div>
  );
};

export default Login;
