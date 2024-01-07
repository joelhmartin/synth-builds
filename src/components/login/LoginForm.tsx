import {
  Button,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Spacer,
  VStack,
} from "@chakra-ui/react";
import { useLocation } from "wouter";
import { IoEyeOff, IoEye } from "react-icons/io5";
import { MdPassword } from "react-icons/md";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { MdOutlineEmail } from "react-icons/md";
import NewPostError from "../newPost/NewPostError";
import apiClient from "../../services/api.client";
import useAuthStore from "../../authStore";

interface FormData {
  email: string;
  password: string;
}

interface AxiosError {
  response: {
    data: string;
  };
}

interface Props {
  setFormType: (setFormType: string | null) => void;
}

const LoginForm = (formType: Props) => {
  const { register, handleSubmit } = useForm<FormData>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [whoops, setWhoops] = useState(false);
  const login = useAuthStore((s) => s.login);
  const [show, setShow] = useState(false);
  const [_location, setLocation] = useLocation();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      setIsUploading(true);
      const userData = {
        email: data.email,
        password: data.password,
      };
      const user = await apiClient.post("api/users/login", userData);
      login(user.data.token, user.data.name, user.data.id);
      setIsUploading(false);
      setIsSubmitted(true);
    } catch (error) {
      console.error(error);
      setIsUploading(false);
      setWhoops(true);
      if ((error as AxiosError).response) {
        setErrorMessage((error as AxiosError).response.data);
      } else {
        setErrorMessage("An unexpected error occurred");
      }
    }
  };

  if (whoops)
    return (
      <NewPostError
        errorMessage={errorMessage}
        onClick={() => {
          setWhoops(false);
          setErrorMessage(null);
        }}
      />
    );

  if (isUploading) return <div>Loading...</div>;
  if (isSubmitted) {
    setLocation("/account");
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack >
          <VStack spacing={4} width={'300px'}>
            <InputGroup>
              <InputLeftElement children={<MdOutlineEmail />} />
              <Input
                type={"text"}
                {...register("email")}
                borderRadius={20}
                placeholder="Email"
                variant="filled"
                _placeholder={{color: 'white', opacity: .5}}
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement children={<MdPassword />} />
              <Input
                type={show ? "text" : "password"}
                {...register("password")}
                borderRadius={20}
                placeholder="Password"
                variant="filled"
                _placeholder={{color: 'white', opacity: .5}}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
                  {show ? <IoEyeOff /> : <IoEye />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </VStack>

          <Spacer />

          <HStack>
            <Button
              variant="outline"
              onClick={() => formType.setFormType("create")}
            >
              Create Account?
            </Button>
            <Button type="submit">Login</Button>
          </HStack>
        </VStack>
      </form>
    </>
  );
};

export default LoginForm;
