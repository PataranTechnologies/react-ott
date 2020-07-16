import React from "react";

import styles from "./Login.module.css";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className={styles.loginPageContainer}>
        <Link to="/" className={styles.revertBack}>Go Back</Link>
      <form className={styles.loginForm}>
          <h1 className={styles.heading}>Login</h1>
          <input className={styles.inputField} type="email" placeholder="Email Address" name="email"/>
          <input className={styles.inputField} type="password" placeholder="Password" name="password"/>
          <button type="submit" className={styles.loginBtn}>Login</button>
      </form>
    </div>
  );
};

export default Login;
