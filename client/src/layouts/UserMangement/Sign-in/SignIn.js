import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";

import { NavLink } from "react-router-dom";
import { signin } from "../../../redux/actions/LoginAction";
import { useDispatch, useSelector } from "react-redux";

export default function SignIn(props) {
  const [showHideEye, setShowHideEye] = useState(true);
  const handelShowHideEye = () => {
    setShowHideEye(!showHideEye);
  };

  const dispatch = useDispatch();
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userSignin;

  //Login Data
  const [errorMessage, setErrorMessage] = useState("");
  const [userData, SetUserData] = useState({
    userName: "",
    password: "",
  });

  const redirectUser = "/home";
  const redirectAdmin = "/homeAdmin";
  const handelSubmit = () => {
    if (userData.userName == "" || userData.password == "") {
      setErrorMessage("Please Enter All fields ..");
    } else {
      dispatch(signin(userData));
    }
  };

  useEffect(() => {
    if (userInfo) {
      if (userInfo.user.role == "admin") {
        props.history.push(redirectAdmin);
      } else {
        props.history.push(redirectUser);
      }
    }
  }, [props.history, redirectUser, redirectAdmin, userInfo]);

  return (
    <div className={styles.SignIn}>
      <div className="container">
        <div className="row">
          <div className={styles.SignInCon}>
            {errorMessage && (
              <div className="alert alert-danger text-center mt-2" role="alert">
                <strong>Sorry ! </strong> {errorMessage}
              </div>
            )}
            <div className="mt-3 ">
              <label className={styles.labelInput}>Email</label>
              <input
                className={styles.SignInConFormInputFields}
                type="text"
                placeholder="input your email in here"
                value={userData.userName}
                onChange={(e) =>
                  SetUserData({ ...userData, userName: e.target.value })
                }
              />
            </div>
            <div className="mt-3 ">
              <label className={styles.labelInput}>Password</label>
              <input
                className={styles.SignInConFormInputFields}
                type={showHideEye ? `password` : `text`}
                placeholder="input your password in here"
                value={userData.password}
                onChange={(e) =>
                  SetUserData({ ...userData, password: e.target.value })
                }
              />

              <div
                className={styles.iconSignInPasswordShowHide}
                onClick={handelShowHideEye}
              >
                <i
                  className={`fa ${showHideEye ? `fa-eye-slash` : `fa-eye`} `}
                ></i>
              </div>
            </div>

            <div>
              <button className={styles.SignInBtn} onClick={handelSubmit}>
                Login
              </button>
            </div>
            <div className="mt-4">
              if you haven't account you can{" "}
              <NavLink className={styles.link} exact to="/signUp">
                Sign up
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
