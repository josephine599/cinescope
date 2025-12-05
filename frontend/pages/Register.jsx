import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const nav = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    // Replace with call to backend /auth/register
    alert("Registered (stub). Now login.");
    nav("/login");
  };

  return (
    <div className="auth-page">
      <form className="auth-form" onSubmit={submit}>
        <h2>Register</h2>
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={pwd} onChange={e => setPwd(e.target.value)} />
        <button className="button" type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
