import React from "react";
import { useState, useEffect } from "react";
import { useUpdateUserMutation, useDeleteUserMutation } from "./userApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { ROLES } from "../../config/roles";
import "../../styles/edit.css"

const USER_REGEX = /^[A-z]{3,30}$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;

const EditUserForm = ({ user }) => {
  const [updateUser, { isLoading, isSuccess, isError, error }] =
    useUpdateUserMutation();
  const [
    deleteUser,
    { isSuccess: isDelSuccess, isError: isDelError, error: delerror },
  ] = useDeleteUserMutation();

  const navigate = useNavigate();

  const [username, setUsername] = useState(user.username);
  const [validUsername, setValidUsername] = useState(false);
  const [firstname, setFirstname] = useState(user.firstname);
  const [validFirstname, setValidFirstname] = useState(false);
  const [lastname, setLastname] = useState(user.lastname);
  const [validLastname, setValidLastname] = useState(false);
  const [line, setLine] = useState(user.line);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [roles, setRoles] = useState(user.roles);
  const [active, setActive] = useState(user.active);

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
    if (isSuccess || isDelSuccess) {
      setUsername("");
      setFirstname("");
      setLastname("");
      setPassword("");
      setRoles([]);
      navigate("/dash/users");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  const onUsernameChanged = (e) => setUsername(e.target.value);
  const onFirstnameChanged = (e) => setFirstname(e.target.value);
  const onLastnameChanged = (e) => setLastname(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);
  const onLineChanged = (e) => setLine(e.target.value);

  // const onRolesChanged = (e) => {
  //   const values = Array.from(
  //     e.target.selectedOptions,
  //     (option) => option.value
  //   );
  //   setRoles(values);
  // };
  const onRolesChanged = (role) => {
    setRoles([`${role}`]);
  };

  const onActiveChanged = () => setActive((prev) => !prev);

  const onSaveUserClicked = async (e) => {
    if (password) {
      await updateUser({
        id: user.id,
        username,
        firstname,
        lastname,
        line,
        password,
        roles,
        active,
      });
    } else {
      await updateUser({
        id: user.id,
        username,
        firstname,
        lastname,
        line,
        roles,
        active,
      });
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

  const onDeleteUserClicked = async () => {
    await deleteUser({ id: user.id });
  };

  let canSave;
  if (password) {
    canSave =
      [
        roles.length,
        validUsername,
        validFirstname,
        validLastname,
        line,
        validPassword,
      ].every(Boolean) && !isLoading;
  } else {
    canSave =
      [roles.length, validUsername, validFirstname, validLastname, line].every(
        Boolean
      ) && !isLoading;
  }

  const errClass = isError || isDelError ? "errmsg" : "offscreen";
  const validUserClass = !validUsername ? "form__input--incomplete" : "";
  const validFirstClass = !validFirstname ? "form__input--incomplete" : "";
  const validLastClass = !validLastname ? "form__input--incomplete" : "";
  const validPwdclass = !validPassword ? "form__input--incomplete" : "";
  const validRolesClass = !Boolean(roles.length)
    ? "form__input--incomplete"
    : "";

  const errContent = (error?.data?.message || delerror?.data?.message) ?? "";

  const content = (
    <>
      <div
        className="all-title-content"
        style={{
          background: "#F4F4EF",
          fontSize: "1.4rem",
          padding: "20px 70px",
          color: "black",
          boxShadow: "rgba(45, 46, 46, 0.35) 0px 4px 32px 0px, rgba(45, 46, 46, 0.08) 0px 4px 16px 0px, rgba(45, 46, 46, 0.1) 0px 0px 4px 0px"
        }}
      >
        Edit User
      </div>
      <div className="form-eidt">
        <p className={errClass}>{errContent}</p>

        <form className="form" onSubmit={(e) => e.preventDefault()}>
          {/* <div className="form__Title-row">Edit User</div> */}

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
          <label className="form__label" htmlFor="line">
            Line: <span className="nowrap"></span>
          </label>
          <div className="area-field">
            <input
              className={`form__input ${validLastClass}`}
              id="line"
              name="line"
              type="text"
              autoComplete="off"
              value={line}
              onChange={onLineChanged}
            />

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
          <label
            className="form__label form__checkbox-container"
            htmlFor="user-active"
          >
            <label class="form__label">ACTIVE:</label>
            {/* <input
              className="form__checkbox"
              id="user-active"
              name="user-active"
              type="checkbox"
              checked={active}
              onChange={onActiveChanged}
            /> */}
            <div class="checkbox-wrapper-2">
              <input type="checkbox" class="sc-gJwTLC ikxBAC"
                id="user-active"
                name="user-active"

                checked={active}
                onChange={onActiveChanged} />
            </div>



          </label>

          {/* <label className="form__label" htmlFor="roles">
            ASSIGNED ROLES:
          </label>
          <select
            className={`form__select ${validRolesClass}`}
            id="roles"
            name="roles"

            value={roles}
            size="3"
            onChange={onRolesChanged}
          >
            {options}
          </select> */}
          <label
            className="form__label form__checkbox-container"
            htmlFor="user-active"
          >
            <div className="redio-content">
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
          </label>

          <div className="form__action-buttons">
            <button
              className="save-button"
              title="Save"
              onClick={onSaveUserClicked}
              disabled={!canSave}
            >
              Save
            </button>
            <button
              className="delete-button"
              title="Delete"
              onClick={onDeleteUserClicked}
            >
              Delete
            </button>
          </div>
        </form>
      </div>
    </>
  );
  return content;
};
export default EditUserForm;