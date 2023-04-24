import React from "react";
import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { useUpdateSensorMutation } from "./sensorApiSlice";
import "../../styles/edit.css";

const Sen_REGEX = /^[0-9]{1,4}$/;

const EditSensorform = ({ sensor }) => {
  const [updateSensor, { isLoading, isSuccess, isError, error }] =
    useUpdateSensorMutation();

  const navigate = useNavigate();

  const [temp, setTemp] = useState(sensor.temp);
  const [validTemp, setValidTemp] = useState(false);
  const [moisture, setMoisture] = useState(sensor.moisture);
  const [validMoisture, setValidMoisture] = useState(false);

  useEffect(() => {
    setValidTemp(Sen_REGEX.test(temp));
  }, [temp]);
  useEffect(() => {
    setValidMoisture(Sen_REGEX.test(moisture));
  }, [moisture]);

  useEffect(() => {
    if (isSuccess) {
      setTemp("");
      setMoisture("");
      navigate("/dash/Sensor");
    }
  }, [isSuccess, navigate]);

  const onTempChanged = (e) => setTemp(e.target.value);
  const onMoistureChanged = (e) => setMoisture(e.target.value);

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

  const content = (
    <>
      {/* <p className={errClass}>{errContent}</p> */}
      <div className="form-eidt">
        <form className="form" onSubmit={(e) => e.preventDefault()}>
          <div className="form__Title-row">Edit Sensor</div>

          <div className="label-form">
            temp: <span className="nowrap">[3-20 letters]</span>
          </div>
          <input
            className={`form__input ${validTempClass}`}
            id="temp"
            name="temp"
            type="text"
            autoComplete="off"
            value={temp}
            onChange={onTempChanged}
          />

          <div className="label-form">
            moisture: <span className="nowrap"></span>
          </div>
          <input
            className={`form__input ${validMoistureClass}`}
            id="moisture"
            name="moisture"
            type="text"
            autoComplete="off"
            value={moisture}
            onChange={onMoistureChanged}
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
