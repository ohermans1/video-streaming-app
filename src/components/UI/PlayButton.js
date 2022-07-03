import "./PlayButton.scss";
import icon from "./../../assets/icon-play.svg";

const PlayButton = () => {
  return (
    <div className="play__background">
      <button className="play">
        <img src={icon} alt="Play Icon" className="play__image" />
        <h4 className="play__text">Play</h4>
      </button>
    </div>
  );
};

export default PlayButton;
