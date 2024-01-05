import { useState } from "react";
import useAuthStore from "../authStore";
import LoginForm from "../components/login/LoginForm";
import { Box, Button, Fade, Spacer, VStack } from "@chakra-ui/react";
import CreateUserForm from "../components/login/CreateUserForm";
import { Link } from "wouter";

const LoginPage = () => {
  const { user, token, logout } = useAuthStore();
  const [formType, setFormType] = useState<string | null>(null);

  if (token)
    return (
      <Fade in={true}>
        <VStack>
          <Box>Logged in as {user}</Box>
          <Button onClick={logout}>Logout ?</Button>
          <Button>
            <Link to="/account">Go to account ?</Link>
          </Button>
        </VStack>
      </Fade>
    );

  return (
    <>
      <VStack height={'70vh'}>
        <Spacer/>
        {formType == "create" ? (
            <CreateUserForm setFormType={setFormType} />
        ) : (
            <LoginForm setFormType={setFormType} />
        )}
        <Spacer/>
      </VStack>
    </>
  );
};

export default LoginPage;
