import { useEffect, useState } from "react";
import Books from "./components/Books";
import Details from "./components/Details";
import Login from "./components/Login";
import Register from "./components/Register";
import Account from "./components/Account";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const tokenCheck = localStorage.getItem("token") || null;
    if (tokenCheck) {
      setToken(tokenCheck);
    }
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Books token={token} setToken={setToken} />}
          />
          <Route path="/:id" element={<Details />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/register" element={<Register setToken={setToken}/>} />
          <Route path="/account" element={<Account token={token} setToken={setToken}/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
