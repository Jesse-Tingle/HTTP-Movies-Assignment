import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import MovieCard from './MovieCard';
import api from '../utils/api';

const MovieList = props => {
  const [movies, setMovies] = useState([])
  useEffect(() => {
    const getMovies = () => {
      api()
        .get('/api/movies')
        .then(response => {
          setMovies(response.data);
        })
        .catch(error => {
          console.error('Server Error', error);
        });
    }
    
    getMovies();
  }, []);



  

  
  return (
    <div className="movie-list">
      {movies.map(movie => (
        <MovieDetails key={movie.id} movie={movie}  />
      ))}
    </div>
  );
}

function MovieDetails({ movie, handleDelete }) {
  
  return (
    <Link to={`/movies/${movie.id}`}>
      <MovieCard movie={movie}/>
      
    </Link>
  );
}

export default MovieList;