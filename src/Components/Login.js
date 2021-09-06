import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../Context/AuthProvider";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, currentUser } = useContext(AuthContext);
  const history = useHistory();
  const handleSubmit = async (e) => {
    console.log("hi");
    e.preventDefault();
    try {
      console.log("Logging in user");
      setLoading(true);
      await login(email, password);
      setLoading(false);
      history.push("/");
    } catch {
      setError("Failed to log in");
      setTimeout(() => setError(""), 2000);
      setLoading(false);
    }
  };
  useEffect(() => {
    if (currentUser) {
      history.push("/");
    }
  }, []);
  return (
    <div className="form_block">
      <form onSubmit={handleSubmit}>
        <div className="input_group">
          <label htmlFor="">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input_group">
          <label htmlFor="">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          style={{ marginTop: "1rem" }}
          type="submit"
          className="submit_btn"
          disabled={loading}
        >
          Login
        </button>
        {error ? <h1>{error}</h1> : <></>}
      </form>
      <p>
        <Link to="/signup">Dont have an account?Sign Up</Link>
      </p>
    </div>
  );
}

export default Login;
