import React from "react";
import { Link } from "react-router-dom";

import styles from "./Register.module.css";

const Register = () => {
  return (
    <div>
      <div className={styles.registerPageContainer}>
        <Link to="/" className={styles.revertBack}>
          Go Back
        </Link>
        <form className={styles.registerForm}>
          <h1 className={styles.heading}>Register</h1>
          <input
            className={styles.inputField}
            type="name"
            placeholder="Your Name"
            name="name"
          />
          <input
            className={styles.inputField}
            type="email"
            placeholder="Email Address"
            name="email"
          />
          <input
            className={styles.inputField}
            type="password"
            placeholder="Password"
            name="password"
          />
          <button type="submit" className={styles.registerBtn}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
