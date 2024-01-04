import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import apiClient from "../../services/api.client";
import FileInputContainer from "../cropper/FileInputContainer";
import CropperPopUp from "../cropper/CropperPopUp";
import FileInputPreview from "../cropper/FileInputPreview";
import NewPostSuccess from "./NewPostSuccess";
import NewPostError from "./NewPostError";
import {
  Box,
  Button,
  Flex,
  FormControl,
  Input,
  Spacer,
  Textarea,
  VStack,
} from "@chakra-ui/react";

interface FormData {
  image: File;
  song: string;
  synth: string;
  genre: string;
  producer: string;
  description: string;
}

interface AxiosError {
  response: {
    data: string;
  };
}

function NewPost() {
  const { register, handleSubmit } = useForm<FormData>();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [whoops, setWhoops] = useState(false);
  const [patchId, setPatchId] = useState<string | undefined>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [croppedImageFile, setCroppedImageFile] = useState<File | null>(null);
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const formData = new FormData();
    formData.append("image", croppedImageFile!);
    formData.append("song", data.song);
    formData.append("synth", data.synth);
    formData.append("genre", data.genre);
    formData.append("producer", data.producer);
    formData.append("description", data.description);

    try {
      setIsUploading(true);
      const newPatch = await apiClient.post("api/patches", formData);
      setPatchId(newPatch.data._id);
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

  const handlePreview = (file: File) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const dataURL = reader.result as string;
        setPreviewImageUrl(dataURL);
      };
      reader.readAsDataURL(file);
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
  if (isSubmitted) return <NewPostSuccess patchId={patchId} />;

  return (
    <>
      <VStack width={500}>

        <Box >
          <FileInputContainer>
            {previewImageUrl && (
              <FileInputPreview
                imageUrl={previewImageUrl}
                onClick={() => setPreviewImageUrl("")}
              />
            )}
          </FileInputContainer>
        </Box>

        <FormControl onSubmit={handleSubmit(onSubmit)}>
          <VStack spacing={3}>
            <Input
              type="text"
              {...register("song")}
              placeholder="Song"
              _placeholder={{ color: "white", opacity: 0.7 }}
              variant={"filled"}
            />
            <Input
              type="text"
              {...register("synth")}
              placeholder="Synth"
              _placeholder={{ color: "white", opacity: 0.7 }}
              variant={"filled"}
            />
            <Input
              type="text"
              {...register("genre")}
              placeholder="Genre"
              _placeholder={{ color: "white", opacity: 0.7 }}
              variant={"filled"}
            />
            <Input
              type="text"
              {...register("producer")}
              placeholder="Producer"
              _placeholder={{ color: "white", opacity: 0.7 }}
              variant={"filled"}
            />
            <Textarea
              {...register("description")}
              placeholder="Description"
              _placeholder={{ color: "white", opacity: 0.7 }}
              variant={"filled"}
            />

            <Flex width={"100%"} >
              {!previewImageUrl && (
                <CropperPopUp
                  onCropComplete={(croppedFile: File) => {
                    setCroppedImageFile(croppedFile);
                    handlePreview(croppedFile);
                  }}
                />
              )}
              <Spacer/>
              <Button type="submit">Submit</Button>
            </Flex>

          </VStack>
        </FormControl>
      </VStack>
    </>
  );
}

export default NewPost;
