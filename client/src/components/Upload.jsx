import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { uploadImage } from "../apicalls/product";
import { message } from "antd";

const Upload = () => {
  const [previewImages, setPreviewImages] = useState([]);
  const [images, setImages] = useState([]);

  const onChangeHandler = (event) => {
    const seletedImages = event.target.files;
    const seletedImagesArray = Array.from(seletedImages);
    setImages((prev) => [...prev, ...seletedImagesArray]);

    const previewImagesArray = seletedImagesArray.map((img) => {
      return URL.createObjectURL(img);
    });
    setPreviewImages((prev) => prev.concat(previewImagesArray));
  };

  const deleteHandler = (img) => {
    setPreviewImages(previewImages.filter((element) => element !== img));
    URL.revokeObjectURL(img);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (let i = 0; i < images.length; i++) {
      formData.append("product_images", images[i]);
    }
    try {
      const response = await uploadImage(formData);
      if (response.isSuccess) {
        message.success(response.message);
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      message.error(err.message);
    }
  };
  return (
    <section>
      <h1 className="text-2xl font-bold mb-5">
        Upload Your Product's Image here.
      </h1>
      <form
        action="post"
        encType="multipart/form-data"
        onSubmit={submitHandler}
      >
        <label
          htmlFor="upload"
          className="p-2 rounded-md border-dashed border-2 border-blue-600 font-medium my-3 text-blue-600 cursor-pointer"
        >
          Upload from device
        </label>
        <input
          type="file"
          hidden
          id="upload"
          name="product_images"
          multiple
          accept="image/png, image/jpeg, image/jpg"
          onChange={() => onChangeHandler(event)}
        />
        <div className="flex gap-2 mt-4 ">
          {previewImages.map((img, index) => (
            <div key={index} className="basis-1/6 h-29 relative">
              <img
                src={img}
                alt={index}
                className="w-full h-full object-cover rounded-md"
              />
              <XMarkIcon
                width={30}
                height={25}
                className="absolute z-20 top-0 right-0 text-red-400 hover:text-red-600"
                onClick={() => deleteHandler(img)}
              />
            </div>
          ))}
        </div>
        <button className="block my-4 text-white bg-blue-600 rounded-md px-2 py-1 font-medium  hover:bg-white hover:text-blue-600 hover: border-2 border-blue-600">
          Upload
        </button>
      </form>
    </section>
  );
};

export default Upload;
