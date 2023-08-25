import { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import { useMutation, useQuery } from "@apollo/client";
import { UPLOAD_IMAGE, GET_IMAGES } from "../utils/mutations";
// import { cloudinaryRef } from "../utils/cloudinaryConfig";

const UploadWidget = () => {
  const [images, setImages] = useState([]);
  const [uploadImage] = useMutation(UPLOAD_IMAGE);
  const { loading, data } = useQuery(GET_IMAGES);

  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dzssvv0mm",
        uploadPreset: "lo0zulor",
        sources: ["local", "url", "google_drive"],
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          const imageURL = result.info.secure_url;
          setImages((prev) => [...prev, { url: imageURL }]);
          handleUploadImage(imageURL);
        }
      }
    );
  }, []);

  //   const handleUploadImage = async (uploadedImageUrl) => {
  //     try {
  //       const { data } = await uploadImage({ variables: { url: uploadedImageUrl } });
  //       console.log("Uploaded image data:", data.uploadImage);
  //     } catch (error) {
  //       console.error("Error uploading image:", error);
  //     }
  //   };
  const handleUploadImage = async (url) => {
    try {
      const { data } = await uploadImage({ variables: { url } });
      console.log("Uploaded image data:", data.uploadImage);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const date = dayjs().format("MMMM DD, YYYY");
  const time = dayjs().format("hh:mma");

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        Right now, it's.. {date} at {time}
      </div>
      <button id="upload-widget" onClick={() => widgetRef.current.open()}>
        Upload Image
      </button>
      <div className="images-preview-container">
        {images.map((image, index) => (
          <div className="image-preview" key={index}>
            <img src={image.url} alt={`Image ${index}`} />
          </div>
        ))}
      </div>
    </>
  );
};

export default UploadWidget;
