import React from "react";
import { IonButton, IonInput, IonItem, IonLabel } from "@ionic/react";
import { useForm } from "react-hook-form";
import Layout from "../../hoc/Layout/Layout";
import { connect } from "react-redux";
import { registerUser } from "../../store/actions/auth.action";
import { Redirect } from "react-router";

interface Props {
  registerUser: Function;
  authenticated: boolean;
}

const RegisterPage: React.FC<Props> = ({ registerUser, authenticated }) => {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    const { email, username, password } = data;
    registerUser(email, username, password);
  };

  if (authenticated) {
    <Redirect to="/my/transactions" />;
  }

  return (
    <Layout title="Register">
      <form onSubmit={handleSubmit(onSubmit)}>
        <IonItem>
          <IonLabel position="stacked">Email</IonLabel>
          <IonInput
            type="email"
            name="email"
            ref={register()}
            placeholder="Your Email"
          />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Username</IonLabel>
          <IonInput
            type="text"
            name="username"
            ref={register()}
            placeholder="Your Username"
          />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Password</IonLabel>
          <IonInput
            type="password"
            name="password"
            ref={register()}
            placeholder="Your Password"
          />
        </IonItem>

        <IonButton expand="block" type="submit" className="ion-margin-top">
          Register
        </IonButton>
      </form>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  authenticated: state.auth.authenticated,
});

export default connect(null, { registerUser })(RegisterPage);
