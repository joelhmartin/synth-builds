import NavBar from "../components/NavBar";
import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <Box padding={6}>
      <NavBar />
      <Box>{children}</Box>
    </Box>
  );
};

export default Layout;
