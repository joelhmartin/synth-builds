import { Button, Heading } from "@chakra-ui/react";
import { Link } from "wouter";


interface Props {
  patchId: String | undefined;
}

const NewPostSuccess = ({ patchId }: Props) => {
  return (
    <>
      <Heading>Successfully submitted!</Heading>
      <Link to={"/patches/" + patchId}>
        <Button colorScheme="blue">Check it out</Button>
      </Link>
        
    </>
  );
};

export default NewPostSuccess;
