// import React, { Component } from "react";
// import { connect } from 'react-redux';
// import { toast, ToastContainer } from 'react-toastify';
// import { genericCreateEntity } from '../../redux/actions';
// import { Link } from "react-router-dom";

// import styles from "./Register.module.css";

// class Register extends Component{

//   constructor(props) {
// 		super(props);
//     this.onRegister = this.onRegister.bind(this);
//     this.responseHandler = this.responseHandler.bind(this);
// 	}

// 	componentDidMount() {
// 		document.title = 'Login';
// 	}

// 	onRegister(e) {
// 		e.preventDefault();
// 		const { triggerRegister } = this.props;
// 		triggerRegister(this.Uname.value, this.Pass.value, this.Status.value);
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
//     render(){
//         return (
//             <div>
//               <div className={styles.registerPageContainer}>
//                 <form className={styles.registerForm}>
//                   <h1 className={styles.heading}>Register</h1>
//                   <input
//                     className={styles.inputField}
//                     type="name"
//                     placeholder="Your Name"
//                     name="name"
//                   />
//                   <input
//                     className={styles.inputField}
//                     type="email"
//                     placeholder="Email Address"
//                     name="email"
//                   />
//                   <input
//                     className={styles.inputField}
//                     type="password"
//                     placeholder="Password"
//                     name="password"
//                   />
//                   <div className={styles.radio}><label><input type="radio" name="plan" value="paid" className={styles.radioBtn}/>Paid</label></div>
//                   <div className={styles.radio}><label><input type="radio" name="plan" value="guest" className={styles.radioBtn}/></label>Guest</div>
//                   <button type="submit" className={styles.registerBtn} onClick={this.onRegister}>
//                     Register
//                   </button>
//                   <Link to="/login" className={styles.authSwitch}>Already a member? Login</Link>
//                 </form>
//               </div>
//             </div>
//           );
//     }
// }

// // handles the outgoing dispatches
// const mapDispatchToProps = dispatch => {
// 	return {
// 		triggerRegister: (username, password, status) => dispatch(genericCreateEntity({username, password, status}))
// 	};
// }

// // handles incoming state changes
// const mapStateToProps = state => {
// 	const { fetching, login } = state;
// 	return { fetching, login };
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Register);

//REDUX ABOVE CODE

import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import styles from "./Register.module.css";

class Register extends Component {

  constructor(props){
    super(props);

    this.state= {
      userData: {
        email: '',
        password: '',
        name: ''
      }
    }

    this.inputChangeHandler = this.inputChangeHandler.bind(this);
    this.formSubmitHandler = this.formSubmitHandler.bind(this);
  }

  inputChangeHandler = (event) => {
    this.setState({ userData:  {...this.state.userData, [event.target.name]: event.target.value}});
  };

  formSubmitHandler = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:3000/register", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.userData)
    });
    const jsonResponse = await response.json();
    localStorage.setItem("token", jsonResponse.accessToken);
    localStorage.setItem("name", this.state.userData.name);
    const token = localStorage.getItem("token");
    if(token && token===jsonResponse.accessToken){
        this.props.history.push("/movies");
    }
  };

  render() {
    return (
      <div>
        <div className={styles.registerPageContainer}>
          <form className={styles.registerForm} onSubmit={this.formSubmitHandler}>
            <h1 className={styles.heading}>Register</h1>
            <input
              className={styles.inputField}
              type="name"
              placeholder="Your Name"
              name="name"
              value={this.state.userData.name}
              onChange={this.inputChangeHandler}
            />
            <input
              className={styles.inputField}
              type="email"
              placeholder="Email Address"
              name="email"
              value={this.state.userData.email}
              onChange={this.inputChangeHandler}
            />
            <input
              className={styles.inputField}
              type="password"
              placeholder="Password"
              name="password"
              value={this.state.userData.password}
              onChange={this.inputChangeHandler}
            />
            <div className={styles.radio}>
              <label>
                <input
                  type="radio"
                  name="plan"
                  value="paid"
                  className={styles.radioBtn}
                />
                Paid
              </label>
            </div>
            <div className={styles.radio}>
              <label>
                <input
                  type="radio"
                  name="plan"
                  value="guest"
                  className={styles.radioBtn}
                />
              </label>
              Guest
            </div>
            <button type="submit" className={styles.registerBtn}>
              Register
            </button>
            <Link to="/login" className={styles.authSwitch}>
              Already a member? Login
            </Link>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(Register);