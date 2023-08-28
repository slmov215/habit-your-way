import React, { useState, useEffect } from 'react';
import dayjs from "dayjs";
import { useMutation } from '@apollo/client'
import { ADD_ACTIVITY } from '../utils/mutations';
import { UPLOAD_IMAGE } from '../utils/mutations';
import UploadWidget from '../components/UploadWidget';
import { saveActivityId, getActivityId } from '../utils/localStorage';

const createPost = () => {
    const [ titleInput, setTitleInput ] = useState("");
    const [ descriptionInput, setDescriptionInput ] = useState("");
    // use state for images 
    const [ addActivity ] = useMutation(ADD_ACTIVITY);
    const [ uploadImage ] = useMutation(UPLOAD_IMAGE);

    // creating method to upload the post activity
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await addActivity({
                variables: {
                    title,
                    description,
                    date,
                    imageUrl,
                    notes,
                },
            });
            setTitleInput('');
        } catch (err) {
            console.error(err);
        }
    }
};


    const date = dayjs().format("MMMM DD, YYYY");
    const time = dayjs().format("hh:mma");

export default function CreatePost({ handleFormSubmit }) {
    return (
        <section>
            <article className='header'>
                <h1>Post your habit!</h1>
                <h4> It's currently.. {date} at {time}
                </h4>
                <form>
                    <label>Post Title</label>
                    <input type="text"></input>

                    <label>What are you up to?</label>
                    <textarea type="text"></textarea>
                </form>
                <UploadWidget />
                <button>Post your habit!</button>
            </article> 
        </section>
    )
}