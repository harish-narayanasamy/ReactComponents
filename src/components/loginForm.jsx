import React from "react";
import { Redirect } from "react-router-dom";

import Joi from "joi-browser";
import Form from "./common/form";
import auth from "../services/authService";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };
  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await auth.login(data.username, data.password);
     // this.props.history.push("/");

     const { state }=this.props.location;
     window.location=state?state.from.pathname:"/";
    } catch (ex) {
      console.log(ex)
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
        ///toast.error(ex.reponse.data);

      }
    }
    console.log("Submitted");
  };

  render() {

    if(auth.getCurentUser()) return <Redirect to ="/" />
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
