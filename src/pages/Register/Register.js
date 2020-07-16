import React, { Component } from "react";
import { Link } from "react-router-dom";

import styles from "./Register.module.css";

class Register extends Component{
    render(){
        return (
            <div>
              <div className={styles.registerPageContainer}>
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
                  <div className={styles.radio}><label><input type="radio" name="plan" value="paid" className={styles.radioBtn}/>Paid</label></div>
                  <div className={styles.radio}><label><input type="radio" name="plan" value="guest" className={styles.radioBtn}/></label>Guest</div>
                  <button type="submit" className={styles.registerBtn}>
                    Register
                  </button>
                  <Link to="/login" className={styles.authSwitch}>Already a member? Login</Link>
                </form>
              </div>
            </div>
          );
    }
}

export default Register;
