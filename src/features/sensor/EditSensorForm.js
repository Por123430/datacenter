import React from "react";
import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { useUpdateSensorMutation } from "./sensorApiSlice";
import "../../styles/edit.css";

const Sen_REGEX = /^[0-9]{1,4}$/;
const Position_REGEX = /^[A-z]{3,30}$/;

const EditSensorform = ({ sensor }) => {
  const [updateSensor, { isLoading, isSuccess, isError, error }] =
    useUpdateSensorMutation();

  const navigate = useNavigate();

  const [temp, setTemp] = useState(sensor.temp);
  const [validTemp, setValidTemp] = useState(false);
  const [moisture, setMoisture] = useState(sensor.moisture);
  const [validMoisture, setValidMoisture] = useState(false);
  const [position, setPosition] = useState(sensor.position);
  const [validPosition, setValidPosition] = useState(false);

  useEffect(() => {
    setValidTemp(Sen_REGEX.test(temp));
  }, [temp]);
  useEffect(() => {
    setValidMoisture(Sen_REGEX.test(moisture));
  }, [moisture]);
  useEffect(() => {
    setValidPosition(Position_REGEX.test(position));
  }, [position]);

  useEffect(() => {
    if (isSuccess) {
      setTemp("");
      setMoisture("");
      setPosition("");
      navigate("/dash/Sensor");
    }
  }, [isSuccess, navigate]);

  const onTempChanged = (e) => setTemp(e.target.value);
  const onMoistureChanged = (e) => setMoisture(e.target.value);
  const onPositionChanged = (e) => setPosition(e.target.value);

  //   const onRolesChanged = (e) => {
  //     const values = Array.from(
  //       e.target.selectedOptions,
  //       (option) => option.value
  //     );
  //     setRoles(values);
  //   };

  //   const onActiveChanged = () => setActive((prev) => !prev);

  const onSaveSensorClicked = async (e) => {
    await updateSensor({
      id: sensor.id,
      temp,
      moisture,
      position
    });
  };

  //   const options = Object.values(ROLES).map((role) => {
  //     return (
  //       <option key={role} value={role}>
  //         {" "}
  //         {role}
  //       </option>
  //     );
  //   });

  //   const onDeleteUserClicked = async () => {
  //     await deleteUser({ id: user.id });
  //   };

  let canSave;

  canSave = [validTemp, validMoisture].every(Boolean) && !isLoading;

  const validTempClass = !validTemp ? "form__input--incomplete" : "";
  const validMoistureClass = !validMoisture ? "form__input--incomplete" : "";
  const validPositionClass = !validPosition ? "form__input--incomplete" : "";

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
        Edit Sensor
      </div>
      {/* <p className={errClass}>{errContent}</p> */}
      <div className="form-eidt">
        <form className="form" onSubmit={(e) => e.preventDefault()}>
          
          <label className="form__label" htmlFor="position">
          temp: <span className="nowrap"></span>
          </label>
          <input
            className={`form__input ${validTempClass}`}
            id="temp"
            name="temp"
            type="text"
            autoComplete="off"
            value={temp}
            onChange={onTempChanged}
          />

      
          <label className="form__label" htmlFor="position">
          moisture: <span className="nowrap"></span>
          </label>
          <input
            className={`form__input ${validMoistureClass}`}
            id="moisture"
            name="moisture"
            type="text"
            autoComplete="off"
            value={moisture}
            onChange={onMoistureChanged}
          />
          <label className="form__label" htmlFor="position">
          position: <span className="nowrap"></span>
          </label>
          <input
            className={`form__input ${validPositionClass}`}
            id="position"
            name="position"
            type="text"
            autoComplete="off"
            value={position}
            onChange={onPositionChanged}
          />

          <div className="form__action-buttons">
            <button
              className="save-button"
              title="Save"
              onClick={onSaveSensorClicked}
              disabled={!canSave}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
  return content;
};

export default EditSensorform;
