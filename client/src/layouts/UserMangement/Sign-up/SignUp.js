import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signUpUser } from "../../../redux/actions/UserAction";
import * as UserType from "../../../redux/constants/UserConstants";

export default function SignUp(props) {
  //state user data

  const [phoneNumber, setPhoneNumber] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showHideEye, setShowHideEye] = useState(true);
  const [showHideEyeConfirmPassword, setShowHideEyeConfirmPassword] =
    useState(true);
  const handelShowHideEye = () => {
    setShowHideEye(!showHideEye);
  };
  const handelShowHideEyeConfirmPassword = () => {
    setShowHideEyeConfirmPassword(!showHideEyeConfirmPassword);
  };
  //state validation
  const [errorMessage, setErrorMessage] = useState("");
  const [validation, setValidation] = useState(false);
  const [validationText, setValidationText] = useState("");
  const [done, setDone] = useState(false);

  // dispatch function
  const dispatch = useDispatch();
  const listUsers = useSelector((state) => state.allUsers);
  let { status, error } = listUsers;
  // login path
  const redirect = "/home/login";

  //handel sign up form
  const handelSubmit = () => {
    const user = {
      phoneNumber,
      userName,
      password,
    };

    if (
      user.phoneNumber === "" ||
      user.userName === "" ||
      user.password == ""
    ) {
      setValidationText("All Data Required");
      setValidation(true);
      return;
    } else if (user.password !== confirmPassword) {
      setValidationText("password not matched");
      setValidation(true);
      return;
    } else {
      dispatch(signUpUser(user));
    }
  };

  useEffect(() => {
    if (error != "" && error != undefined) {
      setValidationText(error);
      setValidation(true);
    } else {
      if (status) {
        props.history.push(redirectUser);
        dispatch({ type: UserType.CLEAR_USER_STATUS });
      }
    }
  }, [error, status]);

  // ** check if login *** //

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const redirectUser = "/signIn";
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirectUser);
    }
  }, [props.history, redirectUser, userInfo]);

  return (
    <div className={styles.SignUp}>
      <div className="container">
        <div className="row">
          <div className={styles.SignUpCon}>
            {validation && (
              <div className="alert alert-danger text-center mt-2" role="alert">
                <strong>Sorry ! </strong> {validationText}
              </div>
            )}
            <div className="mt-3 ">
              <label className={styles.labelInput}>User Name</label>
              <input
                className={styles.SignUpConFormInputFields}
                type="text"
                placeholder="input your email in here"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>

            <div className="mt-3 ">
              <label className={styles.labelInput}>Password</label>
              <input
                className={styles.SignUpConFormInputFields}
                type={showHideEye ? `password` : `text`}
                placeholder="input your password in here"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <div
                className={styles.iconSignUpPasswordShowHide}
                onClick={handelShowHideEye}
              >
                <i
                  className={`fa ${showHideEye ? `fa-eye-slash` : `fa-eye`} `}
                ></i>
              </div>
            </div>

            <div className="mt-3 ">
              <label className={styles.labelInput}>Confirm Password</label>
              <input
                className={styles.SignUpConFormInputFields}
                type={showHideEyeConfirmPassword ? `password` : `text`}
                placeholder="input your password in here"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              <div
                className={styles.iconSignUpConfirmPasswordShowHide}
                onClick={handelShowHideEyeConfirmPassword}
              >
                <i
                  className={`fa ${
                    showHideEyeConfirmPassword ? `fa-eye-slash` : `fa-eye`
                  } `}
                ></i>
              </div>
            </div>
            <div className="mt-3 ">
              <label className={styles.labelInput}>Phone Number</label>
              <input
                className={styles.SignUpConFormInputFields}
                type="text"
                placeholder="input your Phone Number in here"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>

            <div>
              <button className={styles.SignUpBtn} onClick={handelSubmit}>
                Sign Up
              </button>
            </div>
            <div className="mt-4">
              if you have account you can{"   "}
              <NavLink className={styles.link} to="/signIn">
                Sign In
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
