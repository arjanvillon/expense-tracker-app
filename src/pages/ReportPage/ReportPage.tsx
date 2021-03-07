import React, { useEffect } from "react";
import Layout from "../../hoc/Layout/Layout";
import { Cell, PieChart, Pie, ResponsiveContainer } from "recharts";
import { connect } from "react-redux";
import { Transaction } from "../../models/transaction";
import { getTransactions } from "../../store/actions/transaction.action";
import { IonItem, IonLabel, IonList } from "@ionic/react";
import styles from "./ReportPage.module.scss";

interface Props {
  transactions: Transaction[];
  getTransactions: Function;
}

const pieChartColors = ["#2fdf75", "#ffd534", "#ff4961"];

const ReportPage: React.FC<Props> = ({ transactions, getTransactions }) => {
  useEffect(() => {
    if (transactions.length === 0) {
      getTransactions();
    }
  }, []);

  console.log(transactions);

  return (
    <Layout title="Report">
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={transactions}
            dataKey="amount"
            nameKey="category"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#2fdf75"
            label
          >
            {transactions.map((transaction, index) => (
              <Cell key={`cell-${index}`} fill={pieChartColors[index]}></Cell>
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      <div className={styles.Legends}>
        {transactions.map((transaction, index) => (
          <div className={styles.Legend}>
            <div
              className={styles.Circle}
              style={{ backgroundColor: pieChartColors[index] }}
            ></div>
            <span className={styles.Label}>{transaction.category}</span>
          </div>
        ))}
      </div>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  transactions: state.transaction.transactions.map((transaction) => ({
    id: transaction.id,
    amount: parseFloat(transaction.amount),
    category: transaction.category,
  })),
});

export default connect(mapStateToProps, { getTransactions })(ReportPage);
