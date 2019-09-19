import React, { useState, useEffect } from 'react';
import { useForm } from './hooks/useForm';
import axios from 'axios';

const Form = ({ match }) => {
    const submitHandler = formValues => {
        axios.put(`http://localhost:5000/api/movies/${formValues.id}`, {
            formValues,
        });
    };

    const [formValues, handleChange, handleSubmit, setFormValues] = useForm(
        '',
        submitHandler
    );
    const { id } = match.params;

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/movies/${id}`)
            .then(res => setFormValues(res.data))
            .catch(err => console.log(err.response));
    }, []);

    const style = {
        border: '1px solid black',
        marginBottom: 10,
        width: '100%',
        maxWidth: 500,
    };

    return (
        <>
            <h1>Form</h1>
            <form onSubmit={handleSubmit}>
                <input
                    name="title"
                    value={formValues.title}
                    onChange={handleChange}
                    style={style}
                    placeholder="title"
                />
                <br />
                <input
                    name="director"
                    value={formValues.director}
                    onChange={handleChange}
                    style={style}
                    placeholder="director"
                />
                <br />
                <input
                    name="metascore"
                    type="number"
                    value={formValues.metascore}
                    onChange={handleChange}
                    style={style}
                    placeholder="metascore"
                />
                <button type="submit">Save Changes</button>
            </form>
        </>
    );
};

export default Form;
