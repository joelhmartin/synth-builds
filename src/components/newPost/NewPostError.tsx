import { Button, Text, VStack } from "@chakra-ui/react";

interface Props {
  errorMessage: string | null;
  onClick: () => void;
}

const NewPostError = ({ errorMessage, onClick }: Props) => {
  return (
    <VStack >
      <Text className="text-lg font-bold">Something went wrong</Text>
      {errorMessage && <Text className="text-red-500">{errorMessage}</Text>}
      <Button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        onClick={onClick}
      >
        Try Again
      </Button>
    </VStack>
  );
};

export default NewPostError;

