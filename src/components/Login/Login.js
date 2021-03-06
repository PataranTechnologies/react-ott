// import React, { Component } from "react";
// import { connect } from 'react-redux';
// import { toast, ToastContainer } from 'react-toastify';
// import { userLogin } from '../../redux/actions';
// import styles from "./Login.module.css";
// import { Link } from "react-router-dom";

// class Login extends Component{

//   constructor(props) {
// 		super(props);
//     this.onLogin = this.onLogin.bind(this);
//     this.responseHandler = this.responseHandler.bind(this);
// 	}

// 	componentDidMount() {
// 		document.title = 'Login';
// 	}

// 	onLogin(e) {
// 		e.preventDefault();
// 		const { triggerLogin } = this.props;
// 		triggerLogin(this.Uname.value, this.Pass.value);
// 	}

// 	/**
// 	 * handle the login payload response
// 	 */
// 	responseHandler() {
// 		const { login: { data: { code, message, accessToken } } } = this.props;
// 		toast.dismiss();
// 		if (code === 100) {
// 			toast.success(message);
// 			// setup the access token and redirect to home
// 			localStorage.setItem('AccessToken', accessToken);
// 			window.location = '/home';
// 		} else {
// 			toast.error("Failed authentication.");
// 		}
// 	}

// 	componentWillMount() {
// 		if (localStorage.getItem('adminAccessToken')) {
// 			window.location = '/home';
// 		}
// 	}
//   render(){
//     return (
//       <div className={styles.loginPageContainer}>
//         <form className={styles.loginForm}>
//             <h1 className={styles.heading}>Login</h1>
//             <input className={styles.inputField} type="email" placeholder="Email Address" name="email"/>
//             <input className={styles.inputField} type="password" placeholder="Password" name="password"/>
//             <button type="submit" className={styles.loginBtn} onClick={this.onLogin}>Login</button>
//             <Link to="/register" className={styles.authSwitch}>Create a new account</Link>
//         </form>
//       </div>
//     );
//   }
// }

// // handles the outgoing dispatches
// const mapDispatchToProps = dispatch => {
// 	return {
// 		triggerLogin: (username, password) => dispatch(userLogin({username, password}))
// 	};
// }

// // handles incoming state changes
// const mapStateToProps = state => {
// 	const { fetching, login } = state;
// 	return { fetching, login };
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Login);


//Above code was related to REDUX

import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import styles from "./Login.module.css";
import { Link } from "react-router-dom";

class Login extends Component{

	constructor(props) {
		super(props);
		this.state = {
			userData: {
				email: '',
				password: ''
			}
		}

		this.inputChangeHandler = this.inputChangeHandler.bind(this);
		this.formSubmitHandler = this.formSubmitHandler.bind(this);
	}

	inputChangeHandler = (event) => {
		this.setState({ userData: {...this.state.userData, [event.target.name]: event.target.value}});
	}

	formSubmitHandler = async (event) => {
		event.preventDefault();
		const response = await fetch("http://localhost:3000/login", {
		  method: 'POST',
		  headers: {
			'Content-Type': 'application/json'
		  },
		  body: JSON.stringify({
			  email: this.state.userData.email,
			  password: this.state.userData.password
		  })
		});
		const jsonResponse = await response.json();
		localStorage.setItem("token", jsonResponse.accessToken);
		const token = localStorage.getItem("token");
	
		const usersResponse = await fetch("http://localhost:3000/users");
		const users = await usersResponse.json();
		let name;
		for (const user of users) {
			if(user.email === this.state.userData.email){
				name = user.name;
			}
		}
		localStorage.setItem("name", name);
		if(token && token===jsonResponse.accessToken){
			this.props.history.push("/movies");
		}
	}
  render(){
    return (
      <div className={styles.loginPageContainer}>
        <form className={styles.loginForm} onSubmit={this.formSubmitHandler}>
            <h1 className={styles.heading}>Login</h1>
            <input className={styles.inputField} type="email" placeholder="Email Address" name="email" value={this.state.userData.email} onChange={this.inputChangeHandler}/>
            <input className={styles.inputField} type="password" placeholder="Password" name="password" value={this.state.userData.password} onChange={this.inputChangeHandler}/>
            <button type="submit" className={styles.loginBtn}>Login</button>
            <Link to="/register" className={styles.authSwitch}>Create a new account</Link>
        </form>
      </div>
    );
  }
}

export default withRouter(Login);