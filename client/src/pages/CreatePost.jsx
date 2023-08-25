import React, { useState, useEffect } from 'react';
import dayjs from "dayjs";
import { useMutation } from '@apollo/client'
import { ADD_ACTIVITY } from '../utils/mutations';
import { UPLOAD_IMAGE } from '../utils/mutations';
import UploadWidget from '../components/UploadWidget';

const createPost = () => {
    const [ titleInput, setTitleInput ] = useState("");
    const [ descriptionInput, setDescriptionInput ] = useState("");
    const [ dateInput, setDateInput ] = useState("");
    // use state for images 
    const [ addActivity ] = useMutation(ADD_ACTIVITY);
    const [ uploadImage ] = useMutation(UPLOAD_IMAGE);

}

    const date = dayjs().format("MMMM DD, YYYY");
    const time = dayjs().format("hh:mma");

export default function CreatePost({ handlePageChange }) {
    return (
        <section>
            <article className='header'>
                <h1>Post your habit!</h1>
                <h4> Right now, it's.. {date} at {time}
                </h4>
                <form>
                    <label>Post Title</label>
                    <input type="text"></input>

                    <label>What are you up to?</label>
                    <textarea type="text"></textarea>
                    <UploadWidget />
                    <button type="submit">Post your habit!</button>
                </form>
            </article> 
        </section>
    )
}