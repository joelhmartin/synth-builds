import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const SynthCardContainer = ({ children }: Props) => {
  return (
    <>
      <Box
        maxW={400}
        borderRadius={10}
        overflow="hidden"
        sx={{
          scale: "100%",
          transition: "transform 0.15s ease-in-out",
          "&:hover": {
            transform: "scale(1.03)",
          },
        }}
      >
        {children}
      </Box>
    </>
  );
};

export default SynthCardContainer;
