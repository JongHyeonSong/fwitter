import { authService } from "fBase";
import React, { useState } from "react";

export default function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isNewAccount, setIsNewAccount] = useState(true);
  const [error, setError] = useState("");

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isNewAccount) {
        await authService.createUserWithEmailAndPassword(email, password);
      } else {
        await authService.signInWithEmailAndPassword(email, password);
      }
    } catch (error) {
      console.log("error is @:", error);
      setError(error.message);
    }
  };

  return (
    <form onSubmit={onSubmit} className="container">
      <input
        className="authInput"
        name="email"
        value={email}
        onChange={onChange}
        type="text"
        placeholder="Email"
        required
      />
      <input
        name="password"
        value={password}
        onChange={onChange}
        type="password"
        placeholder="Password"
        required
        className="authInput"
      />
      <input
        type="submit"
        value={isNewAccount ? "Create New Account" : "Log in"}
        className="authInput authSubmit"
      />{" "}
      <span
        onClick={() => {
          setIsNewAccount((prev) => !prev);
        }}
        className="authSwitch"
      >
        {isNewAccount ? "To Login" : "To Create Account"}
      </span>
      {error && <span className="authError">{error}</span>}
    </form>
  );
}
