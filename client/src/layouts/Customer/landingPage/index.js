import React from "react";
import styles from "./styles.module.css";
import MainNav from "../../../Component/shared/mainNav/mainNav";
import { Route, Switch } from "react-router";

import Home from "./Home";
import ProtectedRoute from "../../../Component/ProtectedRoute/ProtectedRoute";

export default function LandingPage() {
  return (
    <div className={styles.main}>
      <MainNav />

      {/* ****** Start Routnig for all modules  *******/}

      <Switch>
        <ProtectedRoute path="/home" component={Home} />
      </Switch>

      {/* ****** End Routnig for all modules  *******/}
    </div>
  );
}
