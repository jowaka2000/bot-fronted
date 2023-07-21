import React, { useState, useRef, useReducer, useEffect } from "react";
import { motion } from "framer-motion";
import axiosClient from "../../axiosClient";
import loading from "../../assets/loading.gif";
import myData from '../../data/AppData';


const reducer = (state, action) => {
  if (action.type === "ADD_VALIDATED_IMAGE") {
    const newValidatedImages = [...state.validateImages, action.payLoad];

    return { ...state, validateImages: newValidatedImages };
  }
  if (action.type === "SET_IMAGES_TO_NULL") {
    return { ...state, validateImages: [] };
  }
  throw new Error("Not found!");
};

const defaultEditImageValues = {
  validateImages: [],
};

const EditImages = ({ scheduler, editDispatch }) => {
  const [images, setImages] = useState(scheduler.images);
  const [newScheduler, setNewScheduler] = useState(scheduler);
  const [isAddImageInput, setIsAddImageInput] = useState(false);
  const imagesRef = useRef();
  const [state, dispatch] = useReducer(reducer, defaultEditImageValues);
  const [uploadValue, setUploadValue] = useState(0);
  const [isImageUploadLoading, setIsImageUploadLoading] = useState(false);
  const [isLoadingBar, setIsLoadingBar] = useState(false);
  const [isDeleteButtonLoading, setIsDeleteButtonLoading] = useState(false);


  const handleImageDeleteClick = (id) => {
    const newImages = images.filter((image) => image !== images[id]);

    setIsDeleteButtonLoading(true);
    const payLoad = {
      images: newImages,
      imageDeleted: images[id],
    };

    axiosClient
      .post(`/schedule-post/${newScheduler.id}/delete-image`, payLoad)
      .then(({ data }) => {
        setNewScheduler(data.schedule);
        setImages(data.schedule.images);
        setIsDeleteButtonLoading(false);
        editDispatch({
          type: "SET_IS_SUCCESS_MESSAGE",
          payLoad: {
            isSuccessMessage: true,
            successMessage: "Image deleted successfully!",
            isAddMessageButtonLoading: false,
          },
        });
      })
      .catch((error) => {
        editDispatch({
          type: "SET_ERROR_ON",
          payLoad: "An error has occurred!",
        });
        setIsDeleteButtonLoading(false);
      });
  };

  const handleImagesInputOnChange = (e) => {
    e.preventDefault();

    setIsImageUploadLoading(true);
    setIsLoadingBar(true);

    const newImages = Array.from(e.target.files);

    if (newImages.length > 10) {
      editDispatch({
        type: "SET_ERROR_ON",
        payLoad: "Upload minimum of 10 images",
      });
    } else {
      let formData = new FormData();

      newImages.map((image, index) => {
        if (
          image.type === "image/jpeg" ||
          image.type === "image/jpg" ||
          image.type === "image/png"
        ) {
          dispatch({ type: "ADD_VALIDATED_IMAGE", payLoad: image });

          formData.append(`images[${index}]`, image);
        } else {
          editDispatch({
            type: "SET_ERROR_ON",
            payLoad: "Please upload jpg,jpeg,png file types",
          });
        }

        return image;
      });

      axiosClient
        .post(`/schedule-post/update/${scheduler.id}`, formData)
        .then(({ data }) => {
          setImages(data.schedule.images);
          setNewScheduler(data.schedule);
          setUploadValue(100);
          dispatch({ type: "SET_IMAGES_TO_NULL" });
          setIsImageUploadLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsImageUploadLoading(false);
        });
    }
  };

  useEffect(() => {
    const intervals = setInterval(() => {
      if (isLoadingBar) {
        setUploadValue(0);
        setIsLoadingBar(false);
      }
    }, 3000);

    return () => clearInterval(intervals);
  });

  useEffect(() => {
    const intervals = setInterval(() => {
      if (uploadValue < 100 && isImageUploadLoading) {
        setUploadValue(uploadValue + 10);
      }
    }, 2000);

    return () => clearInterval(intervals);
  }, [uploadValue, isImageUploadLoading]);

  return (
    <div className="pt-4 ">
      <div className="flex justify-between items-center pb-1 border-b">
        <div className="text-lg font-semibold">Images ({images && images.length})</div>
        <motion.button
          whileHover={{ scale: 1.2 }}
          title="add image"
          onClick={() => setIsAddImageInput(!isAddImageInput)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </motion.button>
      </div>

      {isAddImageInput && (
        <form className="pb-8 pt-4 space-y-2" encType="multipart/form-data">
          <label className="text-sm text-gray-700 font-semibold">
            <div className="flex items-center gap-1">
              <span>Add Images</span>
              {state.validateImages.length !== 0 && (
                <span className="text-xs text-orange-600">
                  <i>{`${state.validateImages.length} files selected`}</i>
                </span>
              )}
            </div>
            <div className="w-full bg-slate-400 rounded-lg py-1 text-white hover:bg-slate-500">
              <div className="flex w-full justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                  />
                </svg>
              </div>

              <div className="flex w-full justify-center">Upload Image(s)</div>
              <input
                multiple
                ref={imagesRef}
                type="file"
                name="images[]"
                className="hidden"
                accept="image/jpeg,image/jpg,image/png"
                onChange={handleImagesInputOnChange}
              />
            </div>
          </label>

          {isLoadingBar && (
            <div className="w-full bg-gray-200 rounded-full dark:bg-gray-600">
              <div
                className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
                style={{ width: `${uploadValue}%` }}
              >
                {`${uploadValue}%`}
              </div>
            </div>
          )}
        </form>
      )}

      <article className="grid grid-cols-1 md:grid-cols-2 px-3 gap-0 md:gap-3 space-y-3 md:space-y-1 mt-4">
        {images && images.map((image, index) => {
          return (
            <div key={index} className="w-full space-y-3">
              <div className="flex w-full justify-center">
                <img
                  src={`${myData.baseImageUrl}/${image}`}
                  alt="images"
                />
              </div>
              <div className="w-full flex justify-center">
                <button
                  onClick={() => handleImageDeleteClick(index)}
                  disabled={isDeleteButtonLoading}
                  className="disabled:cursor-not-allowed flex justify-center bg-red-500 hover:bg-red-600 basis-3/4 text-sm rounded text-white"
                >
                  {isDeleteButtonLoading ? (
                    <img src={loading} alt="loading" className="w-6 h-6" />
                  ) : (
                    <span>Delete</span>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </article>
    </div>
  );
};

export default EditImages;
