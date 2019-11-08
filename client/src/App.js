import React, { useState } from 'react';

import { Route } from 'react-router-dom';

import SavedList from './Movies/SavedList';
import MovieList from './Movies/MovieList';
import Movie from './Movies/Movie';
import UpdateMovie from './Movies/UpdateMovie';

const App = () => {
  const [savedList, setSavedList] = useState( [] );

  const addToSavedList = movie => {
    console.log("movie", movie);
    const foundMovie = savedList.find(el => el.title === movie.title)
      if(!foundMovie) {
        setSavedList( [...savedList, movie] );
      } else {alert('Movie already exists')}}
  

  return (
    <div>
      <SavedList list={savedList} />
      {/* <div>Replace this Div with your Routes</div> */}
      <Route exact path="/" exact component={MovieList} />
      <Route exact path="/movies/:id" render={(props) => <Movie {...props} addToSavedList={addToSavedList}/>} />
      <Route exact path="/api/movies/:id" component={UpdateMovie} />
    </div>
  );
};

export default App;