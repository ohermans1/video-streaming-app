import "./Content.scss";
import ShowList from "./Shared/ShowList";
import Trending from "./Trending/Trending";

const Home = () => {
  return (
    <>
      <Trending />
      <ShowList />
    </>
  );
};

export default Home;
