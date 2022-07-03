import "./ShowItem.scss";
import Bookmark from "./../UI/Bookmark";
import PlayButton from "../UI/PlayButton";

const ShowItem = props => {
  const data = props.showData;
  const image = data.thumbnail.regular.small;

  return (
    <div className="show-item">
      <div className="show-item__image-container">
        <img src={image} alt={data.title + " Image"} className="show-item__image" />
        <PlayButton />
      </div>
      <Bookmark show={data.title} isBookmarked={data.isBookmarked} />
      <div className="show-item__info-group">
        <span>
          {data.year} &nbsp;&#183;&nbsp; Icon {data.category} &nbsp;&#183;&nbsp; {data.rating}
        </span>
        <h4>{data.title}</h4>
      </div>
    </div>
  );
};

export default ShowItem;
