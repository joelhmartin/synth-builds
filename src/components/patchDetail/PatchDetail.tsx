import {
  Text,
  Image,
  Box,
  Button,
  Collapse,
  Flex,
  Grid,
  GridItem,
  HStack,
  Heading,
} from "@chakra-ui/react";
import Patch from "../../entities/patch";
import { useState } from "react";

interface Props {
  patch?: Patch;
}

const PatchDetail = ({ patch }: Props) => {
  const [show, setShow] = useState(false);
  const handleToggle = () => setShow(!show);

  
  return (
    <>
      <Grid
        templateAreas={{
          base: `"left" "right"`,
          lg: `"left right"`,
        }}
        templateColumns={{
          base: "1fr",
          lg: "2.5fr 1fr",
        }}
      >
        <GridItem area="left">
          <Flex
            flexDirection={"column"}
            align={"stretch"}
            justifyContent={"space-between"}
            height="100%"
          >
            <Heading>{patch?.song}</Heading>
            <HStack marginY={5} spacing={10}>
              <Box width="400px" boxShadow="base" p="6" rounded="md" bg="white">
                <Image
                  shadow={8}
                  src={patch?.file}
                  height={300}
                  alt={`Picture of a ${patch?.synth}`}
                  borderRadius="lg"
                />
              </Box>
              <Box width={500}>
                <Collapse startingHeight={20} in={show}>
                  <Text>{patch?.description}</Text>
                </Collapse>
                {!show && <Text>...</Text>}
                <Button size="sm" onClick={handleToggle} mt="1rem">
                  Show {show ? "Less" : "More"}
                </Button>
              </Box>
            </HStack>
          </Flex>
        </GridItem>
        <GridItem area="right">{/* <CommentBoard /> */}</GridItem>
      </Grid>
    </>
  );
};

export default PatchDetail;
