import {
  Button,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import { IoEyeOff, IoEye } from "react-icons/io5";
import { MdPassword } from "react-icons/md";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { CgNametag } from "react-icons/cg";
import { MdOutlineEmail } from "react-icons/md";
import NewPostError from "../newPost/NewPostError";
import apiClient from "../../services/api.client";
import { useLocation } from "wouter";
import useAuthStore from "../../authStore";

interface FormData {
  name: string;
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

const CreateUserForm = (formType: Props) => {
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
        name: data.name,
        email: data.email,
        password: data.password,
      };
      const user = await apiClient.post("api/users", userData);
      login(user.data.token, user.data.name, user.data.id);
      setIsUploading(false);
      setIsSubmitted(true);
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
        <VStack>
          <InputGroup>
            <InputLeftElement children={<CgNametag />} />
            <Input
              type={"text"}
              {...register("name")}
              borderRadius={20}
              placeholder="Name"
              _placeholder={{ color: "white", opacity: 0.5 }}
              variant="filled"
            />
          </InputGroup>
          <InputGroup>
            <InputLeftElement children={<MdOutlineEmail />} />
            <Input
              type={"text"}
              {...register("email")}
              borderRadius={20}
              placeholder="Email"
              _placeholder={{ color: "white", opacity: 0.5 }}
              variant="filled"
            />
          </InputGroup>
          <InputGroup>
            <InputLeftElement children={<MdPassword />} />
            <Input
              type={show ? "text" : "password"}
              {...register("password")}
              borderRadius={20}
              placeholder="Password"
              _placeholder={{ color: "white", opacity: 0.5 }}
              variant="filled"
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
                {show ? <IoEyeOff /> : <IoEye />}
              </Button>
            </InputRightElement>
          </InputGroup>
          <HStack>
            <Button
              variant="outline"
              onClick={() => formType.setFormType("login")}
            >
              Already have an account?
            </Button>
            <Button type="submit">Submit</Button>
          </HStack>
        </VStack>
      </form>
    </>
  );
};

export default CreateUserForm;
