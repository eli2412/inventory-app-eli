import React, { useState } from "react";
import validator from "validator";
import apiURL from "../api";

const SignUp = ({ toggleAuth }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();

    // validate email
    if (!validator.isEmail(email)) {
      alert("Invalid email");
      return;
    }

    // validate password strength
    if (!validator.isStrongPassword(password)) {
      alert("Password must be at least 8 characters long, include a number, an uppercase letter, and a special character");
      return;
    }

    // check if password match
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(`${apiURL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        alert("Sign up successful! You can now log in.");
        toggleAuth();
      } else {
        const error = await response.json();
        alert(error.error || "Signup failed.");
      }
    } catch (err) {
      console.error("Error during signup:", err);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
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
        <label>
          Confirm Password:
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Sign Up</button>
      </form>
      <button onClick={toggleAuth}>Back to Login</button>
    </div>
  );
};

export default SignUp;
