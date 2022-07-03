import "./App.scss";
import Login from "./components/UserManagement/Login";
import FlexSide from "./components/Helpers/FlexSide";
import Content from "./components/Content";
import NavBar from "./components/NavBar/NavBar";
import SearchBar from "./components/UI/SearchBar";
import AnimatedBackground from "./components/UI/AnimatedBackground";
import { useContext } from "react";
import MovieContext from "./store/movie-context";

function App() {
  const ctx = useContext(MovieContext);

  return (
    <>
      {!ctx.isLoggedIn ? (
        <AnimatedBackground>
          <Login />
        </AnimatedBackground>
      ) : (
        <FlexSide>
          <NavBar />
          <main>
            <SearchBar />
            <Content />
          </main>
        </FlexSide>
      )}
    </>
  );
}

export default App;
