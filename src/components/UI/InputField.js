import "./InputField.scss";
const InputField = props => {
  return (
    <div className="input__container">
      <input
        type={props.type}
        placeholder={props.placeholder}
        name={props.name}
        className={`input ${!props.isValid && "input__invalid"}`}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
      {!props.isValid && <span className="input__warning">{props.error || "Can't be empty"}</span>}
    </div>
  );
};

export default InputField;
