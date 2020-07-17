import React, { useState } from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
// import { Provider } from 'react-redux';

// import InitStore from './redux/store';
import LandingPage from "./components/LandingPage/LandingPage";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Movies from "./components/Movies/Movies";
import Watchlist from "./components/Watchlist/Watchlist";

function App() {

  const [movies, setMovies] = useState([]);
  const [watchlist, setWatchlist] = useState([]);

  const addToWatchlistHandler = (id) => {
    const selectedMovie = movies.find(movie => movie.id === id);
    setWatchlist(watchlist => {
      if(!watchlist.includes(selectedMovie)){
        return [...watchlist, selectedMovie ]
      }
      else{
        return [...watchlist];
      }
    });
}

const movieDeleteHandler = (id) => {
  const updatedWatchlist = watchlist.filter(movie => movie.id !== id);
  setWatchlist(updatedWatchlist);
}

  return (
    // <Provider store= { InitStore() }>
    <Switch>
      <Route path="/" exact>
        <LandingPage/>
      </Route>
      <Route path="/login">
        <Login/>
      </Route>
      <Route path="/register">
        <Register/>
      </Route>
      <Route path="/movies">
        <Movies addToWatchlist={addToWatchlistHandler} watchlist={watchlist} movies={movies} setMovies={setMovies}/>
      </Route>
      <Route path="/watchlist">
        <Watchlist movies={watchlist} deleteFromWatchlist={movieDeleteHandler}/>
      </Route>
      <Redirect to="/"/>
    </Switch>
    // </Provider>
  );
}

export default App;
