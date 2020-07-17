import React, { Component } from "react";
import { connect } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { genericCreateEntity } from '../../redux/actions';
import { Link } from "react-router-dom";

import styles from "./Register.module.css";

class Register extends Component{

  constructor(props) {
		super(props);
    this.onRegister = this.onRegister.bind(this);
    this.responseHandler = this.responseHandler.bind(this);
	}

	componentDidMount() {
		document.title = 'Login';
	}

	onRegister(e) {
		e.preventDefault();
		const { triggerRegister } = this.props;
		triggerRegister(this.Uname.value, this.Pass.value, this.Status.value);
	}

	/**
	 * handle the login payload response
	 */
	responseHandler() {
		const { login: { data: { code, message, accessToken } } } = this.props;
		toast.dismiss();
		if (code === 100) {
			toast.success(message);
			// setup the access token and redirect to home
			localStorage.setItem('AccessToken', accessToken);
			window.location = '/home';
		} else {
			toast.error("Failed authentication.");
		}
	}

	componentWillMount() {
		if (localStorage.getItem('adminAccessToken')) {
			window.location = '/home';
		}
	}
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
                  <button type="submit" className={styles.registerBtn} onClick={this.onRegister}>
                    Register
                  </button>
                  <Link to="/login" className={styles.authSwitch}>Already a member? Login</Link>
                </form>
              </div>
            </div>
          );
    }
}

// handles the outgoing dispatches
const mapDispatchToProps = dispatch => {
	return {
		triggerRegister: (username, password, status) => dispatch(genericCreateEntity({username, password, status}))
	};
}

// handles incoming state changes
const mapStateToProps = state => {
	const { fetching, login } = state;
	return { fetching, login };
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);