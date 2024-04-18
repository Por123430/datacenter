import React from "react";
import { useState, useEffect } from "react";
import { useAddNewUserMutation } from "./userApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { ROLES } from "../../config/roles";
import "../../styles/edit.css";

const USER_REGEX = /^[A-z]{3,20}$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;
const NewUserForm = () => {
  const [addNewUser, { isLoading, isSuccess, isError, error }] =
    useAddNewUserMutation();

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [validFirstname, setValidFirstname] = useState(false);
  const [lastname, setLastname] = useState("");
  const [validLastname, setValidLastname] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [roles, setRoles] = useState("");

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
  }, [username]);
  useEffect(() => {
    setValidFirstname(USER_REGEX.test(firstname));
  }, [firstname]);
  useEffect(() => {
    setValidLastname(USER_REGEX.test(lastname));
  }, [lastname]);
  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    if (isSuccess) {
      setUsername("");
      setPassword("");
      setFirstname("");
      setLastname("");
      setRoles([]);
      navigate("/dash/users");
    }
  }, [isSuccess, navigate]);

  const onUsernameChanged = (e) => setUsername(e.target.value);
  const onFirstnameChanged = (e) => setFirstname(e.target.value);
  const onLastnameChanged = (e) => setLastname(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);

  const onRolesChanged = (role) => {
    setRoles([`${role}`]);
  };

  const canSave =
    [
      roles.length,
      validUsername,
      validFirstname,
      validLastname,
      validPassword,
    ].every(Boolean) && !isLoading;

  const onSaveUserClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      await addNewUser({ username, firstname, lastname, password, roles });
    }
  };

  const options = Object.values(ROLES).map((role) => {
    return (
      <option key={role} value={role}>
        {" "}
        {role}
      </option>
    );
  });

  const errClass = isError ? "errmsg" : "offscreen";
  const validUserClass = !validUsername ? "form__input--incomplete" : "";
  const validFirstClass = !validFirstname ? "form__input--incomplete" : "";
  const validLastClass = !validLastname ? "form__input--incomplete" : "";
  const validPwdclass = !validPassword ? "form__input--incomplete" : "";
  const validRolesClass = !Boolean(roles.length)
    ? "form__input--incomplete"
    : "";

  const content = (
    <>
      <div className="form-eidt">
        <p className={errClass}>{error?.data?.message}</p>

        <form className="form" onSubmit={onSaveUserClicked} >
          <div className="form__Title-row">
            New User
          </div>
          <label className="form__label" htmlFor="username">
            Username: <span className="nowrap"></span>
          </label>
          <div className="area-field">
            <input
              className={`form__input ${validUserClass}`}
              id="username"
              name="username"
              type="text"
              autoComplete="off"
              value={username}
              onChange={onUsernameChanged}
            />
            <span class="area-field-Hover">[A-z][3-20 letters]</span>
          </div>
          <label className="form__label" htmlFor="firstname">
            Firstname: <span className="nowrap"></span>
          </label>
          <div className="area-field">
            <input
              className={`form__input ${validFirstClass}`}
              id="firstname"
              name="firstname"
              type="text"
              autoComplete="off"
              value={firstname}
              onChange={onFirstnameChanged}
            />
            <span class="area-field-Hover">[A-z][3-20 letters]</span>
          </div>
          <label className="form__label" htmlFor="lastname">
            Lastname: <span className="nowrap"></span>
          </label>
          <div className="area-field">
            <input
              className={`form__input ${validLastClass}`}
              id="lastname"
              name="lastname"
              type="text"
              autoComplete="off"
              value={lastname}
              onChange={onLastnameChanged}
            />
            <span class="area-field-Hover">[A-z][3-20 letters]</span>
          </div>
          <label className="form__label" htmlFor="password">
            Password: <span className="nowrap"></span>
          </label>
          <div className="area-field">
            <input
              className={`form__input ${validPwdclass}`}
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={onPasswordChanged}
            />
            <span class="area-field-Hover">[A-z,0-9,!@#$%][4-12 chars]</span>
          </div>
          <div  className="redio-content">
            <label class="form__label">ASSIGNED ROLES:</label>
            <div className="checkbox-redio">
              <label class="form-control">
                <input
                  type="radio"
                  name="roles"
                  value="Admin"
                  checked={roles === "Admin"}
                  onChange={() => onRolesChanged("Admin")}
                />
                Admin
              </label>

              <label class="form-control">
                <input
                  type="radio"
                  name="roles"
                  value="Officer"
                  checked={roles === "Officer"}
                  onChange={() => onRolesChanged("Officer")}
                />
                Officer
              </label>
            </div>
            {/* Add more radio buttons for other roles if needed */}
          </div>
          <div className="form__action-buttons">
            <button className="save-button" title="Save" disabled={!canSave}>
              Add NewUser
            </button>
          </div>
        </form>
      </div>
    </>
  );
  return content;
};

export default NewUserForm;