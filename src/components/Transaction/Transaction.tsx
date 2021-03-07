import React from "react";
import styles from "./Transaction.module.scss";
import { IonItem } from "@ionic/react";
import { Transaction } from "../../models/transaction";

interface Props {
  transaction: Transaction;
}

const Transaction: React.FC<Props> = ({ transaction }) => {
  return <div className={styles.Transaction}></div>;
};

export default Transaction;
