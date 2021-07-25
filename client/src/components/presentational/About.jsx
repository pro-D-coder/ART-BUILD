import React from "react";
import { Flex, Box, Image } from "@chakra-ui/react";
import D from '../../About/D.jpeg';
const About = () => {
  const aboutData = [
    {name: "Anamika",info: "Designation: Front-End developer", img: null},
    {name: "Aryaman",info: "Designation: Front-End developer", img: null},
    {name: "Ajay",info: "Designation: Back-End developer", img: null}
    ,{name: "Daksh",info: "Designation: Back-End developer", img: D}
  ]
  return (
    <>
      <main className="about-main" style={{ alignItems: "start" }}>
        <header>
          <h3 style = {{"font-family": "Times New Roman"}}>About</h3>
        </header>

        <Flex w="100%" justifyContent="space-evenly">
          {aboutData.map((ele) => 
          <Flex flexDirection="column" textAlign="center">
            <Box fontFamily = "Times New Roman" fontWeight = "semibold" fontSize = "4xl">
              {ele.name}
            </Box>
            <Box
              w="60"
              h="60"
              border="1px solid black"
              borderRadius="full"
              overflow = "hidden"
              // bg="yellow"
            >
              <Image src = {ele.img} alt = {ele.name}/>
            </Box>
            <b>
              <h4 style = {{"font-family": "sans-serif", "font-size":"1rem"}}>{ele.info}</h4>
            </b>
          </Flex>)}
        </Flex>
        {/* <article>
          <header></header>
          <p>This is a project created with ReactJS.</p>
          <p>
            Explore and bookmark your favorite art pieces, i hope you will enjoy
            the view!
          </p> */}
        {/* </article> */}
      </main>
    </>
  );
};

export default About;
