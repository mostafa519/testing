import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function MovieDetails() {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = () => {
      axios
        .get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=7a1c19ea3c361a4d3cc53eb70ef8298c`)
        .then((res) => {
          setMovieDetails(res.data);
        })
        .catch((err) => {
          console.log(err);
          setError('Error fetching movie details');
        });
    };

    fetchMovieDetails();
  }, [movieId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!movieDetails) {
    return <div>Loading...</div>;
  }

  const gradientStyle = {
    backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 100%), url(https://image.tmdb.org/t/p/w500/${movieDetails.poster_path})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  };

  return (
    <div className=' container mx-auto d-flex justify-content-center align-items-center mt-3 border border-5 rounded-3' style={gradientStyle}>
      <img className='w-25 h-25 rounded-5' src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`} alt={movieDetails.title} />
      <div>
        <div className='ms-3'>
          <h1 className='text-white'>movieName: {movieDetails.title}</h1>
          <p className='text-white'>Description: {movieDetails.overview}</p>
          <p className='text-white'>Release Date: {movieDetails.release_date}</p>
          <p className='text-white'>Vote Average: {movieDetails.vote_average}</p>
          <p className='text-white'>Genres: {movieDetails.genres.map((genre) => genre.name).join(', ')}</p>
        <button className='btn btn-danger'>Watch Now </button>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
