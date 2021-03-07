import { Redirect, Route, Switch } from "react-router-dom";
import { IonApp } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import AppTabs from "./AppTabs";
import { connect } from "react-redux";
import { loadUser } from "./store/actions/auth.action";
import { useEffect } from "react";

interface Props {
  loadUser: Function;
}

const App: React.FC<Props> = ({ loadUser }) => {
  useEffect(() => {
    loadUser();
  }, []);

  return (
    <IonApp>
      <IonReactRouter>
        <Switch>
          <Route exact path="/register">
            <RegisterPage />
          </Route>
          <Route exact path="/login">
            <LoginPage />
          </Route>
          <Route path="/my">
            <AppTabs />
          </Route>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
        </Switch>
      </IonReactRouter>
    </IonApp>
  );
};

export default connect(null, { loadUser })(App);
