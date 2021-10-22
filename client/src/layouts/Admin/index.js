import classNames from "classnames";
import { useEffect, useLayoutEffect, useState } from "react";
import styles from "./styles.module.css";
import gridIconActive from "../../assits/Images/Icon material-dashboard.png";
import userItemInActive from "../../assits/nav/users/user.png";
import userItemActive from "../../assits/nav/users/user.png";

import gridIconNotActive from "../../assits/Images/Icon material-dashboardNotActive.png";
import logoutIcon from "../../assits/Images/Icon open-account-logout.png";
import logoDefaultImg from "../../assits/Images/4091367.png";
import {
  Route,
  Switch,
  useHistory,
  useLocation,
  useRouteMatch,
} from "react-router";
import AdminWelcome from "./landingAdmin/welcome";
import ListCustomers from "./customers/List-customers/ListCustomers";

import AdminRoute from "../../Component/ProtectedRoute/AdminRoute";
import ListArts from "./Admin-Arts/List-Arts/ListArts";
import MainNav from "../../Component/shared/mainNav/mainNav";

const AdminHome = () => {
  const { path, url } = useRouteMatch();
  const welcomePath = path;
  const customersPath = "/homeAdmin/customers";
  const artsPath = "/homeAdmin/adminListArts";

  const history = useHistory();
  const location = useLocation();
  const [isToggleGridView, SetIsToggleGridView] = useState(true);
  const [custmersView, SetCustmersView] = useState(true);
  const [productsView, SetProductsView] = useState(true);

  const [hideSlideBar, setHideSlideBar] = useState(false);



  const handleSlideBarHiddenToggle = () => {
    setHideSlideBar(!hideSlideBar);
  };
  //    change slideBar icone flag style when its location match
  useEffect(() => {
    SetIsToggleGridView(false);
    SetCustmersView(false);
    SetProductsView(false);

    if (location.pathname === welcomePath) {
      SetIsToggleGridView(true);
    } else if (location.pathname === customersPath) {
      SetCustmersView(true);
    } else if (location.pathname === artsPath) {
      SetProductsView(true);
    }
  }, [location]);

  // set slidebar style that matches flag
  const productsViewStyle = classNames("fas fa-cube mt-5", {
    [styles["slidBarIconActive"]]: productsView,
    [styles["slidBarIconNotActive"]]: !productsView,
  });
  const customersViewStyle = classNames("fas fa-user-alt mt-5", {
    [styles["slidBarIconActive"]]: custmersView,
    [styles["slidBarIconNotActive"]]: !custmersView,
  });

  // hide slide bar styles
  const hideSlideBarContentStyle = classNames({
    "d-none": hideSlideBar,
    "d-flex flex-column  align-items-center": !hideSlideBar,
  });
  const hideSlideBarBGStyle = classNames({
    [styles["slideBarHidden"]]: hideSlideBar,
    [styles["slideBar"]]: !hideSlideBar,
  });
  const hideSlideBarIconStyle = classNames("mb-4 fas  fa-bars", {
    [styles["slidBarIconActive"]]: hideSlideBar,
    [styles["slidBarIconNotActive"]]: !hideSlideBar,
  });

  //handelLogout
  const signoutHandler = () => {
    localStorage.removeItem("userInfo");
    document.location.href = "/signIn";
  };
  /******** */

  return (
    <div>
      <MainNav />
      {/* slidBar */}
      <div className={hideSlideBarBGStyle}>
        <i
          onClick={handleSlideBarHiddenToggle}
          className={hideSlideBarIconStyle}
        ></i>
        <div className={hideSlideBarContentStyle + " " + styles["iconsHieght"]}>
          <img
            onClick={() => history.push(welcomePath)}
            src={isToggleGridView ? gridIconActive : gridIconNotActive}
            className={styles["gridIcon"]}
            alt=""
          />

          <img
            onClick={() => history.push(customersPath)}
            src={isToggleGridView ? userItemActive : userItemInActive}
            className={styles["gridIcon"]}
            alt=""
          />

          <i
            onClick={() => history.push(artsPath)}
            className={productsViewStyle}
          ></i>

          <img
            onClick={signoutHandler}
            src={logoutIcon}
            className={styles["gridIcon"] + " mt-auto "}
            alt=""
          />
          <span className={styles["logoutText"]}>Logout</span>
        </div>
      </div>

      {/* start route */}
      <div className={styles.rabContent}>
        <Switch>
          <AdminRoute path={welcomePath} exact component={AdminWelcome} />
          <AdminRoute path={`${path}/customers`} component={ListCustomers} />
          <AdminRoute path={artsPath} component={ListArts} />
        </Switch>
      </div>

      {/* end route */}
    </div>
  );
};

export default AdminHome;
