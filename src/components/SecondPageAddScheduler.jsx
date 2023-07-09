import React,{useRef} from 'react'

const SecondPageAddScheduler = ({ state, dispatch }) => {
    const imagesRef = useRef();

  const handleImagesInputOnChange = (e) => {
    const files = e.target.files;

    const selectedImages = Array.from(files);

    if(selectedImages.length>=10){
      dispatch({
        type: "ERROR_MESSAGE",
        payLoad: "You can only upload a maximum of 10 images at a time!",
      });
    }else{
      selectedImages.map((file) => {

        dispatch({type:'ADD_REAL_FILES',payLoad:file});

        let url = URL.createObjectURL(file);
  
        if (
          file.type === "image/jpeg" ||
          file.type === "image/jpg" ||
          file.type === "image/png"
        ) {
          
          if(state.images.length>=10){
            dispatch({
              type: "ERROR_MESSAGE",
              payLoad: "You have reached a maximum of 10 images to upload!",
            });
          }else{
            dispatch({ type: "ADD_IMAGE", payLoad: url });
          }
        } else {
          dispatch({
            type: "ERROR_MESSAGE",
            payLoad: "Please include valid image (jpeg,jpg,png)",
          });
        }
  
        return url;
      });
    }
  
  };

  const handleOnSubmitSecondPage = (e) => {
    e.preventDefault();
    if (
      state.messageContent.length === 0 &&
      state.url === "" &&
      state.images.length === 0
    ) {
      dispatch({
        type: "ERROR_MESSAGE",
        payLoad:
          "Please add at least an image, link, or message content in previous window!",
      });
    } else {
      dispatch({ type: "MOVE_THIRD_PAGE" });
    }
  };

  return (
    <div>
      <form className="space-y-4" encType="multipart/form-data">
        <div className="py-2">
          <label className="text-sm text-gray-700 font-semibold">
            <div className="flex items-center gap-1">
              <span>Upload Image(optional)</span>
              {state.images.length !== 0 && (
                <span className="text-xs text-orange-600">
                  <i>{`${state.images.length} files selected`}</i>
                </span>
              )}
            </div>
            <div className="w-full bg-slate-400 rounded-lg py-2 text-white hover:bg-slate-500">
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
        </div>

        {state.images.length > 0 && (
          <div className="grid grid-cols-2 gap-1">
            {state.images.map((image, index) => {
              return (
                <article key={index} className="relative">
                  <button
                    type="button"
                    onClick={() =>
                      dispatch({ type: "REMOVE_IMAGE", payLoad: image })
                    }
                    className="absolute text-red-500"
                  >
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
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </button>
                  <img src={image} alt={image} />
                </article>
              );
            })}
          </div>
        )}

        <div className="flex items-center justify-between pt-4 pb-2">
          <button
            onClick={() => dispatch({ type: "MOVE_FIRST_PAGE" })}
            type="button"
            className="flex items-center text-gray-700 hover:underline hover:text-gray-900"
          >
            <span>
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
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </span>
            <span className="pt-[3px]">PREVIOUS</span>
          </button>
          <button
            onClick={handleOnSubmitSecondPage}
            className="flex items-center text-green-600 hover:text-green-700 hover:underline"
          >
            <span className="pt-[3px]">NEXT</span>
            <span>
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
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default SecondPageAddScheduler;