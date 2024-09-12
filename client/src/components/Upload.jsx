import React, { useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { deleteSavedImages, uploadImage } from "../apicalls/product";
import { message } from "antd";
import { getSavedImages } from "../apicalls/product";

const Upload = ({editProductId,setActiveTabKey}) => {
  const [previewImages, setPreviewImages] = useState([]);
  const [images, setImages] = useState([]);
  const [savedImages, setSavedImages] = useState([])

  const getImages = async(product_id)=>{
    try {
      const response = await getSavedImages(product_id);
    if (response.isSuccess) {
        setSavedImages(response.data.images)
    }else{
      throw new Error(response.message)
    }
    } catch (err) {
      message.error(err.message);
    }
  }

  useEffect(_=>{
    getImages(editProductId)
  },[])

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
    setPreviewImages(prevImg => prevImg.filter(e => e!== img));
    URL.revokeObjectURL(img);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (let i = 0; i < images.length; i++) {
      formData.append("product_images", images[i]);
    }
      formData.append("product_id", editProductId);

    try {
      const response = await uploadImage(formData);
      if (response.isSuccess) {
        message.success(response.message);
        setActiveTabKey("1")
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      message.error(err.message);
    }
  };
  const savedImageDeleteHandler = async (img) => {
    setSavedImages((prev) => prev.filter((e) => e !== img));
    try {
      const response = await deleteSavedImages({
        productId: editProductId,
        imgToDelete: img,
      });
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
      <h1 className="text-2xl font-bold mb-5 text-blue-600">
        Upload Your Product's Image here.
      </h1>

      <div className="mt-2">
        {savedImages.length > 0 ? (
          <>
            <h1 className="text-base font-medium mb-2">Saved images from the cloud.</h1>
            <div className="flex gap-2 mb-6">   
              {savedImages.map((e) => (
                <div key={e} className="basis-1/6 h-32 relative">
                  <img
                    src={e}
                    alt={e}
                    className="w-full h-full object-cover rounded-md"
                  />
                  <XMarkIcon
                    width={20}
                    height={20}
                    className="absolute z-20 top-0 right-0 text-red-400 hover:text-red-600"
                    onClick={() => savedImageDeleteHandler(e)}
                  />
                </div>
              
              ))}
            </div>
          </>
        ) : (
          <p className="text-red-600 text-sm mb-5">no images are not saved.</p>
        )}
      </div>
      <form
        action="post"
        encType="multipart/form-data"
        onSubmit={submitHandler}
      >
        <label
          htmlFor="upload"
          className="p-2 rounded-md border-dashed border-2 border-blue-600font-medium my-3 text-blue-600 cursor-pointer"
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
