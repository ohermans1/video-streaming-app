import "./Button.scss";

const Button = props => {
  return (
    <button className="button" onClick={props.onClick}>
      <p className="button__text">{props.content}</p>
    </button>
  );
};

export default Button;
