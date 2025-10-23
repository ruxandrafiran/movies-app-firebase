import React, { useContext, useState, useEffect } from 'react'
import Context from '../context'
import "../styles/Home.scss"
import Movie from './pages-components/Movie'

function Homepage() {

  //a49657255c827cf52a3f7b9ebbd6571e

  const [user, setUser] = useContext(Context)
  const [movies, setMovies] = useState(null)
  // let moviesArray = null

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.REACT_APP_API_KEY}`).then(result => result.json()).then(data => {
        let moviesTrunc = data.results.slice(0, 10)
        setMovies(moviesTrunc)
        // moviesArray = data
          //console.log(movies)
      })
  }, [])
  

  return (
    <div className='pageHome'>
      <h2>Popular today:</h2>
      <div className='movies'>
        {movies && movies?.map((movie, index) => {
          return (
            <Movie key={index} movie={movie} index={index}/>
          )
        })}
      </div>
    </div>
  )
}

export default Homepage