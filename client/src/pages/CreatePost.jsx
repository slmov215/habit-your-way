import React from 'react';
import UploadWidget from '../components/UploadWidget';

export default function CreatePost({ handlePageChange }) {
    return (
        <section>
            <article className='header'>
                <h1>Post your habit!</h1>
                <UploadWidget />
            </article> 
        </section>
    )
}