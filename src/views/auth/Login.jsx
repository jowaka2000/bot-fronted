import React, { useEffect, useReducer } from "react";
import loading from "../../assets/loading.gif";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useStateContext } from "../../contexts/ContextProvider";
import axiosClient from "../../axiosClient";

const reducer = (state, action) => {
  if (action.type === "SET_IS_lOADING") {
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

  if (action.type === "SET_ERROR") {
    return {
      ...state,
      errorMessage: action.payLoad,
      isError: true,
      isLoading: false,
    };
  }

  if (action.type === "EMAIL_ON_CHANGE") {
    return { ...state, email: action.payLoad };
  }

  if (action.type === "HANDLE_PASSWORD_ON_CHANGE") {
    return { ...state, password: action.payLoad };
  }

  if (action.type === "SHOW_OR_HIDE_PASSWORD") {
    return { ...state, showPassword: !state.showPassword };
  }

  if (action.type === "SET_ERROR_OFF") {
    return { ...state, isError: false };
  }
  throw new Error("No action is Found!");
};

const defaultLoginValues = {
  email: "",
  password: "",
  isError: false,
  errorMessage: "",
  isLoading: false,
  showPassword: false,
};
const Login = () => {
  const [state, dispatch] = useReducer(reducer, defaultLoginValues);
  const {  setToken, setUser } = useStateContext();

  useEffect(() => {
    document.title = "Login";
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

    dispatch({ type: "SET_IS_lOADING", payLoad: true });

    if (state.email === "" || state.password === "") {
      dispatch({ type: "EMPTY_VALUES", payLoad: "All Fields are Required!" });
    } else {
      const payLoad = {
        email: state.email,
        password: state.password,
      };

      axiosClient
        .post("/login", payLoad)
        .then(({ data }) => {
          setUser(data.user);
          setToken(data.token);

          dispatch({ type: "SET_IS_lOADING", payLoad: false });
        })
        .catch((error) => {
          const { response } = error;

          if (response && response.status === 422) {
            dispatch({
              type: "SET_ERROR",
              payLoad: "Credentials You have provided are incorrect!",
            });
          } else if (response && response.status === 566) {
            dispatch({ type: "SET_ERROR", payLoad: response.data });
          } else {
            console.log(error);
          }

          dispatch({ type: "SET_IS_lOADING", payLoad: false });
        });
    }
  };

  return (
    <div className="relative flex justify-center pt-28">
      {state.isError && (
        <div className="absolute flex w-11/12 md:w-4/12 bg-red-500 py-1 rounded text-white text-sm justify-center">
          {state.errorMessage}
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className=" w-11/12 md:w-4/12 loginShadow border  p-6 space-y-5"
      >
        <div className="text-center text-xl font-bold text-Neutral-500">
          Media Bot Login
        </div>

        <div className="w-full space-y-2 mb-4 space-y-4">
          <div>
            <label className="font-semibold text-gray-800 text-sm">Email</label>
            <input
              className="w-full text-sm outline-none p-2 rounded  border border-gray-300 hover:border-gray-400"
              autoFocus
              type="email"
              onChange={(e) =>
                dispatch({ type: "EMAIL_ON_CHANGE", payLoad: e.target.value })
              }
              value={state.email}
              placeholder="eg. someone@example.com"
            />
          </div>

          <div>
            <label className="font-semibold text-gray-800 text-sm">
              Password
            </label>
            <input
              className="w-full text-sm outline-none p-2 rounded  border border-gray-300 hover:border-gray-400"
              type={state.showPassword ? "text" : "password"}
              value={state.password}
              onChange={(e) =>
                dispatch({
                  type: "HANDLE_PASSWORD_ON_CHANGE",
                  payLoad: e.target.value,
                })
              }
              placeholder="***********"
            />
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
              <span>Login</span>
            )}
          </motion.button>
        </div>
        <div className="flex justify-end text-xs md:text-sm px-1">
          <Link to="/register" className="hover:text-gray-800">
            Don't have an account?{" "}
            <span className="underline">Create Account</span>
          </Link>
        </div>

        <div className="flex justify-end text-xs md:text-sm px-1">
          <Link to="/reset-password" className="hover:text-gray-800">
            <span className="underline">Click here </span> to reset password
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
