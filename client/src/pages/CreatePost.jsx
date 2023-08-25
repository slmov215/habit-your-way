import React from 'react';

export default function CreatePost({ handlePageChange }) {
    return (
        <div className="form">
            <h2>Create a Post!</h2>
            <article className="post-form">
                <Form>
                    <Form.Group className='mb-3' controlId='formBasicText'>
                        <Form.Label>Activity:</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Ex: Morning Jog'
                        />
                    </Form.Group>

                    <Form.Group className='mb-3' controlId='formControlTextarea'>
                        <Form.Label>Description:</Form.Label>
                        <Form.Control
                            as='textarea'
                            placeholder="Ex: I ran 4 miles today!"
                            rows='4'
                        />
                    </Form.Group>
                    <Button variant='primary' type='submit'>Create Post</Button>
                </Form>
            </article>
        </div>
    )
}