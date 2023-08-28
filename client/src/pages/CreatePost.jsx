import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { useMutation } from "@apollo/client";
import { ADD_ACTIVITY } from "../utils/mutations";
import UploadWidget from "../components/UploadWidget";
import { saveActivityId, getActivityId } from "../utils/localStorage";

const CreatePost = () => {
    const todayDate = dayjs().format("MMMM DD, YYYY");
    const time = dayjs().format("hh:mma");
    const [ title, setTitle ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ date, setDate ] = useState('');
    const [ savedActivityId, setSavedActivityId ] = useState(getActivityId());
    const [ addActivity ] = useMutation(ADD_ACTIVITY);

  useEffect(() => {
    return () => saveActivityId(savedActivityId);
  });
  // creating method to upload the post activity
  const handleFormSubmit = async (event) => {
    event.preventDefault();

        try {
            const { data } = await addActivity({
                variables: {
                    title: title,
                    description: description,
                    date: date,
                },
            });
            setTitle('')
            setDescription('')
            setDate('')
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <section>
            <article className='header'>
                <h1>Post your habit!</h1>
                <h4> It's currently... {todayDate} {time}
                </h4>
                <form
                    onSubmit={handleFormSubmit}>
                    <label>Post Title</label>
                    <input type="text"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}></input>

                    <label>Today's Date</label>
                    <input type="text"
                        value={todayDate}
                        onChange={(event) => setDate(event.target.value)}></input>

                    <label>What are you up to?</label>
                    <textarea type="text"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}></textarea>
                <button>Post your habit!</button>
                </form>
                <UploadWidget />
            </article> 
        </section>
    )
}

export default CreatePost;
