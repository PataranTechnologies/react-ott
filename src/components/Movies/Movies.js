import React, { Component } from "react";
import { Link } from "react-router-dom";
import watchLogo from "../../assets/cart.png";

import styles from "./Movies.module.css";

class Watchlist extends Component{

    constructor(props){
        super(props);
        this.state={
            searchText: '',
        }

        this.logoutHandler = this.logoutHandler.bind(this);
        this.searchSubmitHandler = this.searchSubmitHandler.bind(this);
        this.searchTextHandler = this.searchTextHandler.bind(this);
    }

    componentDidMount () {
        const fetchMovies = async () => {
            const response = await fetch("http://localhost:3004/movies");
            const jsonResponse = await response.json();
            this.props.setMovies(jsonResponse);
        }
        fetchMovies();
    }

    logoutHandler = () => {
        localStorage.clear();
    }

    // addToWatchlist = (id) => {
    //   const movie = this.state.movies.find(movie=> movie.id === id);
    //   const updatedWatchlist = this.state.watchlist.concat(movie);
    //   this.setState({watchlist: updatedWatchlist});
    //   console.log(movie);
    //   console.log(this.state.watchlist);
    // }

    searchSubmitHandler = (event) => {
        event.preventDefault();
        fetch(`http://localhost:3004/movies?q=${this.state.searchText}`)
          .then((res) => res.json())
          .then((movie) => this.props.setMovies(movie));
      };

    searchTextHandler = (event) => {
        this.setState({searchText: event.target.value});
      };


    render(){
        return (
            <div className={styles.moviesContainer}>
              <h2 className={styles.userName}>Welcome, {localStorage.getItem("name")}</h2>
              <Link onClick={this.logoutHandler} to="/" className={styles.logoutBtn}>
                Logout
              </Link>
              <Link className={styles.watchlistLogoContainer} to="/watchlist">
                <img className={styles.watchlistLogo} src={watchLogo} alt="Watchlist" />
                <span className={styles.watchlistCount}>{this.props.watchlist.length}</span>
              </Link>
              <div className={styles.moviesSection}>
                <h2 className={styles.textOne}>Movies</h2>
                <form className={styles.searchForm} onSubmit={this.searchSubmitHandler}>
                  <input
                    className={styles.searchInput}
                    type="text"
                    placeholder="Search Movies"
                    value={this.state.searchText}
                    onChange={this.searchTextHandler}
                  />
                  <button className={styles.searchBtn} type="submit">
                    Search
                  </button>
                </form>
                {this.props.movies.map((movie) => {
                  return (
                    <div className={styles.movieBox} key={movie.id}>
                      <div className={styles.movieHead}>
                        <div className={styles.movieName}>{movie.name}</div>
                      </div>
                      <div className={styles.movieBody}>
                        <div className={styles.movieDescription}>
                          {movie.description}
                        </div>
                        <div className={styles.movieYear}>Year: {movie.year}</div>
                        <button
                          className={styles.watchlistBtn}
                          onClick={this.props.addToWatchlist.bind(this, movie.id)}
                        >
                          Add to Watchlist
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
    }
}

export default Watchlist;