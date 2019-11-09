import React, { useState, useEffect } from 'react'
import api from '../utils/api'

export default function UpdateMovie(props) {

    const [movie, setMovie] = useState({
        id: '',
        title: '',
        director: '',
        metascore: '',
        stars: [],
    })

    const id = props.match.params.id;

    useEffect(() => {
        api()
            .get(`/api/movies/${props.match.params.id}`)
            .then(res => {
                setMovie(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [props.match.params.id])


    const handleChange = (e) => {
        setMovie({
            ...movie,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        let updatedMovie = {}
        
        if(typeof(movie.stars)==='object'){
            updatedMovie = movie
        } else {
            updatedMovie = {...movie, stars: movie.stars.split(",")}
        }
        

        api()
            .put(`/api/movies/${id}`, updatedMovie)
            .then(res => {
                props.history.push('/')
            })
            .catch(err => {
                console.log("handle Submit err", err)
            })
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="title" placeholder="Title" value={movie.title} onChange={handleChange} />
            <input type="text" name="director" placeholder="Director" value={movie.director} onChange={handleChange} />
            <input type="text" name="metascore" placeholder="Metascore" value={movie.metascore} onChange={handleChange}/>
            <input type="text" name="stars" placeholder="Stars" value={movie.stars} onChange={handleChange} />
            <button type="submit">Save</button>
        </form>
    )
}
