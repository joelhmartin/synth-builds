import { Box, Button, VStack } from "@chakra-ui/react";
import "cropperjs/dist/cropper.css";
import React, { useEffect, useRef, useState } from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import FileInput from "./FileInput";
import "./cropper.css";

interface Props {
  onCropComplete: (croppedFile: File) => void;
}

const ImageCropper = ({ onCropComplete }: Props) => {
  const [image, setImage] = useState();
  const [cropData, setCropData] = useState("");
  const cropperRef = useRef<ReactCropperElement>(null);

  const onChange = (e: any) => {
    e.preventDefault();

    let files;

    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as any);
    };

    reader.readAsDataURL(files[0]);
  };

  const getCropData = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (typeof cropperRef.current?.cropper !== "undefined") {
      setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
    }
  };

  useEffect(() => {
    if (cropData) {
      const byteString = atob(cropData.split(",")[1]);
      const mimeString = cropData.split(",")[0].split(":")[1].split(";")[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);

      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }

      const blob = new Blob([ab], { type: mimeString });
      const croppedFile = new File([blob], "cropped.png", {
        type: "image/png",
      });
      
      onCropComplete(croppedFile);
    }
  }, [cropData]);

  return (
    <VStack>
      <Box style={{ width: "100%" }}>
        {!image && <FileInput onChange={onChange} />}
        <Cropper
          height={200}
          width={400}
          aspectRatio={2 / 1}
          preview=".img-preview"
          src={image}
          ref={cropperRef}
          viewMode={1}
          guides={true}
          minCropBoxHeight={10}
          minCropBoxWidth={10}
          background={false}
          responsive={true}
          checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
        />
      </Box>

      {image && <Box className="img-preview" style={{ width: "100%", height: "300px" }} />}
      

      <Button
        colorScheme="blue"
        mr={3}
        onClick={(e) => {
          getCropData(e);
        }}
      >
        Looks Good!
      </Button>
    </VStack>
  );
};

export default ImageCropper;
