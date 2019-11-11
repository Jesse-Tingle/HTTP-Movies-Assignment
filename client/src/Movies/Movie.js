import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import api from '../utils/api';
// import UpdateMovie from './UpdateMovie';

import { Link } from 'react-router-dom';

const Movie = (props) => {
  console.log('movie.js props', props)
  const [movie, setMovie] = useState(null);
 console.log('Movies', props.match.params.id);
 
 const id = props.match.params.id;
    // change ^^^ that line and grab the id from the URL
    // You will NEED to add a dependency array to this effect hook
 
 useEffect(() => {
       api()
        .get(`/api/movies/${id}`)
        .then(response => {
          console.log('Movie.js response.data', response.data)
          setMovie(response.data);
        })
        .catch(error => {
          console.error(error);
        });

  },[id]);
  
  // Uncomment this only when you have moved on to the stretch goals
  const saveMovie = () => {
    console.log('saveMovieProps', props);
    const addToSavedList = props.addToSavedList;
    addToSavedList(movie)
  }

  if (!movie) {
    return <div>Loading movie information...</div>;
  }
  
  

  const handleDelete = (e, id) => {


    if (window.confirm('Are you sure you want to delete this movie?'))
    
    api()
      .delete(`api/movies/${id}`)
      .then(res => {
        console.log('Movie was deleted!') 
        console.log('delete movie', props)

        props.history.push('/');     
      })
      .catch(err => {
        console.log(err, err.response)
      })
  }


  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} {...props} />
      <Link to={`/api/movies/${id}`} className="edit-button">Edit</Link>
      <div onClick={saveMovie} className="save-button">Save</div>
      <button className="delete-button" onClick={(e) => handleDelete(e, movie.id)}>Delete</button>
    </div>
  );
}

export default Movie;