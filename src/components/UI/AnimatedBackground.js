import classes from "./AnimatedBackground.module.scss";

const AnimatedBackground = props => {
  return (
    <div className={classes.header}>
      <div className={`${classes.innerHeader} ${classes.flex}`}></div>
      {props.children}
      <div>
        <svg className={classes.waves} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
          <defs>
            <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
          </defs>
          <g className={classes.parallax}>
            <use xlinkHref="#gentle-wave" x="48" y="0" fill="#fc9797" />
            <use xlinkHref="#gentle-wave" x="48" y="3" fill="#ff7070" />
            <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgb(252, 71, 71)" />
            <use xlinkHref="#gentle-wave" x="48" y="7" fill="#f38787" />
          </g>
        </svg>
      </div>
    </div>
  );
};

export default AnimatedBackground;
