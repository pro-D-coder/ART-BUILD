import * as React from "react";
import { SignUpForm } from "./sign_up";
import { LoginForm } from "./login";
import { Flex } from "@chakra-ui/react";

export default function AuthPage({ setToken }) {
  const [activeForm, setActiveForm] = React.useState(true);

  return (
    <Flex h="100%" w="100%" justifyContent="center">
      {activeForm ? (
        <LoginForm
          activeForm={activeForm}
          setActiveForm={setActiveForm}
          setToken={setToken}
        />
      ) : (
        <SignUpForm activeForm={activeForm} setActiveForm={setActiveForm} />
      )}
    </Flex>
  );
}
