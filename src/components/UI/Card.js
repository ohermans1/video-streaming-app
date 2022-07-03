import "./Card.scss";

const Card = props => {
  const cardClass = `card ${props.className}`;

  return <div className={cardClass}>{props.children}</div>;
};

export default Card;
