import React from 'react';
import { Link } from 'react-router-dom';

import styles from "./LandingPage.module.css";

const LandingPage = () => {
    return (
        <div className={styles.landingPageContainer}>
            <nav className={styles.mainNavigation}>
                <div className={styles.logo}>NETFLIX</div>
                <Link to="/login" className={styles.loginBtn}>Sign In</Link>
            </nav>
            <div className={styles.heroSection}>
                <h1 className={styles.primaryHeading}>Unlimited movies, TV shows and more.</h1>
                <p className={styles.secondaryHeading}>Watch anywhere. Cancel anytime.</p>
                <form className={styles.registerEmailForm}>
                    <input type="email" placeholder="Email Address" name="email" className={styles.emailInput}/>
                    <button type="submit" className={styles.submitBtn}>GET STARTED</button>
                </form>
                <p className={styles.bottomTagline}>Ready to watch? Enter your email to create or restart your membership.</p>
            </div>
        </div>
    );
};

export default LandingPage;
