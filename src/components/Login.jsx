/* TODO - add your code to create a functional React component that renders a login form */
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { getLoginToken } from "../api";

export default function Login({ setToken }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: " ",
    email: " ",
    password: "",
    error: null,
  });

  function handleChange(e) {
    {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const loginToken = await getLoginToken(formData);
    setToken(loginToken.token);
    localStorage.setItem("token", loginToken.token);
    loginToken.token
      ? navigate("/account")
      : alert("Incorrect Username or Password. Try Again");
  }

  return (
    <div>
      <h1>Login</h1>
      <form className="login" onSubmit={handleSubmit}>
        <label>
          Email:{" "}
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Password:{" "}
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>
        <button className="button">Login</button>
      </form>
      <button className="button" onClick={() => navigate("/")}>
        Back To Home Page
      </button>
    </div>
  );
}
