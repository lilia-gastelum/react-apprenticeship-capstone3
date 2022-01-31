import React, { useState } from "react";
import { useAuth } from "../../utils/providers/Auth.provider";
import { useHistory } from "react-router-dom";
import "./Login.styles.css";
function Login() {
  const { login } = useAuth();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  async function authenticate() {
    if (email !== "" && password !== "") {
      login(email, password)
        .then(() => {
          history.push("/home");
        })
        .catch((error) => {
          setMessage(error.message);
        });
    }
  }
  return (
    <>
      <div className="login-form">
        <p>Welcome</p>
        <input
          className="login-input"
          title="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => {
            setMessage("");
            setEmail(e.target.value);
          }}
          required
        />
        <br />
        <input
          className="login-input"
          placeholder="Enter your password"
          type={"password"}
          title="password"
          value={password}
          onChange={(e) => {
            setMessage("");
            setPassword(e.target.value);
          }}
          required
        />
        <br />
        <p className="error">{message}</p>
        <button onClick={authenticate} className="login-button">
          Log In
        </button>
      </div>
    </>
  );
}

export default Login;
