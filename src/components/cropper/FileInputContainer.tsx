import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const FileInputContainer = ({ children }: Props) => {
  return (
    <Box 
    borderRadius={10} 
    overflow="hidden"
    sx={{
      scale: "100%",
      transition: "transform 0.15s ease-in-out",
      "&:hover": {
        transform: "scale(1.01)",
      },
    }}
    >
      {children}
    </Box>
  );
};

export default FileInputContainer;