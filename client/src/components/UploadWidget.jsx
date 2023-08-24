import { useEffect, useRef, useState } from 'react';

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
    return (
        <>
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