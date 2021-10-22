import AdminHome from "../layouts/Admin";
import { Route, Switch } from "react-router";
import { Redirect } from "react-router-dom";
import AdminRoute from "../Component/ProtectedRoute/AdminRoute";
import UserMangemet from "../layouts/UserMangement";
import LandingPage from "../layouts/Customer/landingPage";
import ProtectedRoute from "../Component/ProtectedRoute/ProtectedRoute";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/signIn" exact component={UserMangemet} />
        <Route path="/signUp" exact component={UserMangemet} />
        <ProtectedRoute path="/home" exact component={LandingPage} />
        <AdminRoute path="/homeAdmin" component={AdminHome} />
        <Redirect from="/" exact to="/signIn" />
      </Switch>
    </div>
  );
}

export default App;
