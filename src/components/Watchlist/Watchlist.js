import React, { Component } from "react";
import { Link } from "react-router-dom";
import watch from "../../assets/cart.png";
import arrow from "../../assets/arrow.png";
import styles from "./Watchlist.module.css";

class Watchlist extends Component {
    render() {
        return (
            <div className={styles.watchlist}>
              <Link to="/movies" className={styles.backArrow}><img src={arrow} alt="Back" className={styles.arrowImage}/></Link>
              <h2 className={styles.heading}>Watch List</h2>
              <div className={styles.watchlistLogoContainer}>
                <img className={styles.watchlistLogo} src={watch} alt="Watchlist" />
                <span className={styles.watchlistCount}>{this.props.movies.length}</span>
              </div>
              <div
                className={styles.watchListSection}
              >
                {this.props.movies &&
                  this.props.movies.map((movie) => {
                    return (
                      <div key={movie.id} className={styles.watchlistContainer}>
                        <div className={styles.watchlistMovieName}>{movie.name}</div>
                        <div className={styles.watchlistMovieYear}>Year: {movie.year}</div>
                        <button className={styles.movieDeleteBtn} onClick={this.props.deleteFromWatchlist.bind(null, movie.id)}>
                          Delete
                        </button>
                      </div>
                    );
                  })}
              </div>
            </div>
          );
    }
}

export default Watchlist;