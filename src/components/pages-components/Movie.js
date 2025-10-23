import React from 'react'
import { useNavigate } from 'react-router-dom'
import "../../styles/Movie.scss"
import "../AboutMovie"

function Movie(props) {
  
  const movie = {...props.movie}

  let navigate = useNavigate()

  const handleMovie = () => {
    navigate(`/movies/${movie.id}`)
  }

  return (
    <div className='movie'>
      <h2>#{props.index + 1} {movie.title || movie.name}</h2>
      <img onClick={() => handleMovie()} src={`https://www.themoviedb.org/t/p/w220_and_h330_face${movie.poster_path}`} width="250px"/>
    </div>
  )
}

export default Movie