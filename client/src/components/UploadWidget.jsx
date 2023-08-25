import { useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';

const UploadWidget = () => {
    const [images, setImage] = useState([]);
    const cloudinaryRef = useRef();
    const widgetRef = useRef();
    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: 'dzssvv0mm', 
            uploadPreset: 'lo0zulor',
            sources: ['local', 'url', 'google_drive']
        }, function(error, result){
            if(!error && result && result.event === "success"){
                console.log(result.info);
                const imageURL = result.info.secure_url;
                console.log(imageURL);
                setImage((prev) => [...prev, { url: result.info.secure_url}])
            }
        })
    },[])
    const date = dayjs().format('MMMM DD, YYYY');
    const time = dayjs().format('hh:mma');
    return (
        <>
            <div>Today, it is... {date} at {time}</div>
            <form>
                <label>Title</label>
                <input type="text" id="post-title"></input>
                <label>What are you up to?</label>
                <input type="text" id="post-description"></input>
                <button type="submit">Create Post</button>
            </form>
            <button id="upload-widget" onClick={() => widgetRef.current.open()}>Upload Image</button>
            <div className="images-preview-container">
                {images.map((image) => (
                    <div className="image-preview">
                        <img src={image.url}></img>
                    </div>
                ))}
            </div>
        </>
    )
}

export default UploadWidget;