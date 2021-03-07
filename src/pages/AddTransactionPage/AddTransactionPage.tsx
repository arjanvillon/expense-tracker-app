import {
  IonButton,
  IonDatetime,
  IonInput,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import Layout from "../../hoc/Layout/Layout";
import { addTransaction } from "../../store/actions/transaction.action";
import { getWallets } from "../../store/actions/auth.action";
import { Wallet } from "../../models/user";
import { useHistory } from "react-router";

interface Props {
  getWallets: Function;
  addTransaction: Function;
  wallets: Wallet[];
}

const AddTransactionPage: React.FC<Props> = ({
  getWallets,
  addTransaction,
  wallets,
}) => {
  const history = useHistory();
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      wallet: wallets[0].id,
      amount: 0,
      category: "Income",
      date: Date(),
    },
  });

  useEffect(() => {
    getWallets();
  }, []);

  const onSubmit = async (data) => {
    const { wallet, amount, category, note, date } = data;
    const transaction = await addTransaction(
      wallet,
      amount,
      category,
      note,
      date
    );
    reset();
    history.push("/my/transactions");
  };

  return (
    <Layout title="Add Transaction">
      <form onSubmit={handleSubmit(onSubmit)}>
        <IonItem>
          <IonLabel position="stacked">Wallet</IonLabel>
          <IonSelect
            name="wallet"
            ref={register({ required: true })}
            interface="action-sheet"
          >
            {wallets.map((wallet) => (
              <IonSelectOption value={wallet.id}>{wallet.name}</IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Amount</IonLabel>
          <IonInput type="text" name="amount" ref={register} placeholder="₱0" />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Category</IonLabel>
          <IonSelect name="category" ref={register} interface="action-sheet">
            <IonSelectOption value="Income">Income</IonSelectOption>
            <IonSelectOption value="Expense">Expense</IonSelectOption>
            <IonSelectOption value="Debt">Debt</IonSelectOption>
          </IonSelect>
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Note</IonLabel>
          <IonInput type="text" name="note" ref={register} placeholder="Note" />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Date</IonLabel>
          <IonDatetime name="date" ref={register} />
        </IonItem>

        <IonButton expand="block" type="submit" className="ion-margin-top">
          Add Transaction
        </IonButton>
      </form>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  wallets: state.auth.wallets,
});

export default connect(mapStateToProps, { getWallets, addTransaction })(
  AddTransactionPage
);
