/* TODO - add your code to create a functional React component that renders a registration form */
import { useState } from "react";
import { getRegisterToken } from "../api";
import { useNavigate } from "react-router-dom";

    export default function Register({setToken}) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: " ",
    email: " ",
    password: "",
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
    const register = await getRegisterToken(formData);
    if(register.token){
        setToken(register.token)
        localStorage.setItem("token", register.token)
        navigate("/account")
    }else{
        alert("Something is not right!")
    }
  }

  return (
    <div>
      <h1>Sign Up For an Account!</h1>
      {formData.error && <p>{formData.error}</p>}
      <form className="register" onSubmit={handleSubmit}>
        <label>
          First Name:{" "}
          <input
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Last Name:{" "}
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            required
          />
        </label>
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
          Set a Password:{" "}
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>
        <button className="button">Make an Account!</button>
      </form>
    </div>
  );
}
