import React, { useEffect, useState } from "react";
import { Route, Switch, useRouteMatch } from "react-router";
import { NavLink } from "react-router-dom";
import SignIn from "./Sign-in/SignIn";
import SignUp from "./Sign-up/SignUp";
import styles from "./styles.module.css";
export default function UserMangemet() {
  const [title, setTitle] = useState(" Log In");
  const { path, url } = useRouteMatch();


  // ** for change the title **//
  useEffect(() => {
    if (path == "/signIn") {
      setTitle(" Log In");
    } else {
      setTitle("Sign Up");
    }
  }, [path]);

  return (
    <div className={styles.cover}>
      <div className="d-flex justify-content-center align-items-center h-100">
        <div>
          <div className="card">
            <div className={styles.header}>
              <h1 className={styles.link} exact to="/signIn">
                {title}
              </h1>
            </div>
            <div className={styles.line_parent}>
              <div className={styles.line}></div>
            </div>

            <Switch>
              <Route path="/signIn" component={SignIn} />
              <Route path="/signUp" component={SignUp} />
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
}
