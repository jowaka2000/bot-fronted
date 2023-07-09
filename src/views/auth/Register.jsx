import React, { useEffect, useReducer } from "react";
import loading from "../../assets/loading.gif";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import axiosClient from "../../axiosClient";

const reducer = (state, action) => {
  if (action.type === "NAME_ON_CHANGE") {
    return { ...state, name: action.payLoad,isNameError:false };
  }

  if (action.type === "EMAIL_ON_CHANGE") {
    return { ...state, email: action.payLoad,isEmailError:false };
  }

  if (action.type === "PASSWORD_ON_CHANGE") {
    return { ...state, password: action.payLoad,isPasswordError:false };
  }

  if (action.type === "SHOW_OR_HIDE_PASSWORD") {
    return { ...state, showPassword: !state.showPassword };
  }

  if (action.type === "SET_IS_LOADING") {
    return { ...state, isLoading: action.payLoad };
  }

  if (action.type === "EMPTY_VALUES") {
    return {
      ...state,
      errorMessage: action.payLoad,
      isError: true,
      isLoading: false,
    };
  }

  if (action.type === "SET_ERROR_OFF") {
    return { ...state, isError: false };
  }

  if(action.type==='SET_NAME_ERROR'){
    
    return {...state,isNameError:true,nameError:action.payLoad};
  }

  if(action.type==='SET_EMAIL_ERROR'){
    
    return {...state,isEmailError:true,emailError:action.payLoad};
  }
  if(action.type==='SET_PASSWORD_ERROR'){
    
    return {...state,isPasswordError:true,passwordError:action.payLoad};
  }
  throw new Error("No action Found!");
};

const defaultRegisterValues = {
  name: "",
  email: "",
  password: "",
  showPassword: false,
  isLoading: false,
  isError: false,
  isNameError: false,
  isEmailError: false,
  isPasswordError: false,
  errorMessage: "",
  nameError: "",
  emailError: "",
  passwordError: "",
};

const Register = () => {
  const [state, dispatch] = useReducer(reducer, defaultRegisterValues);
  const {  setToken, setUser } = useStateContext();

  useEffect(() => {
    document.title = "Sign Up";
  }, []);

  useEffect(() => {
    const intervals = setInterval(() => {
      if (state.isError) {
        dispatch({ type: "SET_ERROR_OFF" });
      }
    }, 6000);

    return () => clearInterval(intervals);
  });



  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch({ type: "SET_IS_LOADING", payLoad: true });

    if (state.name === "" || state.email === "" || state.password === "") {
      dispatch({ type: "EMPTY_VALUES", payLoad: "All Fields are Required!" });
    } else {
      const payLoad = {
        name: state.name,
        email: state.email,
        password: state.password,
      };

      axiosClient
        .post("/register", payLoad)
        .then(({ data }) => {

          setUser(data.user);
          setToken(data.token);
          dispatch({ type: "SET_IS_LOADING", payLoad: false });
        })
        .catch((error) => {
          const { response } = error;

          if (response && response.status === 422) {
            if (response.data.errors["name"]) {
              dispatch({type:'SET_NAME_ERROR',payLoad:response.data.errors["name"][0]});
            }

            if (response.data.errors["email"]) {
              dispatch({type:'SET_EMAIL_ERROR',payLoad:response.data.errors["email"][0]});
            }

            if (response.data.errors["password"]) {
              dispatch({type:'SET_PASSWORD_ERROR',payLoad:response.data.errors["password"][0]});
            }

          dispatch({ type: "SET_IS_LOADING", payLoad: false });
            
          } else {
            console.log(error);
          }
          dispatch({ type: "SET_IS_LOADING", payLoad: false });
          
        });
    }
  };

  return (
    <div className="relative flex justify-center pt-20">
      {state.isError && (
        <div className="absolute flex w-11/12 md:w-4/12 bg-red-500 py-1 rounded text-white text-sm justify-center">
          {state.errorMessage}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="w-11/12 md:w-4/12 loginShadow border px-6 pb-2 pt-4 space-y-5 bg-white"
      >
        <div className="text-center text-lg md:text-xl font-bold text-Neutral-500">
          Register On Media Bot
        </div>

        <div className="w-full space-y-2 mb-4 space-y-4">
          <div className="relative">
            <label className="font-semibold text-gray-800 text-sm">Name</label>
            <br />
            <input
              className="w-full text-sm outline-none p-2 rounded shadow-top border border-slate-300 hover:border-gray-400"
              type="text"
              value={state.name}
              onChange={(e) =>
                dispatch({ type: "NAME_ON_CHANGE", payLoad: e.target.value })
              }
              placeholder="eg. John Doe"
            />
            {state.isNameError && (
              <div className="absolute text-xs text-red-500">
                {state.nameError}
              </div>
            )}
          </div>

          <div className="relative">
            <label className="font-semibold text-gray-800 text-sm">Email</label>
            <input
              className="w-full text-sm outline-none p-2 rounded shadow-top border  border-slate-300 hover:border-gray-400"
              type="email"
              value={state.email}
              onChange={(e) =>
                dispatch({ type: "EMAIL_ON_CHANGE", payLoad: e.target.value })
              }
              placeholder="eg. someone@example.com"
            />
            {state.isEmailError && (
              <div className="absolute text-xs text-red-500">
                {state.emailError}
              </div>
            )}
          </div>

          <div className="relative">
            <label className="font-semibold text-gray-800 text-sm">
              Password
            </label>
            <input
              className="w-full text-sm outline-none p-2 rounded shadow-top border border-slate-300 hover:border-gray-400"
              type={state.showPassword ? `text` : "password"}
              value={state.password}
              onChange={(e) =>
                dispatch({
                  type: "PASSWORD_ON_CHANGE",
                  payLoad: e.target.value,
                })
              }
              placeholder="***********"
            />
            {state.isPasswordError && (
              <div className="absolute text-xs text-red-500">
                {state.passwordError}
              </div>
            )}
          </div>

          <div className="">
            <label className="gap-1 flex items-center">
              <input
                type="checkbox"
                onChange={() => dispatch({ type: "SHOW_OR_HIDE_PASSWORD" })}
              />
              <span className="text-sm">Show Password</span>
            </label>
          </div>
        </div>

        <div className="py-5">
          <motion.button
            whileHover={{ scale: 1.07 }}
            type="submit"
            disabled={state.isLoading}
            className="disables:cursor-not-allowed disabled:bg-opacity-75 flex justify-center bg-green-600 rounded-lg text-white font-bold hover:bg-green-500 text-center w-full py-2"
          >
            {state.isLoading ? (
              <span>
                <img src={loading} alt="Loading" className="w-5 h-5" />
              </span>
            ) : (
              <span>Create Account</span>
            )}
          </motion.button>
        </div>

        <div className="flex justify-end text-xs md:text-sm px-1">
          <Link to="/login" className="hover:text-gray-800">
            Already have an account? <span className="underline">Login</span>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
