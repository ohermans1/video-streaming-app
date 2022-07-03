import "./Loading.scss";
import logo from "./../../assets/logo.svg";

const Loading = props => {
  return (
    <div className="loading__container">
      <img src={logo} alt="Loading Image" className="loading" />
      <h4 className="loading__text">{props.message || "Loading..."}</h4>
    </div>
  );
};

export default Loading;
