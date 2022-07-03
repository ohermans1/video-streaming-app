import Card from "../UI/Card";
import InputField from "../UI/InputField";
import Button from "../UI/Button";
import "./Login.scss";
import logo from "./../../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../UI/Loading";
import { useState, useEffect, useReducer, useContext } from "react";
import FlexCenter from "../Helpers/FlexCenter";
import * as ToastFunctions from "./toast-functions.js";
import MovieContext from "../../store/movie-context";

const defaultLoginState = {
  email: { enteredValue: "", isValid: true, error: "" },
  password: { enteredValue: "", isValid: true, error: "" },
  repeatPassword: { enteredValue: "", isValid: true, error: "" },
  form: { isValid: false, error: "" },
};

const loginReducer = (state, action) => {
  let updatedState = { email: { ...state.email }, password: { ...state.password }, repeatPassword: { ...state.repeatPassword }, form: { ...state.form } };

  if (action.type === "CLEAR_FORM") {
    updatedState.email.enteredValue = "";
    updatedState.password.enteredValue = "";
    updatedState.repeatPassword.enteredValue = "";
  }
  action.type === "EMAIL_ENTERED" && (updatedState.email = { enteredValue: action.value, isValid: action.valid });
  action.type === "PASSWORD_ENTERED" && (updatedState.password = { enteredValue: action.value, isValid: action.valid });
  action.type === "PASSWORDREPEAT_ENTERED" && (updatedState.repeatPassword = { enteredValue: action.value, isValid: action.valid });
  action.type === "PASSWORDS_MATCH" && (updatedState.repeatPassword.isValid = true);
  if (action.type === "PASSWORDS_DONT_MATCH") {
    updatedState.repeatPassword.isValid = false;
    updatedState.repeatPassword.error = action.error;
  }
  action.type === "FORM_VALID" && (updatedState.form.isValid = true);
  action.type === "FORM_INVALID" && (updatedState.form.isValid = false);
  if (action.type === "INVALID_EMAIL_LENGTH") {
    updatedState.email.error = action.error;
    updatedState.email.isValid = false;
  }
  if (action.type === "INVALID_EMAIL_PATTERN") {
    updatedState.email.error = action.error;
    updatedState.email.isValid = false;
  }
  if (action.type === "EMAIL_VALID") {
    updatedState.email.isValid = true;
  }

  if (action.type === "INVALID_PASSWORD_LENGTH_ZERO") {
    updatedState.password.error = action.error;
    updatedState.password.isValid = false;
  }
  if (action.type === "INVALID_PASSWORD_LENGTH") {
    updatedState.password.error = action.error;
    updatedState.password.isValid = false;
  }
  action.type === "PASSWORD_VALID" && (updatedState.password.isValid = true);

  if (action.type === "INVALID_PASSWORD_REPEAT_LENGTH_ZERO") {
    updatedState.repeatPassword.error = action.error;
    updatedState.repeatPassword.isValid = false;
  }
  if (action.type === "INVALID_PASSWORD_REPEAT_LENGTH") {
    updatedState.repeatPassword.error = action.error;
    updatedState.repeatPassword.isValid = false;
  }
  if (action.type === "PASSWORD_REPEAT_VALID") {
    updatedState.repeatPassword.isValid = true;
  }
  return updatedState;
};

