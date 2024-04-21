import React from "react";
import "../../styles/login.css";
import DashFooter from "../../components/DashFooter";
import { useRef, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useLoginMutation } from "./authApiSlice";

import usePersist from "../../hooks/usePersist";
import loginImg from "../../img/loginimg.png";
import logo from "../../img/Egat-Logo.png";
import hide from "../../img/visible.png";
const Login = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [persist, setPersist] = usePersist();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { accessToken } = await login({ username, password }).unwrap();
      dispatch(setCredentials({ accessToken }));
      setUsername("");
      setPassword("");
      navigate("/dash");
    } catch (err) {
      if (!err.status) {
        setErrMsg("No Server Response");
      } else if (err.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.status === 401) {
        setErrMsg("username or password is incorrect. please try again");
      } else {
        setErrMsg(err.data?.message);
      }
      errRef.current.focus();
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleUserInput = (e) => setUsername(e.target.value);
  const handlePwdInput = (e) => setPassword(e.target.value);
  const handleToggle = () => setPersist((prev) => !prev);

  const errClass = errMsg ? "errmsg" : "offscreen";

  if (isLoading) return <p>Loading...</p>;

  const content = (
    <div className="body">
      <header className="dash-header" style={{ backgroundColor: "#FFDA44", padding: '12px 0px' }}>
        <div className="dash-header__container" >
          <nav className="dash-header__logo" >
            <img src={logo} alt="Logo"></img>

          </nav>
          <div className="title-login">ระบบตรวจสอบความปลอดภัยห้อง DataCenter</div>
          {/* <Link to="/dash/notes" className="dash-header__title" >
          DataCenter
        </Link> */}
        </div>
      </header>
      <section className="public" >
        <div className="content" >
          {/* <div className="img-body">
            <img src={loginImg} alt="Logo-login"></img>
          </div> */}
          {/* <div className="content-body"> */}
          <main className="login">
            <header>Login</header>
            <form className="form-login" onSubmit={handleSubmit}>
              <div className="login-input">
                {/* <label htmlFor="username">Username :</label> */}
                <input
                  className="form__input-login"
                  type="text"
                  id="username"
                  ref={userRef}
                  value={username}
                  onChange={handleUserInput}
                  autoComplete="off"
                  required
                  placeholder="Username"
                />
              </div>

              <div className="login-input">
                {/* <label htmlFor="password">Password :</label> */}
               
                <input
                  className="form__input-login"
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={handlePwdInput}
                  required
                  placeholder="Password"
                />
                <img
                  src={hide}
                  alt={showPassword ? 'Hide' : 'Show'}
                  onClick={togglePasswordVisibility}
                  className="unmask"
                />
                
              </div>
              <p ref={errRef} className={errClass} aria-live="assertive">
                {errMsg}
              </p>
              <div className="submit_section">
                <button className="all-button">Sign In</button>

                <label htmlFor="persist" className="form__persist">
                  <input
                    type="checkbox"
                    className="form__checkbox"
                    id="persist"
                    onChange={handleToggle}
                    checked={persist}
                  />
                  <span>Trust This Device</span>
                  
                </label>
              </div>
            </form>
          </main>
          {/* </div> */}
          {/* <footer>
        <Link to="/">Back to Home</Link>
      </footer> */}
      
        </div>
      </section>
      <DashFooter />
    </div>
  );

  return content;
};

export default Login;

