import { useState, useEffect } from "react";
import { getAllArt } from "../APIcalls/InitialDataCall";
import Loading from "./presentational/Loading";
import { Flex } from "@chakra-ui/react";
import GalleryContainer from "./GalleryContainer";
import Form from "./Form";
import Error from "./presentational/Error";
import Select from "./Select";
import InitialDataContext from "../contexts/InitialDataContext";
import AuthPage from "./authentication/auth_page";

const Main = ({ token, setToken }) => {
  const [initialData, setInitialData] = useState(Array);
  const [isLoading, setIsLoading] = useState(Boolean);
  const [isError, setIsError] = useState(false);
  const [selectValue, setSelectValue] = useState(String);
  const [searchTerm, setSearchTerm] = useState(String);

  useEffect(() => {
    const initialValues = localStorage.getItem("initialData");
    if (initialValues) {
      setInitialData(JSON.parse(initialValues));
    } else {
      setIsLoading(true);
      let query = "french";
      getAllArt(query)
        .then((data) => {
          setInitialData(data);
          setIsLoading(false);
          localStorage.setItem("initialData", JSON.stringify(data));
        })
        .catch((error) => {
          setIsError(true);
          console.log(error);
        });
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    getAllArt(searchTerm)
      .then((data) => {
        setInitialData(data);
        setIsLoading(false);
        setIsError(false);
        localStorage.setItem("initialData", JSON.stringify(data));
      })
      .catch((error) => {
        setIsError(true);
        setIsLoading(false);
        console.log(error);
      });
  };

  return (
    <Flex w="100%" h="100%" justifyContent="center" flexDirection="column">
      {/* <Nav /> */}
      {!token ? (
        <AuthPage setToken={setToken} />
      ) : (
        <main className="gallery-main">
          <Select
            selectValue={selectValue}
            setInitialData={setInitialData}
            setIsLoading={setIsLoading}
            getAllArt={getAllArt}
            setSelectValue={setSelectValue}
            setIsError={setIsError}
          />
          <Form
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleSubmit={handleSubmit}
          />
          {isLoading ? (
            <Loading />
          ) : isError ? (
            <Error />
          ) : (
            <InitialDataContext.Provider value={{ initialData }}>
              <GalleryContainer />
            </InitialDataContext.Provider>
          )}
        </main>
      )}
    </Flex>
  );
};

export default Main;
