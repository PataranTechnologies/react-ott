import React, { Component } from "react";

import styles from "./Login.module.css";
import { Link } from "react-router-dom";

class Login extends Component{
  render(){
    return (
      <div className={styles.loginPageContainer}>
        <form className={styles.loginForm}>
            <h1 className={styles.heading}>Login</h1>
            <input className={styles.inputField} type="email" placeholder="Email Address" name="email"/>
            <input className={styles.inputField} type="password" placeholder="Password" name="password"/>
            <button type="submit" className={styles.loginBtn}>Login</button>
            <Link to="/register" className={styles.authSwitch}>Create a new account</Link>
        </form>
      </div>
    );
  }
}

export default Login;