const Login = props => {
  const ctx = useContext(MovieContext);

  const [loginState, dispatchLoginAction] = useReducer(loginReducer, defaultLoginState);

  const [hasAccount, setHasAccount] = useState(true);
  const hasAccountHandler = () =>
    setHasAccount(prevState => {
      return !prevState;
    });

  useEffect(() => {
    fetchData();
  }, []);

  const [adjustedFetchedData, setAdjustedFetchedData] = useState([{}]);

  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState(null);

  const bcrypt = require("bcryptjs");

  const clearForm = () => {
    dispatchLoginAction({ type: "CLEAR_FORM" });
  };

  const changeHandler = e => {
    let { name, value } = e.target;
    name = name.toUpperCase();
    dispatchLoginAction({ type: `${name}_ENTERED`, value: value, valid: true });
  };

  useEffect(() => {
    if (loginState.password.enteredValue === loginState.repeatPassword.enteredValue) {
      dispatchLoginAction({ type: "PASSWORDS_MATCH" });
    } else {
      dispatchLoginAction({ type: "PASSWORDS_DONT_MATCH", error: "Passwords must match" });
    }
    return;
  }, [loginState.repeatPassword.enteredValue, loginState.password.enteredValue]);

  useEffect(() => {
    if (loginState.email.isValid && loginState.password.isValid && loginState.repeatPassword.isValid && loginState.email.enteredValue.length > 0) {
      dispatchLoginAction({ type: "FORM_VALID" });
    } else {
      dispatchLoginAction({ type: "FORM_INVALID" });
    }
  }, [
    loginState.email.isValid,
    loginState.password.isValid,
    loginState.repeatPassword.isValid,
    loginState.email.enteredValue,
    loginState.password.enteredValue,
    loginState.repeatPassword.enteredValue,
  ]);

  const emailValidHandler = () => {
    let enteredValue = loginState.email.enteredValue;
    if (enteredValue.length < 1) {
      dispatchLoginAction({ type: "INVALID_EMAIL_LENGTH", error: "Can't be empty" });
    } else if (!enteredValue.includes("@")) {
      dispatchLoginAction({ type: "INVALID_EMAIL_PATTERN", error: "Must be a valid email" });
    } else {
      dispatchLoginAction({ type: "EMAIL_VALID" });
    }
  };
  const passwordValidHandler = () => {
    if (loginState.password.enteredValue.length < 1) {
      dispatchLoginAction({ type: "INVALID_PASSWORD_LENGTH_ZERO", error: "Can't be empty" });
    } else if (loginState.password.enteredValue.length < 6) {
      dispatchLoginAction({ type: "INVALID_PASSWORD_LENGTH", error: "Must be at least 6 characters" });
    } else {
      dispatchLoginAction({ type: "PASSWORD_VALID" });
    }
  };

  const repeatPasswordHandler = () => {
    if (loginState.password.enteredValue.length < 1) {
      dispatchLoginAction({ type: "INVALID_PASSWORD_REPEAT_LENGTH_ZERO", error: "Can't be empty" });
    } else if (loginState.password.enteredValue.length < 6) {
      dispatchLoginAction({ type: "INVALID_PASSWORD_REPEAT_LENGTH", error: "Must be at least 6 characters" });
    } else {
      dispatchLoginAction({ type: "PASSWORD_REPEAT_VALID" });
    }
  };

  const signupHandler = async e => {
    setLoadingMessage("Working on it...");
    setIsLoading(true);
    e.preventDefault();
    console.log(loginState.form.isValid);
    if (!loginState.form.isValid) {
      emailValidHandler();
      passwordValidHandler();
      repeatPasswordHandler();
      setIsLoading(false);
      ToastFunctions.notifyWarning("Please check the information you have entered!");
      return;
    }
    await fetchData();
    let alreadyHaveEmail = false;
    adjustedFetchedData.forEach(data => {
      if (loginState.email.enteredValue === data.email) {
        alreadyHaveEmail = true;
      }
    });
    if (alreadyHaveEmail) {
      ToastFunctions.notifyWarning("This email address has already been used!");
      clearForm();
      return;
    }

    async function hashIt(password) {
      const salt = await bcrypt.genSalt(6);
      const hashed = await bcrypt.hash(password, salt);

      await postData({ email: loginState.email.enteredValue, password: hashed });
    }
    hashIt(loginState.password.enteredValue);
    setTimeout(() => {
      setHasAccount(true);
      clearForm();
    }, 1000);
    await setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    ToastFunctions.notifySuccess("Signup Successful!");
  };

  //Post Data
  const postData = async postData => {
    const response = await fetch("https://video-streaming-81356-default-rtdb.firebaseio.com/users.json", {
      method: "POST",
      body: JSON.stringify(postData),
      headers: { "Content-Type": "application/JSON" },
    });
    const data = await response.json();
  };

  const fetchData = async () => {
    const response = await fetch("https://video-streaming-81356-default-rtdb.firebaseio.com/users.json");
    const data = await response.json();
    const loadedData = [];
    for (const key in data) {
      loadedData.push({
        id: key,
        email: data[key].email,
        password: data[key].password,
      });
    }
    await setAdjustedFetchedData(loadedData);
  };

  // Login
  const loginHandler = async e => {
    setLoadingMessage("Get the popcorn ready...");
    setIsLoading(true);
    e.preventDefault();
    if (loginState.email.enteredValue.length === 0 || loginState.password.enteredValue.length === 0 || !loginState.email.isValid || !loginState.password.isValid) {
      setIsLoading(false);
      ToastFunctions.notifyWarning("Please enter your login details!");
      return;
    } else {
      await fetchData();
      let emailFound = false;
      adjustedFetchedData.forEach(data => {
        if (loginState.email.enteredValue === data.email) {
          emailFound = true;
          if (bcrypt.compareSync(loginState.password.enteredValue, data.password)) {
            ToastFunctions.notifySuccess("Login successful!");
            ctx.toggleLoginHandler(true);
          } else {
            ToastFunctions.notifyWarning("Your password is incorrect!");
          }
        }
      });
      if (!emailFound) ToastFunctions.notifyWarning("Details not found, please signup!");
    }
    await setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const loginFields = [
    {
      key: "email",
      name: "email",
      type: "email",
      placeholder: "Email address",
      onChange: changeHandler,
      isValid: loginState.email.isValid,
      onBlur: emailValidHandler,
      error: loginState.email.error,
    },
    {
      key: "password",
      name: "password",
      type: "password",
      placeholder: "Password",
      onChange: changeHandler,
      isValid: loginState.password.isValid,
      onBlur: passwordValidHandler,
      error: loginState.password.error,
    },
  ];
  const signUpFields = [
    ...loginFields,
    {
      key: "passwordRepeat",
      name: "passwordRepeat",
      type: "password",
      placeholder: "Repeat password",
      onChange: changeHandler,
      isValid: loginState.repeatPassword.isValid,
      onBlur: repeatPasswordHandler,
      error: loginState.repeatPassword.error,
    },
  ];

  const loginInputs = loginFields.map(field => <InputField {...field} />);
  const signUpInputs = signUpFields.map(field => <InputField {...field} />);

  const content = !isLoading ? (
    <>
      <h1 className="login__heading">{hasAccount ? "Login" : "Sign Up"}</h1>
      <form className="login__form">
        {hasAccount ? loginInputs : signUpInputs}
        <Button content={hasAccount ? "Login into your account" : "Create an account"} onClick={hasAccount ? loginHandler : signupHandler} />
      </form>
      <p className="login__no-account">
        {hasAccount ? "Don't have an account?" : "Already have an account?"}
        <button className="login__link" onClick={hasAccountHandler}>
          {hasAccount ? "Sign Up" : "Login"}
        </button>
      </p>
    </>
  ) : (
    <Loading message={loadingMessage} />
  );

  return (
    <FlexCenter>
      <img src={logo} alt="Logo" />
      <Card className="login" width={"50rem"} height={"43.4rem"}>
        {content}
        <ToastContainer style={{ color: "red" }} />
      </Card>
    </FlexCenter>
  );
};

export default Login;
