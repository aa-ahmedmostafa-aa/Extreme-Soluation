import { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./mainNav.module.css";
import profileImg from "../../../assits/Images/avetar.png";
import { useDispatch, useSelector } from "react-redux";
const MainNav = () => {


  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  //handelLogout
  const signoutHandler = () => {
    localStorage.removeItem("userInfo");
    document.location.href = "/signIn";
  };
  /******** */
  return (
    <nav className={styles["navStyle"] + " py-4"}>
      <div className=" container ">
        <div className="row no-gutters justify-content-between align-items-center">
          <div className="col-md-12">
            <div className="d-flex justify-content-between align-items-center">
              <NavLink
                
                className={styles.brand}
                exact
                to="/home"
              >
                Louvre
              </NavLink>
              <div>
                {" "}
                <div className="row align-items-center  ">
                  <div
                    className={
                      styles["navItem"] +
                      " mr-3 " +
                      styles["dropdown-toggleCustomize"]
                    }
                    id="navbarDropdownMenuLink"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <span className={styles["hiCaptionStyle"]}>Hi , </span>
                    {userInfo && userInfo.user.userName}
                  </div>

                  <div
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdownMenuLink"
                  >
                    <div className="dropdown-item" onClick={signoutHandler}>
                      Logout
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MainNav;
