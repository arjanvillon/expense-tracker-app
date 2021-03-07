import React, { useEffect } from "react";
import Layout from "../../hoc/Layout/Layout";
import {
  IonCard,
  IonCardContent,
  IonCardTitle,
  IonCol,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonRow,
  IonText,
} from "@ionic/react";
import { getTransactions } from "../../store/actions/transaction.action";
import { connect } from "react-redux";
import styles from "./TransactionsPage.module.scss";
import { Transaction } from "../../models/transaction";
import {
  arrowDownOutline as arrowDownOutlineIcon,
  arrowUpOutline as arrowUpOutlineIcon,
} from "ionicons/icons";

function getTotalAmount(transactions: Transaction[]) {
  let total = 0.0;
  transactions.forEach((transaction) => {
    total += parseFloat(transaction.amount);
  });

  return total;
}

interface Props {
  getTransactions: Function;
  transactions: Transaction[];
}

const TransactionsPage: React.FC<Props> = ({
  getTransactions,
  transactions,
}) => {
  const inFlow = getTotalAmount(
    transactions.filter((transaction) => transaction.category === "Income")
  );
  const outFlow = getTotalAmount(
    transactions.filter(
      (transaction) =>
        transaction.category === "Expense" || transaction.category === "Debt"
    )
  );

  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <Layout title="Transactions">
      <IonCard className="ion-padding ion-no-margin ion-margin-bottom">
        <IonCardTitle className={styles.Title}>Report</IonCardTitle>
        <IonCardContent className="ion-padding-vertical ion-no-padding">
          <IonRow className={styles.ReportItem}>
            <IonCol size="10">
              <h4>Inflow</h4>
            </IonCol>
            <IonCol size="2">
              <IonText color="success">
                <span>{inFlow}</span>
              </IonText>
            </IonCol>
          </IonRow>
          <IonRow className={styles.ReportItem}>
            <IonCol size="10">
              <h4>Outflow</h4>
            </IonCol>
            <IonCol size="2">
              <IonText color="danger">
                <span>{outFlow}</span>
              </IonText>
            </IonCol>
          </IonRow>
          <IonRow className={styles.ReportItem}>
            <IonCol size="10">
              <h4>Money left</h4>
            </IonCol>
            <IonCol size="2">
              <IonText color="primary">
                <span>{inFlow - outFlow}</span>
              </IonText>
            </IonCol>
          </IonRow>
        </IonCardContent>
      </IonCard>

      <IonList>
        {transactions.map((transaction) => {
          const isIncome = transaction.category === "Income";

          return (
            <IonRow
              key={`${transaction.id}`}
              className="ion-justify-content-center ion-align-self-center"
            >
              <IonCol
                size="2"
                className="ion-justify-content-center ion-align-items-center"
              >
                <IonIcon
                  size="large"
                  color={isIncome ? "success" : "danger"}
                  icon={isIncome ? arrowUpOutlineIcon : arrowDownOutlineIcon}
                />
              </IonCol>
              <IonCol size="8">
                <IonText>
                  <h5 className="ion-no-margin">{transaction.category}</h5>
                  <small className="ion-no-margin">{transaction?.note}</small>
                </IonText>
              </IonCol>
              <IonCol size="2">
                <IonLabel>{transaction.amount}</IonLabel>
              </IonCol>
            </IonRow>
          );
        })}
      </IonList>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  transactions: state.transaction.transactions,
});

export default connect(mapStateToProps, { getTransactions })(TransactionsPage);
