import { Button, Fade, Image, VStack } from "@chakra-ui/react";
import { FaRegTrashCan } from "react-icons/fa6";

interface Props {
  imageUrl?: string;
  onClick: () => void;
}

const FileInputPreview = ({ imageUrl, onClick }: Props) => {
  return (
    <Fade in>
      <VStack position={"relative"}>
        <Image src={imageUrl} alt="Preview" width={600} _hover={{blur: 100}}/>
        <Button onClick={onClick} position={"absolute"} top="50%" left="50%" transform="translate(-50%, -50%)" boxShadow='dark-lg' p='6' rounded='lg' bg='black'>
          <FaRegTrashCan />
        </Button>
      </VStack>
    </Fade>
  );
};

export default FileInputPreview;
