import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useState } from "react";
import { Flex } from "@chakra-ui/react";
import Main from "./components/Main";
// import Footer from "./components/presentational/Footer";
import ArtPieceDetails from "./components/ArtPieceDetails";
import Nav from "./components/presentational/Nav";
import "./styles/css/style.css";
import MyFavorites from "./components/MyFavorites";
import About from "./components/presentational/About";
const App = () => {
  const [token, setToken] = useState("");

  return (
    <Flex w="100%" h="100%" flexDirection="column" justifyContent="center">
      <Router>
        <Switch>
          <>
            <Flex pt="3rem">
              <Nav token={token} />
            </Flex>
            <Route exact path="/">
              <Main token={token} setToken={setToken} />
            </Route>
            <Route exact path="/art/:id">
              <ArtPieceDetails />
            </Route>
            <Route exact path="/myfavorites">
              <MyFavorites />
            </Route>
            <Route exact path="/about">
              <About />
            </Route>
            {/* <Footer /> */}
          </>
        </Switch>
      </Router>
    </Flex>
  );
};

export default App;
