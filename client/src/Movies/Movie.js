import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';
import { Link } from 'react-router-dom';
export const Movie = props => {
    const [movie, setMovie] = useState(null);

    const fetchMovie = id => {
        axios
            .get(`http://localhost:5000/api/movies/${id}`)
            .then(res => setMovie(res.data))
            .catch(err => console.log(err.response));
    };

    useEffect(() => {
        fetchMovie(props.match.params.id);
    }, [props.match.params.id]);

    const deleteMovie = id => {
        axios
            .delete(`http://localhost:5000/api/movies/${id}`)
            .then(res => {
                props.history.push('/');
            })
            .catch(err => console.log(err));
    };

    const saveMovie = () => {
        const addToSavedList = props.addToSavedList;
        addToSavedList(movie);
    };

    if (!movie) {
        return <div>Loading movie information...</div>;
    } else {
        return (
            <div className="save-wrapper">
                <MovieCard movie={movie} />
                <div className="save-button" onClick={saveMovie}>
                    Save
                </div>
                <Link className="edit-button" to={`/update-movie/${movie.id}`}>
                    Edit
                </Link>
                <div
                    className="delete-button"
                    onClick={() => deleteMovie(movie.id)}
                >
                    Delete
                </div>
            </div>
        );
    }
};
