import React, { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if (isLogin) {
        // Fake login: check localStorage
        const storedPassword = localStorage.getItem(email);
        if (!storedPassword || storedPassword !== password) {
          throw new Error("Invalid email or password");
        }
      } else {
        // Sign up: save to localStorage
        localStorage.setItem(email, password);
      }

      // Mark user as logged in
      localStorage.setItem("loggedIn", email);
      alert("Success!");
      window.location.href = "/"; // redirect to home
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div className="login-page">
      <h2>{isLogin ? "Login" : "Create Account"}</h2>

      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required
        />

        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required
        />

        <button type="submit">
          {isLogin ? "Login" : "Sign Up"}
        </button>
      </form>

      <p onClick={() => setIsLogin(!isLogin)} style={{ cursor: "pointer" }}>
        {isLogin ? "Create an account" : "Already have an account?"}
      </p>
    </div>
  );
}
