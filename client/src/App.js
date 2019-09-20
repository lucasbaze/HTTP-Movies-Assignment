import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import SavedList from './Movies/SavedList';
import MovieList from './Movies/MovieList';
import { Movie } from './Movies/Movie';
import Form from './Form';

const App = () => {
    const [savedList, setSavedList] = useState([]);

    const addToSavedList = movie => {
        setSavedList([...savedList, movie]);
    };

    return (
        <>
            <SavedList list={savedList} />
            <Route exact path="/" component={MovieList} />
            <Route exact path="/update-movie/:id" component={Form} />
            <Route
                path="/movies/:id"
                render={props => {
                    return <Movie {...props} addToSavedList={addToSavedList} />;
                }}
            />
        </>
    );
};

export default App;
