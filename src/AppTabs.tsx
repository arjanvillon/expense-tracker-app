import {
  IonIcon,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { connect } from "react-redux";
import React from "react";
import {
  walletOutline as walletOutlineIcon,
  addOutline as addOutlineIcon,
  pieChartOutline as pieChartOutlineIcon,
} from "ionicons/icons";
import { Redirect, Route } from "react-router";
import TransactionsPage from "./pages/TransactionsPage/TransactionsPage";
import AddTransactionPage from "./pages/AddTransactionPage/AddTransactionPage";
import ReportPage from "./pages/ReportPage/ReportPage";

interface Props {
  authenticated: boolean;
}

const AppTabs: React.FC<Props> = ({ authenticated }) => {
  if (!authenticated) {
    return <Redirect to="/login" />;
  }

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/my/transactions">
          <TransactionsPage />
        </Route>
        <Route exact path="/my/transactions/add">
          <AddTransactionPage />
        </Route>
        <Route exact path="/my/transactions/report">
          <ReportPage />
        </Route>
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="home" href="/my/transactions">
          <IonIcon icon={walletOutlineIcon} />
        </IonTabButton>
        <IonTabButton tab="add" href="/my/transactions/add">
          <IonIcon icon={addOutlineIcon} />
        </IonTabButton>
        <IonTabButton tab="report" href="/my/transactions/report">
          <IonIcon icon={pieChartOutlineIcon} />
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

const mapStateToProps = (state) => ({
  authenticated: state.auth.authenticated,
});

export default connect(mapStateToProps)(AppTabs);
