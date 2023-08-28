import React, { useState, useEffect } from 'react';
import dayjs from "dayjs";
import { useMutation } from '@apollo/client'
import { ADD_ACTIVITY } from '../utils/mutations';
import UploadWidget from '../components/UploadWidget';
import { saveActivityId, getActivityId } from '../utils/localStorage';

const CreatePost = () => {
    const [ title, setTitle ] = useState("");
    const [ description, setDescription ] = useState("");
    const [ date, setDate ] = useState("");
    const [ saveActivityId, setSaveActivityId ] = useState(getActivityId());
    const [ addActivity ] = useMutation(ADD_ACTIVITY);

    // creating method to upload the post activity
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await addActivity({
                variables: {
                    title,
                    description,
                    date,
                },
            });
        } catch (err) {
            console.error(err);
        }
    }

    // const date = dayjs().format("MMMM DD, YYYY");
    // const time = dayjs().format("hh:mma");

    return (
        <section>
            <article className='header'>
                <h1>Post your habit!</h1>
                <h4> It's currently.. 
                </h4>
                <form
                    onSubmit={handleFormSubmit}>
                    <label>Post Title</label>
                    <input type="text"></input>

                    <label>What are you up to?</label>
                    <textarea type="text"></textarea>
                <button>Post your habit!</button>
                </form>
                <UploadWidget />
            </article> 
        </section>
    )
}

export default CreatePost;