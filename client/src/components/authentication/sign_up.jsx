import React from "react";
import { useState } from "react";
import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";

export function SignUpForm({ activeForm, setActiveForm }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toast = useToast();

  const nameInputHandler = (e) => {
    setName(e.target.value);
    console.log(name);
  };

  const emailInputHandler = (e) => {
    setEmail(e.target.value);
    console.log(email);
  };

  const passwordInputHandler = (e) => {
    setPassword(e.target.value);
    console.log(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, email, password);
    const data = {
      name: name,
      email: email,
      pass: password,
    };
    fetch("http://localhost:8080/signUp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        res.status
          ? setActiveForm(!activeForm)
          : toast({
              title: "Error occured",
              description: "Something went wrong",
              status: "error",
              duration: 3000,
              isClosable: true,
            });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Flex width="full" align="center" justifyContent="center">
        <Box
          display="flex"
          flexDirection="column"
          p={8}
          maxWidth="500px"
          brder="2px solid black"
          borderWidth={1}
          borderRadius={8}
          boxShadow="lg"
        >
          <Box textAlign="center">
            <Heading>SignUp</Heading>
          </Box>

          <Box my={4} textAlign="left">
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                value={name}
                placeholder="xyz"
                onChange={nameInputHandler}
                required
              />
            </FormControl>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input
                type="email"
                value={email}
                placeholder="test@test.com"
                onChange={emailInputHandler}
                required
              />
            </FormControl>
            <FormControl mt={6}>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                placeholder="*******"
                onChange={passwordInputHandler}
                required
              />
            </FormControl>
            <Button width="full" mt={4} type="submit" colorScheme="telegram">
              Sign Up
            </Button>
            <Button
              width="100%"
              onClick={(e) => setActiveForm(!activeForm)}
              mt="1rem"
              colorScheme="whatsapp"
            >
              Login
            </Button>
          </Box>
        </Box>
      </Flex>
    </form>
  );
}
