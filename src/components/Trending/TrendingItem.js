import "./TrendingItem.scss";
import Bookmark from "./../UI/Bookmark";
import PlayButton from "../UI/PlayButton";

const TrendingItem = props => {
  const data = props.movieData;
  const image = data.thumbnail.trending.small;

  return (
    <div className="trending-item">
      <img src={image} alt={data.title + " Image"} className="trending-item__image" />
      <PlayButton />
      <Bookmark show={data.title} isBookmarked={data.isBookmarked} />
      <div className="trending-item__info-group">
        <span>
          {data.year} &nbsp;&#183;&nbsp; Icon {data.category} &nbsp;&#183;&nbsp; {data.rating}
        </span>
        <h3>{data.title}</h3>
      </div>
    </div>
  );
};

export default TrendingItem;
