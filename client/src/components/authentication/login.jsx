import React from "react";
import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";

export function LoginForm({ activeForm, setActiveForm, setToken }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const toast = useToast();

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
    const data = {
      email: email,
      pass: password,
    };
    console.log(data);
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        if (data.status) {
          setToken(data.token);
        } else if (data.status === null) {
          toast({
            title: "User not valid",
            description: "Typed crdentials does not exist",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        } else {
          toast({
            title: "password wrong",
            description: "please check your password",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(email, password);
  };

  return (
    <form onSubmit={handleSubmit} style={{ height: "100%" }}>
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
            <Heading>Login</Heading>
          </Box>

          <Box my={4} textAlign="left">
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input
                type="email"
                value={email}
                placeholder="test@test.com"
                onChange={emailInputHandler}
              />
            </FormControl>
            <FormControl mt={6}>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                placeholder="*******"
                onChange={passwordInputHandler}
              />
            </FormControl>
            <Button width="full" mt={4} type="submit" colorScheme="telegram">
              Login
            </Button>
            <Button
              width="100%"
              onClick={(e) => setActiveForm(!activeForm)}
              mt="1rem"
              colorScheme="whatsapp"
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      </Flex>
    </form>
  );
}
